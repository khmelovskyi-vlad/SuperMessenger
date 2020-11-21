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
        private const int sentUserCount = 10;
        public SuperMessengerHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task CreateGroup(Group group, IFormFile img)
        {
            await _context.Groups.AddAsync(group);
            //Context.UserIdentifier
        }
        //public async Task SendMessage(string groupName, Message message)
        //{
        //    await Clients.OthersInGroup(groupName).SendMessage(message);
        //}
        private async Task AddGroup(Group group, IFormFile img)
        {
            var path = "";
            var imgId = Guid.NewGuid();
            group.Id = Guid.NewGuid();
            await new FileMaster().DownloadFile(img, imgId.ToString());
        }
        public async Task SendFirstData()
        {
            //var asasda = Context.User.Identity;
            //var asasdasa = Context.User.Identity.Name;
            //var userIdentifier = Context.UserIdentifier;
            //var userIdentifier2 = Guid.Parse(Context.UserIdentifier);
            var mainPageData = await GetFirstData(Guid.Parse(Context.UserIdentifier));
            await ConnectToAllGroup(mainPageData.Groups);
            await Clients.User(Context.UserIdentifier).ReceiveFirstData(mainPageData);
        }
        private async Task ConnectToAllGroup(List<SimpleGroupModel> groups)
        {
            foreach (var group in groups)
            {
                //var asdasd = group.Id.ToString();
                await Groups.AddToGroupAsync(Context.ConnectionId, group.Id.ToString());
            }
        }
        public async Task RemoveFromGroup(Guid groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }
        public async Task AddToGroup(Guid userId, Guid groupId)
        {
            if (_context.UserGroups.Any(ug => ug.GroupId == groupId && ug.UserId == userId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
            }
        }
        public async Task SendMessage(MessageModel message)
        {
            message.Id = Guid.NewGuid();
            message.SendDate = DateTime.Now;
            //var dasd = message.GroupId.ToString();
            //if (message.Id == Guid.NewGuid())
            //{
            await SaveMessage(message);
            //await Clients.All.ReceiveMessage(message);
            //await Groups.AddToGroupAsync(Context.ConnectionId, message.GroupId.ToString());
            //await Clients.Group(message.GroupId.ToString()).ReceiveMessage(message);
            await Clients.OthersInGroup(message.GroupId.ToString()).ReceiveMessage(message);
            //}

            //Context.UserIdentifier
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
        public async Task SearchUsers(string userEmailPart)
        {
            //var myId = Guid.Parse(Context.UserIdentifier);
            //var users = await _context.Users.Where(user => user.Id == myId)
            //    .SelectMany(user => user.UserGroups)
            //    .SelectMany(userGroup => userGroup.Group.UserGroups)
            //    .Select(userGroup => userGroup.User)
            //    .Where(user => user.Email.Contains(userEmailPart))
            //    .OrderBy(user => user.Email)
            //    //.Distinct()
            //    .Take(sentUserCount)
            //    .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
            //    //.Where(user => user.Id != myId)
            //    .ToListAsync();
            ////if(users.Count() != sentUserCount)
            ////{
            ////    users.AddRange((await _context.Users
            ////        .OrderBy(user => user.Email)
            ////        .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
            ////        .Distinct()
            ////        .Take(sentUserCount * 2) //It's normal?
            ////        .Where(user => user.Id != myId)
            ////        .ToListAsync())
            ////        .Except(users, new SimpleUserModelComparer())
            ////        .Take(sentUserCount - users.Count()));
            ////}
            ////users.Remove(users.Where(user => user.Id != myId).FirstOrDefault());

            //await Clients.User(Context.UserIdentifier).ReceiveFoundUsers(users);

            var myId = Guid.Parse(Context.UserIdentifier);
            var users = await _context.Users.Where(user => user.Id == myId)
                .SelectMany(user => user.UserGroups)
                .SelectMany(userGroup => userGroup.Group.UserGroups)
                .Select(userGroup => userGroup.User)
                .Where(user => user.Email.Contains(userEmailPart))
                .OrderBy(user => user.Email)
                .Distinct()
                .Take(sentUserCount)
                .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
                .Where(user => user.Id != myId)
                .ToListAsync();
            if (users.Count() != sentUserCount)
            {
                users.AddRange((await _context.Users
                    .OrderBy(user => user.Email)
                    .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
                    .Distinct()
                    .Take(sentUserCount * 2) //It's normal?
                    .Where(user => user.Id != myId)
                    .ToListAsync())
                    .Except(users, new SimpleUserModelComparer())
                    .Take(sentUserCount - users.Count()));
            }
            users.Remove(users.Where(user => user.Id != myId).FirstOrDefault());

            await Clients.User(Context.UserIdentifier).ReceiveFoundUsers(users);
        }

        //public async Task SearchGroup(string groupNamePart)
        //{

        //}
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
                return x.Id == y.Id && x.Email == y.Email && x.ImageId == y.ImageId;
            }
            public int GetHashCode(SimpleUserModel simpleUserModel)
            {
                //Check whether the object is null
                if (Object.ReferenceEquals(simpleUserModel, null)) return 0;

                //Get hash code for the Name field if it is not null.
                int hashUserId = simpleUserModel.Id == null ? 0 : simpleUserModel.Id.GetHashCode();

                //Get hash code for the Code field.
                int hashUserEmail = simpleUserModel.Email == null ? 0 : simpleUserModel.Email.GetHashCode();
                int hashUserImageId = simpleUserModel. ImageId == null ? 0 : simpleUserModel.ImageId.GetHashCode();

                //Calculate the hash code for the product.
                return hashUserId ^ hashUserEmail ^ hashUserImageId;
            }
        }
        private async Task<MainPageModel> GetFirstData(Guid userIdentifier)
        {
            //var user = await _context.Users.Where(user => user.Id == userIdentifier).FirstOrDefaultAsync();
            //var profile = _mapper.Map<ProfileModel>(user);
            var result = await _context.Users
                .Where(user => user.Id == userIdentifier)
                .ProjectTo<MainPageModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return result;
        }
    }
}
