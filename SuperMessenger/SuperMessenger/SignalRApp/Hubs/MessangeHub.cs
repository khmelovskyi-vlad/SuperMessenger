using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SuperMessenger.Data;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    [Authorize]
    public class MessangeHub : Hub<IMessageClient>
    {
        SuperMessengerDbContext _context { get; set; }
        public MessangeHub(SuperMessengerDbContext context)
        {
            _context = context;
        }
        public async Task SendMessage(string groupName, Message message)
        {
            message.Id = Guid.NewGuid();
            message.SendDate = DateTime.Now;
            await SaveMessage(message);
            await Clients.OthersInGroup(groupName).ReceiveMessage(message);
            //Context.UserIdentifier
        }
        private async Task SaveMessage(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }
    }
}
