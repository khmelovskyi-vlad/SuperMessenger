using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class SuperMessengerHub : Hub<ISuperMessengerClient>
    {
        SuperMessengerDbContext _context { get; set; }
        public SuperMessengerHub(SuperMessengerDbContext context)
        {
            _context = context;
        }
        public async Task CreateGroup(Group group, IFormFile img)
        {
            await _context.Groups.AddAsync(group);
            //Context.UserIdentifier
        }
        public async Task AddToGroup(string groupName, string playerName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            //await Clients.OthersInGroup(groupName).StartGameAsPlayer1(playerName);
        }
        public async Task SendMessage(string groupName, Message message)
        {
            await Clients.OthersInGroup(groupName).SendMessage(message);
        }
        private async Task AddGroup(Group group, IFormFile img)
        {
            var path = "";
            var imgId = Guid.NewGuid();
            group.Id = Guid.NewGuid();
            await new FileMaster().DownloadFile(img, imgId.ToString());
        }
    }
}
