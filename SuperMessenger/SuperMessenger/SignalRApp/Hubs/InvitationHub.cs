﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
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
        private readonly IHubContext<SuperMessengerHub, ISuperMessengerClient> _superMessangesHub;
        public InvitationHub(
            SuperMessengerDbContext context, 
            IMapper mapper, 
            IHubContext<GroupHub, IGroupClient> groupHub,
            IHubContext<ApplicationHub, IApplicationClient> applicationHub,
            IHubContext<SuperMessengerHub, ISuperMessengerClient> superMessangesHub)
        {
            _context = context;
            _mapper = mapper;
            _groupHub = groupHub;
            _applicationHub = applicationHub;
            _superMessangesHub = superMessangesHub;
        }

        public async Task SendMyInvitations()
        {
            var myInvitations = await _context.Invitations
                .Where(invitation => invitation.InvitedUserId == Guid.Parse(Context.UserIdentifier))
                .ProjectTo<InvitationModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveMyInvitations(myInvitations);
        }
        public async Task<int> SendInvitation(InvitationModel invitationModel)
        {
            try
            {
                if (invitationModel.Value == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                else if (invitationModel.Value.Length > 150)
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
                var data = await _context.Groups.Where(g => g.Id == invitationModel.SimpleGroup.Id)
                    .Include(g => g.UserGroups)
                    //.ThenInclude(ug => ug.User)
                    .Include(g => g.Invitations)
                    .Select(group => new
                    {
                        group,
                        isInGroup = group.UserGroups.Any(ug => ug.UserId == invitationModel.InvitedUser.Id && !ug.IsLeaved),
                        wasSentEarlier = group.Invitations.Any(i => i.InvitedUserId == invitationModel.InvitedUser.Id
                            && i.InviterId == invitationModel.Inviter.Id),
                        //haveNeedPermissions = group.Type == GroupType.Public 
                        //|| (group.Type == GroupType.Private
                        //&& group.UserGroups.Where(ug => ug.IsCreator).Select(ug => ug.UserId).FirstOrDefault() == Guid.Parse(Context.UserIdentifier))
                    })
                    .FirstOrDefaultAsync();
                if (data.group == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                if (!data.isInGroup
                    && !data.wasSentEarlier
                    && (data.group.Type == GroupType.Public 
                    || (data.group.Type == GroupType.Private
                    && data.group.UserGroups.Where(ug => ug.IsCreator).Select(ug => ug.UserId).FirstOrDefault() == Guid.Parse(Context.UserIdentifier))))
                {
                    await SaveNewInvitation(invitationModel);
                    invitationModel = await _context.Invitations
                        .Where(i => i.GroupId == invitationModel.SimpleGroup.Id
                        && i.InvitedUserId == invitationModel.InvitedUser.Id
                        && i.InviterId == invitationModel.Inviter.Id)
                        .ProjectTo<InvitationModel>(_mapper.ConfigurationProvider).SingleAsync();
                    await SendNewInvitation(invitationModel);
                    await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.successSubmitted.ToString());
                    return StatusCodes.Status200OK;
                }
                else
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
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
        private async Task SendNewInvitation(InvitationModel invitationModel)
        {
            await Clients.User(invitationModel.InvitedUser.Id.ToString()).ReceiveInvitation(invitationModel);
        }
        private async Task SaveNewInvitation(InvitationModel invitationModel)
        {
            await _context.Invitations.AddAsync(new Invitation()
            {
                GroupId = invitationModel.SimpleGroup.Id,
                InvitedUserId = invitationModel.InvitedUser.Id,
                InviterId = invitationModel.Inviter.Id,
                Value = invitationModel.Value,
                SendDate = DateTime.Now,
            });
            await _context.SaveChangesAsync();
        }
        public async Task<int> DeclineInvitation(InvitationModel invitationModel)
        {
            try
            {
                var invitation = await _context.Invitations.Where(i => i.GroupId == invitationModel.SimpleGroup.Id
                && i.InvitedUserId == invitationModel.InvitedUser.Id
                && i.InviterId == invitationModel.Inviter.Id)
                    .FirstOrDefaultAsync();
                if (invitation == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                else
                {
                    await SaveDeclining(invitation);
                    await SendDecliningResult(invitationModel);
                    //await Clients.User(Context.UserIdentifier).ReceiveDeclineInvitationResult(InvitationResultType.successDeclining.ToString());
                    return StatusCodes.Status200OK;
                }
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
        private async Task SaveDeclining(Invitation invitation)
        {
            _context.Invitations.Remove(invitation);
            await _context.SaveChangesAsync();
        }
        private async Task SendDecliningResult(InvitationModel invitation)
        {
            await Clients.User(Context.UserIdentifier).ReduceMyInvitations(new List<ReduceInvtationModel>() { 
                new ReduceInvtationModel() 
                {
                    InvitedUserId = invitation.InvitedUser.Id, 
                    GroupId = invitation.SimpleGroup.Id, 
                    InviterId = invitation.Inviter.Id
                }
            });
        }
        public async Task<int> AcceptInvitation(InvitationModel invitationModel)
        {
            try
            {
                var data = await _context.Groups
                    .Where(g => g.Id == invitationModel.SimpleGroup.Id)
                    .Include(g => g.Applications)
                    .Include(g => g.UserGroups)
                    .ThenInclude(g => g.User)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.InvitedUser)
                    .ThenInclude(u => u.Connections)
                    .Include(g => g.Messages)
                    .ThenInclude(g => g.User)
                    .Select(group => new
                    {
                        group,
                        isInGroup = group.UserGroups.Any(ug => ug.UserId == invitationModel.InvitedUser.Id && ug.IsLeaved == false),
                        leavedUserGroup = group.UserGroups
                        .Where(ug => ug.UserId == invitationModel.InvitedUser.Id && ug.IsLeaved == true)
                        .SingleOrDefault(),
                        application = group.Applications.Where(a => a.UserId == invitationModel.InvitedUser.Id).FirstOrDefault(),
                        invitations = group.Invitations.Where(i => i.InvitedUserId == invitationModel.InvitedUser.Id),
                        //connections = group.Invitations.Where(i => i.InvitedUserId == invitationModel.InvitedUser.Id)
                        //.Select(a => a.InvitedUser).SelectMany(u => u.Connections).Where(c => c.IsConnected),
                        creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                    })
                    .FirstOrDefaultAsync();
                var reduceInvtationModels = data.invitations.Select(i => _mapper.Map<ReduceInvtationModel>(i));
                var simpleGroup = _mapper.Map<SimpleGroupModel>(data.group);
                var needInvitation = data.invitations.Where(i => i.InviterId == invitationModel.Inviter.Id).SingleOrDefault();
                var connections = data.group.Invitations.Where(i => i.InvitedUserId == invitationModel.InvitedUser.Id)
                        .Select(a => a.InvitedUser).SelectMany(u => u.Connections).Where(c => c.IsConnected);
                if (data.invitations == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                if (!data.isInGroup
                    && _mapper.Map<InvitationModel>(needInvitation).Equals(invitationModel)
                    && invitationModel.InvitedUser.Id == Guid.Parse(Context.UserIdentifier))
                {
                    await SaveAccepting(invitationModel, data.invitations, data.application, data.leavedUserGroup);
                    await AddToGroup(connections, invitationModel.SimpleGroup.Id);
                    await SendAcceptingResult(invitationModel, data.application,
                        reduceInvtationModels, simpleGroup, data.creatorId);
                    //await Clients.User(Context.UserIdentifier).ReceiveInvitationResultType(InvitationResultType.successAccepting.ToString());
                    return StatusCodes.Status200OK;
                }
                else
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
            }
            catch (HubException ex)
            {
                throw new HubException(ex.Message);
            }
            catch (Exception ex)
            {
                //throw new HubException(ex.Message);
                throw new HubException(StatusCodes.Status500InternalServerError.ToString());
            }
        }
        private async Task AddToGroup(IEnumerable<Connection> connections, Guid groupId)
        {
            if (connections != null)
            {
                foreach (var connection in connections)
                {
                    await _superMessangesHub.Groups.AddToGroupAsync(connection.ConnectionId, groupId.ToString());
                }
            }
        }
        private async Task SaveAccepting(InvitationModel invitation, 
            IEnumerable<Invitation> invitations, 
            Application application, 
            UserGroup leavedUserGroup)
        {
            if (leavedUserGroup != null)
            {
                leavedUserGroup.IsLeaved = false;
            }
            else
            {
                await _context.UserGroups.AddAsync(new UserGroup()
                {
                    GroupId = invitation.SimpleGroup.Id,
                    UserId = invitation.InvitedUser.Id,
                    IsCreator = false,
                    IsLeaved = false
                });
            }
            _context.Invitations.RemoveRange(invitations);
            if (application != null)
            {
                _context.Applications.Remove(application);
            }
            await _context.SaveChangesAsync();
        }
        private async Task SendAcceptingResult(
            InvitationModel invitation,
            //IEnumerable<UserGroup> userGroups, 
            Application application,
            IEnumerable<ReduceInvtationModel> reduceInvtationModels,
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
            await _superMessangesHub.Clients.Group(invitation.SimpleGroup.Id.ToString()).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);
            await _groupHub.Clients.User(Context.UserIdentifier).ReceiveSimpleGroup(simpleGroup);

            await Clients.User(Context.UserIdentifier).ReduceMyInvitations(reduceInvtationModels);

            if (application != null)
            {
                await _applicationHub.Clients.User(Context.UserIdentifier).ReduceMyApplicationsCount(1);
                if (creatorId != null)
                {
                    await _applicationHub.Clients.User(creatorId.ToString()).ReduceGroupApplication(application.UserId, application.GroupId);
                }
            }
            //await SendMyInvitations();
        }

    }
}
