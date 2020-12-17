using AutoMapper;
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
            await ConnectToGroup();
            await Clients.User(Context.UserIdentifier).ReceiveFirstData(mainPageData);
        }
        private async Task ConnectToGroup()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, Context.UserIdentifier);
        }

        public async Task AddToGroup(Guid groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
        }
        public async Task SendMessage(MessageModel message)
        {
            try
            {
                var group = await _context.Groups
                    .Include(g => g.UserGroups)
                    .ThenInclude(ug => ug.User)
                    .SingleOrDefaultAsync(g => g.Id == message.GroupId);
                var me = group.UserGroups.Select(ug => ug.User).SingleOrDefault(u => u.Id == Guid.Parse(Context.UserIdentifier));
                if (me == null && _mapper.Map<SimpleUserModel>(me).Equals(message.User))
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
                var previousId = message.Id;
                message.Id = Guid.NewGuid();
                message.SendDate = DateTime.Now;
                await SaveMessage(message);
                await SendNewMessage(message, previousId, me, group);
            }
            catch (HubException ex)
            {
                throw new HubException(ex.Message);
            }
            catch (Exception)
            {
                throw new HubException(StatusCodes.Status500InternalServerError.ToString());
            }
        }
        private async Task SendNewMessage(MessageModel message, Guid previousId, ApplicationUser me, Group group)
        {
            await SendMessageConfirmation(new MessageConfirmationModel()
            {
                Id = message.Id,
                PreviousId = previousId,
                GroupId = message.GroupId,
                SendDate = message.SendDate
            });
            var userIds = group.UserGroups.Where(ug => ug.UserId != me.Id).Select(ug => ug.UserId.ToString()).ToList();
            await Clients.Groups(userIds).ReceiveMessage(message);
        }
        private async Task SendMessageConfirmation(MessageConfirmationModel messageConfirmation)
        {
            await Clients.User(Context.UserIdentifier).ReceiveMessageConfirmation(messageConfirmation);
        }
        private async Task SaveMessage(MessageModel messageModel)
        {
            if (messageModel.Value == null || messageModel.Value.Length == 0 || messageModel.Value.Length > 1000)
            {
                throw new HubException(StatusCodes.Status403Forbidden.ToString());
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
                && !user.UserGroups.Any(ug => ug.GroupId == groupId && !ug.IsLeaved) 
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
        public async Task AddFiles(NewFilesModel newFilesModel)
        {
            try
            {
                var usersInGroup = await _context.UserGroups.Where(ug => ug.GroupId == newFilesModel.GroupId)
                    .Include(ug => ug.User)
                    .ThenInclude(u => u.AvatarInformations)
                    .Select(g => g.User)
                    .ToListAsync();
                var myId = Guid.Parse(Context.UserIdentifier);
                var me = usersInGroup == null ? null : usersInGroup.Where(user => user.Id == myId).FirstOrDefault();
                if (newFilesModel == null || newFilesModel.NewFileModels == null || usersInGroup == null || me == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                var (files, fileConfirmationModels) = await SaveFiles(newFilesModel, myId);
                await SendFiles(files, usersInGroup, fileConfirmationModels, myId);
            }
            catch (HubException ex)
            {
                throw new HubException(ex.Message);
            }
            catch (Exception)
            {
                throw new Exception(StatusCodes.Status500InternalServerError.ToString());
            }
        }
        private async Task SendFiles(
            List<MessageFile> messageFiles, 
            List<ApplicationUser> users, 
            List<FileConfirmationModel> fileConfirmationModels, 
            Guid myId
            )
        {
            await Clients.User(myId.ToString()).ReceiveFileConfirmations(fileConfirmationModels);
            var messageFileModels = messageFiles.Select(messageFile => _mapper.Map<MessageFileModel>(messageFile)).ToList();
            await Clients.Groups(users.Where(u => u.Id != myId).Select(user => user.Id.ToString()).ToList()).ReceiveFiles(messageFileModels);
        }
        private async Task<(List<MessageFile>, List<FileConfirmationModel>)> SaveFiles(NewFilesModel newFilesModel, Guid myId)
        {
            List<MessageFile> messageFiles = new List<MessageFile>();
            List<FileConfirmationModel> fileConfirmationModels = new List<FileConfirmationModel>();
            var fileIds = newFilesModel.NewFileModels.Select(nfl => nfl.ContentId).ToList();
            var fileInformations = await _context.FileInformations
                .Where(fi => fileIds.Any(nfm => nfm == fi.Id))
                .ToListAsync();
            foreach (var newFileModel in newFilesModel.NewFileModels)
            {
                var fileId = Guid.NewGuid();
                messageFiles.Add(new MessageFile() 
                { 
                    Id = fileId, 
                    GroupId = newFilesModel.GroupId, 
                    UserId = myId,
                    FileInformationId = newFileModel.ContentId,
                    PreviousName = newFileModel.PreviousName,
                });
                var fileInformation = fileInformations.SingleOrDefault(fi => fi.Id == newFileModel.ContentId);
                fileInformation.MessageFileId = fileId;
                fileConfirmationModels.Add( new FileConfirmationModel() 
                { 
                    Id = fileId, 
                    GroupId = newFilesModel.GroupId, 
                    PreviousId = newFileModel.PreviousId,
                    SendDate = fileInformation.SendDate,
                    ContentName = fileInformation.Name
                });
            }
            await _context.MessageFiles.AddRangeAsync(messageFiles);
            await _context.SaveChangesAsync();
            return (messageFiles, fileConfirmationModels);
        }



        public async Task ChangeProfile(NewProfileModel newProfile)
        {
            try
            {
                var users = await _context.Users.Where(user => user.Id == Guid.Parse(Context.UserIdentifier))
                    .SelectMany(user => user.UserGroups)
                    .Select(ug => ug.Group)
                    .SelectMany(g => g.UserGroups)
                    .Select(ug => ug.User)
                    .Distinct()
                    .ToListAsync();
                var me = users.SingleOrDefault(user => user.Id == Guid.Parse(Context.UserIdentifier));
                if (me == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                ChangeMyNames(me, newProfile.FirstName, newProfile.LastName);
                await SaveProfileChanges(me, newProfile);
                await SendProfileChanges(me, users);
            }
            catch (HubException ex)
            {
                throw new HubException(ex.Message);
            }
            catch (Exception)
            {
                throw new HubException(StatusCodes.Status500InternalServerError.ToString());
            }
        }
        private async Task SaveProfileChanges(ApplicationUser me, NewProfileModel newProfile)
        {
            if (newProfile.HaveImage)
            {
                var fileInformations = await _context.FileInformations.SingleOrDefaultAsync(fi => fi.Id == newProfile.ContentId);
                if (fileInformations == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                fileInformations.UserId = me.Id;
            }
            await _context.SaveChangesAsync();
        }
        private async Task SendProfileChanges(ApplicationUser me, List<ApplicationUser> users)
        {
            var newProfile = _mapper.Map<ProfileModel>(me);
            await Clients.User(Context.UserIdentifier).ReceiveNewProfile(newProfile);
            var userIds = users
                .Where(u => u.Id != me.Id)
                .Select(u => u.Id.ToString())
                .ToList();
            var newUserInGroup = _mapper.Map<SimpleUserModel>(me);
            await Clients.Groups(userIds).ReceiveNewUserData(newUserInGroup);
        }
        private void ChangeMyNames(ApplicationUser me, string FirstName, string LastName)
        {
            if (FirstName != null && FirstName != "" && FirstName.Length <= 150)
            {
                me.FirstName = FirstName;
            }
            if (LastName != null && LastName != "" && LastName.Length <= 150)
            {
                me.LastName = LastName;
            }
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
