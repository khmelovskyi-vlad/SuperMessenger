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
        private readonly IHubContext<GroupHub, IGroupClient> _groupHub;
        private readonly IHubContext<ApplicationHub, IApplicationClient> _applicationHub;
        public InvitationHub(
            SuperMessengerDbContext context, 
            IMapper mapper, 
            IHubContext<GroupHub, IGroupClient> groupHub,
            IHubContext<ApplicationHub, IApplicationClient> applicationHub)
        {
            _context = context;
            _mapper = mapper;
            _groupHub = groupHub;
            _applicationHub = applicationHub;
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
        public async Task DeclineInvitation(InvitationModel invitationModel)
        {
            var invitation = await _context.Invitations.Where(i => i.GroupId == invitationModel.SimpleGroup.Id
            && i.InvitedUserId == invitationModel.InvitedUser.Id
            && i.InviterId == invitationModel.Inviter.Id)
                .FirstOrDefaultAsync();
            if (invitation != null)
            {
                await SaveDeclining(invitation);
                await SendDecliningResult(invitationModel);
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveDeclineInvitationResult(InvitationResultType.notHaveInvitation.ToString());
                //await Clients.User(invitation.Inviter.Id.ToString()).ReceiveInvitation(invitation);
            }
        }
        private async Task SaveDeclining(Invitation invitation)
        {
            _context.Invitations.Remove(invitation);
            await _context.SaveChangesAsync();
        }
        private async Task SendDecliningResult(InvitationModel invitation)
        {
            await Clients.User(Context.UserIdentifier).ReceiveDeclineInvitationResult(InvitationResultType.successDeclining.ToString());
            await Clients.User(Context.UserIdentifier).ReduceMyInvitations(new List<InvitationModel>() { invitation });
        }
        public async Task AcceptInvitation(InvitationModel invitation)
        {
            var group = await GetGroup(invitation);
            var invitations = group.Invitations.Where(i => i.InvitedUserId == invitation.InvitedUser.Id);
            var invitationsCount = invitations.Count();
            var application = group.Applications.Where(a => a.UserId == invitation.InvitedUser.Id).FirstOrDefault();
            if (invitations != null)
            {
                var invitationModels = CreateInvitationModels(invitations, group);
                await SaveAccepting(invitation, invitations, application);
                await SendAcceptingResult(invitation, group.UserGroups, invitationsCount, application, invitationModels);
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.notHaveInvitation.ToString());
            }
        }
        private List<InvitationModel> CreateInvitationModels(IEnumerable<Invitation> invitations, Group group)
        {
            List<InvitationModel> invitationModels = new List<InvitationModel>();
            foreach (var invitation in invitations)
            {
                invitationModels.Add(
                    new InvitationModel() 
                    {
                        Value = invitation.Value,
                        SendDate = invitation.SendDate,
                        InvitedUser = new SimpleUserModel() 
                        { 
                            Id = invitation.InvitedUser.Id, 
                            Email = invitation.InvitedUser.Email, 
                            ImageId = invitation.InvitedUser.ImageId
                        },
                        Inviter = new SimpleUserModel()
                        {
                            Id = invitation.Inviter.Id,
                            Email = invitation.Inviter.Email,
                            ImageId = invitation.Inviter.ImageId
                        },
                        SimpleGroup = new SimpleGroupModel()
                        {
                            Id = group.Id,
                            Name = group.Name,
                            Type = group.Type.ToString(),
                            ImageId = invitation.Inviter.ImageId
                        }
                    });
            }
            return invitationModels;
        }
        private async Task SaveAccepting(InvitationModel invitation, IEnumerable<Invitation> invitations, Application application)
        {
            await _context.UserGroups.AddAsync(new UserGroup()
            {
                GroupId = invitation.SimpleGroup.Id,
                UserId = invitation.InvitedUser.Id,
                IsCreator = false,
                IsLeaved = false
            });
            _context.Invitations.RemoveRange(invitations);
            if (application != null)
            {
                _context.Applications.Remove(application);
            }
            await _context.SaveChangesAsync();
        }
        private async Task SendAcceptingResult(
            InvitationModel invitation, 
            List<UserGroup> userGroups, 
            int invitationsCount, 
            Application application,
            List<InvitationModel> invitationModels
            )
        {
            var creatorId = userGroups?.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId;
            var simpleGroup = await _context.Groups
                .Where(group => group.Id == invitation.SimpleGroup.Id)
                .ProjectTo<SimpleGroupModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            var userInGroupModel = new UserInGroupModel()
            {
                Id = invitation.InvitedUser.Id,
                Email = invitation.InvitedUser.Email,
                ImageId = invitation.InvitedUser.ImageId,
                IsCreator = false
            };
            if (userGroups != null)
            {
                foreach (var userGroup in userGroups/*.Where(ug => ug.UserId != invitation.Inviter.Id)*/)
                {
                    await _groupHub.Clients.User(userGroup.UserId.ToString()).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);
                }
            }
            await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.successAccepting.ToString());
            await _groupHub.Clients.User(Context.UserIdentifier).ReceiveSimpleGroup(simpleGroup);

            await Clients.User(Context.UserIdentifier).ReduceMyInvitations(invitationModels);
            if (application != null)
            {
                await _applicationHub.Clients.User(Context.UserIdentifier).ReduceMyApplicationCount(1);
                if (creatorId != null)
                {
                    await _applicationHub.Clients.User(creatorId.ToString()).ReduceGroupApplication(application.UserId, application.GroupId);
                }
            }
            await SendMyInvitations();
        }
        public async Task<Group> GetGroup(InvitationModel invitation)
        {
            //var s = await _context.Invitations
            //    .Where(i => i.GroupId == invitation.SimpleGroup.Id
            //        && i.InvitedUserId == invitation.InvitedUser.Id)
            //    .Include(i => i.Group)
            //    .ThenInclude(g => g.UserGroups)
            //    .ToListAsync();
            return await _context.Groups
                .Where(g => g.Id == invitation.SimpleGroup.Id)
                //.Where(i => i.InvitedUserId == invitation.InvitedUser.Id)
                .Include(g => g.Invitations)
                .ThenInclude(i => i.InvitedUser)
                .Include(g => g.Invitations)
                .ThenInclude(i => i.Inviter)
                .Include(g => g.Applications)
                .Include(g => g.UserGroups)
                .FirstOrDefaultAsync();
        }
        public async Task<List<Invitation>> GetInvitations(InvitationModel invitation)
        {
            return await _context.Invitations
                .Where(i => i.GroupId == invitation.SimpleGroup.Id
                    && i.InvitedUserId == invitation.InvitedUser.Id)
                .Include(i => i.Group)
                .ThenInclude(g => g.UserGroups)
                .ToListAsync();
        }
        public async Task SendInvitation(InvitationModel invitation)
        {
            if (invitation.Value == null || invitation.Value.Length > 150)
            {
                await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.invalidValue.ToString());
                return;
            }
            var group = await _context.Groups.Where(g => g.Id == invitation.SimpleGroup.Id)
                .Include(g => g.UserGroups)
                .ThenInclude(ug => ug.User)
                .Include(g => g.Invitations)
                .FirstOrDefaultAsync();

            if (group != null)
            {
                if (group.UserGroups.Any(userGroup => userGroup.UserId == invitation.InvitedUser.Id)
                    //await _context.Users.Where(user => user.Id == invitation.InvitedUser.Id)
                    //.SelectMany(user => user.UserGroups)
                    //.AnyAsync(userGroup => userGroup.GroupId == invitation.SimpleGroup.Id)
                    )
                {
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.userIsInGroup.ToString());
                }
                else if (group.Invitations.Any(i => i.GroupId == invitation.SimpleGroup.Id
                && i.InvitedUserId == invitation.InvitedUser.Id
                && i.InviterId == invitation.Inviter.Id)
                //    await _context.Invitations.AnyAsync(i => i.GroupId == invitation.SimpleGroup.Id
                //&& i.InvitedUserId == invitation.InvitedUser.Id
                //&& i.InviterId == invitation.Inviter.Id)
                    )
                {
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.wasInvitedEarlier.ToString());
                }
                else if (group.Type == GroupType.Public
                    || group.Type == GroupType.Private
                    && group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId == Guid.Parse(Context.UserIdentifier))
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
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.successSubmitted.ToString());
                    await Clients.User(invitation.InvitedUser.Id.ToString()).ReceiveInvitation(invitation);
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.haveNoPermissions.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.invalidValue.ToString());
            }
        }
        public async Task SendMyInvitations()
        {
            var myInvitations = await _context.Invitations
                .Where(invitation => invitation.InvitedUserId == Guid.Parse(Context.UserIdentifier))
                .ProjectTo<InvitationModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveMyInvitations(myInvitations);
        }
    }
}
