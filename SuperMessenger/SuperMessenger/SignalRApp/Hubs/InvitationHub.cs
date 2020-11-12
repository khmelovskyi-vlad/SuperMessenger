using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
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
        private readonly IMapper _mapper;
        public InvitationHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
        //public async Task AcceptInvitation(Invitation invitation)
        //{
        //    var invitations = await _context.Invitations.Where(i => i.GroupId == invitation.GroupId
        //    && i.InvitedUserId == invitation.InvitedUserId).ToListAsync();
        //    if (invitations != null && invitations.Any(i => i.GroupId == invitation.GroupId && i.InvitedUser == invitation.InvitedUser))
        //    {
        //        _context.Invitations.RemoveRange(invitations);
        //        await _context.UserGroups.AddAsync(new UserGroup()
        //        {
        //            GroupId = invitation.GroupId,
        //            UserId = invitation.InvitedUserId,
        //            IsCreator = false,
        //            IsLeaved = false
        //        });
        //        await _context.SaveChangesAsync();
        //    }
        //    //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        //    //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        //    //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        //}
        //public async Task AcceptInvitation(InvitationModel invitation)
        //{
        //    var invitations = await _context.Invitations.Where(i => i.GroupId == invitation.GroupId
        //    && i.InvitedUserId == invitation.InvitedUser.Id).ToListAsync();
        //    if (invitations != null && invitations.Any(i => i.GroupId == invitation.GroupId && i.InvitedUser == invitation.InvitedUser))
        //    {
        //        _context.Invitations.RemoveRange(invitations);
        //        await _context.UserGroups.AddAsync(new UserGroup()
        //        {
        //            GroupId = invitation.GroupId,
        //            UserId = invitation.InvitedUserId,
        //            IsCreator = false,
        //            IsLeaved = false
        //        });
        //        await _context.SaveChangesAsync();
        //    }
        //    //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        //    //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        //    //Clients.Group(invitation.GroupId.ToString()).AddNewUserToGroup();
        //}
        public async Task SendInvitation(InvitationModel invitation)
        {
            //if (await _context.Users.Where(user => user.Id == invitation.InvitedUser.Id)
            //    .SelectMany(user => user.UserGroups)
            //    .AnyAsync(userGroup => userGroup.GroupId == invitation.GroupId))
            //{
            //    await Clients.User(Context.UserIdentifier).ReceiveSendingInvitationResult(SendingInvitationResult.isInGroup.ToString());
            //}
            //else 
            if (await _context.Invitations.AnyAsync(i => i.GroupId == invitation.SimpleGroup.Id
            && i.InvitedUserId == invitation.InvitedUser.Id
            && i.InviterId == invitation.Inviter.Id))
            {
                await Clients.User(Context.UserIdentifier).ReceiveSendingInvitationResult(SendingInvitationResult.wasInvited.ToString());
            }
            else
            {
                invitation.SendDate = DateTime.Now;
                await _context.Invitations.AddAsync(new Invitation()
                {
                    GroupId = invitation.SimpleGroup.Id,
                    InvitedUserId = invitation.InvitedUser.Id,
                    InviterId = invitation.Inviter.Id,
                    Value = invitation.Value,
                    SendDate = invitation.SendDate
                });
                await _context.SaveChangesAsync();
                await Clients.User(invitation.InvitedUser.Id.ToString()).ReceiveInvitation(invitation);
                await Clients.User(Context.UserIdentifier).ReceiveSendingInvitationResult(SendingInvitationResult.successSenting.ToString());
            }
        }
        public async Task SendMyInvitation()
        {
            var myInvitations = await _context.Invitations
                .Where(invitation => invitation.InvitedUserId == Guid.Parse(Context.UserIdentifier))
                .ProjectTo<InvitationModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveMyInvitations(myInvitations);
        }
    }
}
