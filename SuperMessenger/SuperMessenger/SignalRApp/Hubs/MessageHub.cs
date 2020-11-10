using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
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
    public class MessageHub : Hub<IMessageClient>
    {
        SuperMessengerDbContext _context { get; set; }
        public MessageHub(SuperMessengerDbContext context)
        {
            _context = context;
        }
        //public async Task SendMessage(object messageObj)
        public async Task SendMessage(MessageModel message)
        {
            message.Id = Guid.NewGuid();
            message.SendDate = DateTime.Now;
            //if (message.Id == Guid.NewGuid())
            //{
                await SaveMessage(message);
                await Clients.OthersInGroup(message.GroupId.ToString()).ReceiveMessage(message);
            //}

            //Context.UserIdentifier
        }
        private async Task SaveMessage(MessageModel messageModel)
        {
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
    }
}
