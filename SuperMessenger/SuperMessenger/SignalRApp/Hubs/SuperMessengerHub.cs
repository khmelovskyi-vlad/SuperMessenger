﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    [Authorize]
    public class SuperMessengerHub : Hub<ISuperMessengerClient>
    {
        SuperMessengerDbContext _context { get; set; }
        private readonly IMapper _mapper;
        private const int sentUserCount = 10;
        public SuperMessengerHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task SendFirstData()
        {
            var mainPageData = await _context.Users
                .Where(user => user.Id == Guid.Parse(Context.UserIdentifier))
                .ProjectTo<MainPageModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            await ConnectToAllGroup(mainPageData.Groups);
            await Clients.User(Context.UserIdentifier).ReceiveFirstData(mainPageData);
        }
        private async Task ConnectToAllGroup(List<SimpleGroupModel> groups)
        {
            foreach (var group in groups)
            {
                await AddToGroup(group.Id);
            }
        }
        public async Task RemoveFromGroup(Guid groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }
        public async Task AddToGroup(Guid groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
        }
        public async Task SendMessage(MessageModel message)
        {
            var previousId = message.Id;
            message.Id = Guid.NewGuid();
            message.SendDate = DateTime.Now;
            await SaveMessage(message);
            await SendMessageConfirmation(new MessageConfirmationModel() 
            { 
                Id = message.Id, 
                PreviousId = previousId, 
                GroupId = message.GroupId, 
                SendDate = message.SendDate
            });
            await Clients.OthersInGroup(message.GroupId.ToString()).ReceiveMessage(message);
        }
        private async Task SendMessageConfirmation(MessageConfirmationModel messageConfirmation)
        {
            await Clients.User(Context.UserIdentifier).ReceiveMessageConfirmation(messageConfirmation);
        }
        private async Task SaveMessage(MessageModel messageModel)
        {
            if (messageModel.Value == null || messageModel.Value.Length == 0 || messageModel.Value.Length > 1000)
            {
                //////do something
            }
            var message = new Message()
            {
                Id = messageModel.Id,
                Value = messageModel.Value,
                SendDate = messageModel.SendDate,
                UserId = Guid.Parse(Context.UserIdentifier),
                GroupId = messageModel.GroupId
            };
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }
        public async Task SearchNoInvitedUsers(string userEmailPart, Guid groupId)
        {
            var myId = Guid.Parse(Context.UserIdentifier);
            var users = await _context.Users
                .Where(user => user.Email.Contains(userEmailPart) 
                && !user.UserGroups.Any(ug => ug.GroupId == groupId) 
                && user.Id != myId
                && !user.InvitationsForMe.Any(i => i.GroupId == groupId && i.InviterId == myId))
                .Take(10)
                .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveFoundUsers(users);
        }
        public async Task SearchUsers(string userEmailPart, List<Guid> userIds)
        {
            var myId = Guid.Parse(Context.UserIdentifier);
            var users = await _context.Users
                .Where(user => user.Email.Contains(userEmailPart)
                && user.Id != myId)
                .Where(user => userIds == null ? true : !userIds.Any(ui => ui == user.Id))
                .Take(10)
                .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveFoundUsers(users);
        }
        public class SimpleUserModelComparer : IEqualityComparer<SimpleUserModel>
        {

            public bool Equals(SimpleUserModel x, SimpleUserModel y)
            {

                //Check whether the compared objects reference the same data.
                if (Object.ReferenceEquals(x, y)) return true;

                //Check whether any of the compared objects is null.
                if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                    return false;

                //Check whether the products' properties are equal.
                return x.Id == y.Id && x.Email == y.Email && x.ImageName == y.ImageName;
            }
            public int GetHashCode(SimpleUserModel simpleUserModel)
            {
                //Check whether the object is null
                if (Object.ReferenceEquals(simpleUserModel, null)) return 0;

                //Get hash code for the Name field if it is not null.
                int hashUserId = simpleUserModel.Id == null ? 0 : simpleUserModel.Id.GetHashCode();

                //Get hash code for the Code field.
                int hashUserEmail = simpleUserModel.Email == null ? 0 : simpleUserModel.Email.GetHashCode();
                int hashUserImageId = simpleUserModel.ImageName == null ? 0 : simpleUserModel.ImageName.GetHashCode();

                //Calculate the hash code for the product.
                return hashUserId ^ hashUserEmail ^ hashUserImageId;
            }
        }
        public async Task AddFile(List<MessageFile> files)
        {
            if (files == null || files.Count() == 0 || files.Select(file => file.GroupId).Distinct().Count() != 1)
            {
                throw new HubException("500");
            }
            var groupId = files.FirstOrDefault().GroupId;
            var data = await _context.Users
                .Where(user => user.Id == Guid.Parse(Context.UserIdentifier))
                .Include(u => u.UserGroups)
                .ThenInclude(ug => ug.Group)
                .ThenInclude(g => g.UserGroups)
                .Select(user => new
                {
                    me = user,
                    userIds = user.UserGroups.Where(ug => ug.GroupId == groupId)
                    .SelectMany(ug => ug.Group.UserGroups.Where(ug => ug.UserId != Guid.Parse(Context.UserIdentifier)))
                    .Select(ug => ug.UserId)
                })
                .FirstOrDefaultAsync();
            if (data == null || data.me == null)
            {
                throw new HubException("500");
            }
            var (fileConfirmations, filesToSend) = CreateFiles(files, data.me);
            await _context.MessageFiles.AddRangeAsync(files);
            await _context.SaveChangesAsync();
            await SendFileConfirmations(fileConfirmations);
            await SendFiles(filesToSend, data.userIds);
        }
        private async Task SendFileConfirmations(List<FileConfirmationModel> fileConfirmations)
        {
            await Clients.User(Context.UserIdentifier).ReceiveFileConfirmations(fileConfirmations);
        }
        private async Task SendFiles(List<MessageFileModel> filesToSend, IEnumerable<Guid> userIds)
        {
            foreach (var userId in userIds)
            {
                await Clients.User(userId.ToString()).ReceiveFiles(filesToSend);
            }
        }
        private (List<FileConfirmationModel>, List<MessageFileModel>) CreateFiles(List<MessageFile> sentFiles, ApplicationUser me)
        {
            List<FileConfirmationModel> fileConfirmations = new List<FileConfirmationModel>();
            List<MessageFileModel> filesToSend = new List<MessageFileModel>();
            foreach (var sentFile in sentFiles)
            {
                var now = DateTime.Now;
                var fileId = Guid.NewGuid();
                var contentId = Guid.NewGuid();
                fileConfirmations.Add(new FileConfirmationModel()
                {
                    Id = fileId,
                    PreviousId = sentFile.FileInformationId,
                    GroupId = sentFile.GroupId,
                    SendDate = now,
                    ContentId = contentId
                });
                filesToSend.Add(new MessageFileModel()
                {
                    Id = fileId,
                    Name = sentFile.PreviousName,
                    //ContentId = contentId,
                    ///////////////////////////////////////////////////////////////////////////////////////////////////      change
                    SendDate = now,
                    GroupId = sentFile.GroupId,
                    User = new SimpleUserModel()
                    {
                        Id = me.Id,
                        Email = me.Email,
                        //ImageId = me.ImageId
                        ///////////////////////////////////////////////////////////////////////////////////////////////////      change
                    },
                });
                sentFile.Id = fileId;
                sentFile.FileInformation.SendDate = now;
                sentFile.FileInformationId = contentId;
                sentFile.UserId = me.Id;
            }
            return (fileConfirmations, filesToSend);
        }
        public override Task OnConnectedAsync()
        {
            var name = Guid.Parse(Context.UserIdentifier);
            var user = _context.Users
                .Include(u => u.Connections)
                .SingleOrDefault(u => u.Id == name);

            if (user == null)
            {
                throw new HubException("500");
            }

            _context.Connections.Add(new Connection
            {
                ConnectionId = Context.ConnectionId,
                IsConnected = true,
                UserId = user.Id
            });
            _context.SaveChanges();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connection = _context.Connections.Find(Context.ConnectionId);
            connection.IsConnected = false;
            _context.SaveChanges();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
