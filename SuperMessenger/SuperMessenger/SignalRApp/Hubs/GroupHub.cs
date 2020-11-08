using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    public class GroupHub : Hub<IGroupClient>
    {
        SuperMessengerDbContext _context { get; set; }
        public GroupHub(SuperMessengerDbContext context)
        {
            _context = context;
        }
        //public async Task SendMessage(string groupName, Group group)
        //{
        //    message.Id = Guid.NewGuid();
        //    message.SendDate = DateTime.Now;
        //    await SaveMessage(message);
        //    await Clients.OthersInGroup(groupName).ReceiveMessage(message);
        //    //Context.UserIdentifier
        //}
        //private async Task SaveMessage(Message message)
        //{
        //    await _context.Message.AddAsync(message);
        //}
        public async Task CreateGroup(string groupType, string groupName, object files)
        {
            //public Guid Id { get; set; }
            //public string Name { get; set; }
            //public DateTime CreationDate { get; set; }
            //public Guid ImageId { get; set; }
            //public GroupType Type { get; set; }
            var type = (GroupType) Enum.Parse(typeof(GroupType), groupType, true);
            var groupId = Guid.NewGuid();
            var group = new Group() { Id = groupId, CreationDate = DateTime.Now, Type = type, Name = groupName };
            await _context.Groups.AddAsync(group);
            //if ()
            //{

            //}
        }
        public async Task SearchMyGroup(string groupName, bool isPrivate = false, bool isPublic = false, bool isChat = false)
        {
            var myId = Guid.Parse(Context.UserIdentifier);
            var groups = await _context.Users.Where(user => user.Id == myId)
                .SelectMany(user => user.UserGroups)
                .Select(userGroup => userGroup.Group)
                .Where(group => isPrivate ? group.Type == GroupType.Private : true
                && isPublic ? group.Type == GroupType.Public : true
                && isChat ? group.Type == GroupType.Chat : true
                && group.Name.Contains(groupName))
                .ToListAsync();
            await Clients.Caller.ReceiveSearchedGroups(groups);
        }
    }
}
