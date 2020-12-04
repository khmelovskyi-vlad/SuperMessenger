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
                //throw new HubException("500");
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
        //public async Task AcceptInvitation2(InvitationModel invitation)
        //{
        //    if (invitation.InvitedUser.Id == Guid.Parse(Context.UserIdentifier))
        //    {
        //        var data = await _context.Groups
        //            .Where(g => g.Id == invitation.SimpleGroup.Id)
        //            .Include(g => g.Applications)
        //            .Include(g => g.UserGroups)
        //            .Include(g => g.Invitations)
        //            .ThenInclude(i => i.InvitedUser)
        //            .Include(g => g.Invitations)
        //            .ThenInclude(i => i.Inviter)
        //            .Include(g => g.Messages)
        //            .ThenInclude(g => g.User)
        //            .Select(group => new
        //            {
        //                group,
        //                application = group.Applications.Where(a => a.UserId == invitation.InvitedUser.Id).FirstOrDefault(),
        //                invitations = group.Invitations.Where(i => i.InvitedUserId == invitation.InvitedUser.Id),
        //                invitationModels = group.Invitations.Where(i => i.InvitedUserId == invitation.InvitedUser.Id)
        //                .Select(i => _mapper.Map<InvitationModel>(i)),
        //                simpleGroup = _mapper.Map<SimpleGroupModel>(group),
        //                creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId
        //            })
        //            .FirstOrDefaultAsync();
        //        if (data.invitations != null)
        //        {
        //            await SaveAccepting(invitation, data.invitations, data.application);
        //            await SendAcceptingResult(invitation, data.group.UserGroups, data.application, data.invitationModels, data.simpleGroup, data.creatorId);
        //        }
        //    }
        //    throw new HubException("500");
        //}
        public async Task AcceptInvitation(InvitationModel invitationModel)
        {
            if (invitationModel.InvitedUser.Id == Guid.Parse(Context.UserIdentifier))
            {
                var data = await _context.Groups
                    .Where(g => g.Id == invitationModel.SimpleGroup.Id)
                    .Include(g => g.Applications)
                    .Include(g => g.UserGroups)
                    .ThenInclude(g => g.User)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.InvitedUser)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.Inviter)
                    .Include(g => g.Messages)
                    .ThenInclude(g => g.User)
                    .Select(group => new
                    {
                        group,
                        application = group.Applications.Where(a => a.UserId == invitationModel.InvitedUser.Id).FirstOrDefault(),
                        invitations = group.Invitations.Where(i => i.InvitedUserId == invitationModel.InvitedUser.Id),
                        invitationModels = group.Invitations.Where(i => i.InvitedUserId == invitationModel.InvitedUser.Id)
                        .Select(i => _mapper.Map<InvitationModel>(i)),
                        creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                        simpleGroup = _mapper.Map<SimpleGroupModel>(group),
                    })
                    .FirstOrDefaultAsync();
                if (data.invitations != null)
                {
                    await SaveAccepting(invitationModel, data.invitations, data.application);
                    await SendAcceptingResult(invitationModel, data.group.UserGroups, data.application, data.invitationModels, data.simpleGroup, data.creatorId);
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.notHaveInvitation.ToString());
                }
            }
        }
        private void ChengeInvitationModel(
            InvitationModel invitationModel, 
            SimpleGroupModel simpleGroupModel,
            SimpleUserModel invitedUser,
            SimpleUserModel inviter
            )
        {
            invitationModel.SimpleGroup = simpleGroupModel;
            invitationModel.InvitedUser = invitedUser;
            invitationModel.Inviter = inviter;
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
            IEnumerable<UserGroup> userGroups, 
            Application application,
            IEnumerable<InvitationModel> invitationModels,
            SimpleGroupModel simpleGroup,
            Guid creatorId
            )
        {
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
                await _applicationHub.Clients.User(Context.UserIdentifier).ReduceMyApplicationsCount(1);
                if (creatorId != null)
                {
                    await _applicationHub.Clients.User(creatorId.ToString()).ReduceGroupApplication(application.UserId, application.GroupId);
                }
            }
            await SendMyInvitations();
        }
        public async Task SendInvitation(InvitationModel invitationModel)
        {
            if (invitationModel.Value == null || invitationModel.Value.Length > 150)
            {
                await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.invalidValue.ToString());
                return;
            }
            var data = await _context.Groups.Where(g => g.Id == invitationModel.SimpleGroup.Id)
                .Include(g => g.UserGroups)
                .ThenInclude(ug => ug.User)
                .Include(g => g.Invitations)
                .Select(group => new
                {
                    group,
                })
                .FirstOrDefaultAsync();

            if (data.group != null)
            {
                if (data.group.UserGroups.Any(userGroup => userGroup.UserId == invitationModel.InvitedUser.Id))
                {
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.userIsInGroup.ToString());
                }
                else if (data.group.Invitations.Any(i => i.GroupId == invitationModel.SimpleGroup.Id
                && i.InvitedUserId == invitationModel.InvitedUser.Id
                && i.InviterId == invitationModel.Inviter.Id))
                {
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.wasInvitedEarlier.ToString());
                }
                else if (data.group.Type == GroupType.Public
                    || data.group.Type == GroupType.Private
                    && data.group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId == Guid.Parse(Context.UserIdentifier))
                {
                    invitationModel.SendDate = DateTime.Now;
                    await SaveNewInvitation(invitationModel);
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.successSubmitted.ToString());
                    await Clients.User(invitationModel.InvitedUser.Id.ToString()).ReceiveInvitation(invitationModel);
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
        private async Task SaveNewInvitation(InvitationModel invitationModel)
        {
            await _context.Invitations.AddAsync(new Invitation()
            {
                GroupId = invitationModel.SimpleGroup.Id,
                InvitedUserId = invitationModel.InvitedUser.Id,
                InviterId = invitationModel.Inviter.Id,
                Value = invitationModel.Value,
                SendDate = invitationModel.SendDate
            });
            await _context.SaveChangesAsync();
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
