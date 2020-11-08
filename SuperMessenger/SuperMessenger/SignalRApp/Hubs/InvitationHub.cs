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
    public class InvitationHub : Hub<IInvitationClient>
    {
        SuperMessengerDbContext _context { get; set; }
        public InvitationHub(SuperMessengerDbContext context)
        {
            _context = context;
        }
        //public async Task SendInvitation(string userId, Invitation invitation)
        //{
        //    await Clients.User(userId).ReceiveInvitation(invitation);
        //}

        //private async Task SaveInvitation(Invitation invitation)
        //{
        //    await _context.Invitations.AddAsync(invitation);
        //    await _context.SaveChangesAsync();
        //}
        public async Task AcceptInvitation(Invitation invitation)
        {
            var invitations = await _context.Invitations.Where(i => i.GroupId == invitation.GroupId
            && i.InvitedUserId == invitation.InvitedUserId).ToListAsync();
            if (invitations != null && invitations.Any(i => i.GroupId == invitation.GroupId && i.InvitedUser == invitation.InvitedUser))
            {
                _context.Invitations.RemoveRange(invitations);
                await _context.UserGroups.AddAsync(new UserGroup()
                {
                    GroupId = invitation.GroupId,
                    UserId = invitation.InvitedUserId,
                    IsCreator = false,
                    IsLeaved = false
                });
                await _context.SaveChangesAsync();
            }
            //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
            //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
            //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        }
    }
}
