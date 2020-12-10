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
    public class ApplicationHub : Hub<IApplicationClient>
    {
        private readonly SuperMessengerDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHubContext<GroupHub, IGroupClient> _groupHub;
        private readonly IHubContext<InvitationHub, IInvitationClient> _invitationHub;
        private readonly IHubContext<SuperMessengerHub, ISuperMessengerClient> _superMessangesHub;
        public ApplicationHub(
            SuperMessengerDbContext context,
            IMapper mapper, IHubContext<GroupHub, IGroupClient> groupHub,
            IHubContext<InvitationHub, IInvitationClient> invitationHub,
            IHubContext<SuperMessengerHub, ISuperMessengerClient> superMessangesHub
            )
        {
            _context = context;
            _mapper = mapper;
            _groupHub = groupHub;
            _invitationHub = invitationHub;
            _superMessangesHub = superMessangesHub;
        }
        public async Task<int> SendApplication(ApplicationModel applicationModel)
        {
            try
            {
                if (applicationModel.Value == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                else if (applicationModel.Value.Length > 150)
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
                var data = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
                    .Include(g => g.UserGroups)
                    .Include(g => g.Applications)
                    .Select(group => new
                    {
                        groupType = group.Type,
                        isInGroup = group.UserGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier) && ug.IsLeaved == false),
                        wasSentEarlier = group.Applications.Any(a => a.UserId == Guid.Parse(Context.UserIdentifier)),
                        creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                    })
                    .FirstOrDefaultAsync();
                if (!data.wasSentEarlier
                    && !data.isInGroup
                    && data.groupType == GroupType.Public)
                {
                    await SaveNewApplication(applicationModel);
                    applicationModel = await _context.Applications
                        .Where(a => a.GroupId == applicationModel.GroupId && a.UserId == applicationModel.User.Id)
                        .ProjectTo<ApplicationModel>(_mapper.ConfigurationProvider).SingleAsync();
                    await SendNewApplication(applicationModel, data.creatorId);
                    //await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successSubmitted.ToString());
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
        //public async Task SendApplication(ApplicationModel applicationModel)
        //{
        //    if (applicationModel.Value == null || applicationModel.Value.Length > 150)
        //    {
        //        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidValue.ToString());
        //        throw new HubException("500");
        //    }
        //    var data = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
        //        .Include(g => g.UserGroups)
        //        .Include(g => g.Applications)
        //        .Select(group => new
        //        {
        //            group,
        //            userGroups = group.UserGroups,
        //            wasSentEarlier = group.Applications.Any(a => a.UserId == Guid.Parse(Context.UserIdentifier)),
        //        })
        //        .FirstOrDefaultAsync();
        //    if (!data.wasSentEarlier)
        //    {
        //        var userGroups = await _context.Groups
        //            .Where(group => group.Id == applicationModel.GroupId)
        //            .SelectMany(group => group.UserGroups)
        //            .Include(ug => ug.User)
        //            .ToListAsync();
        //        if (!data.userGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)))
        //        {
        //            if (data.group.Type != GroupType.Public)
        //            {
        //                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidGroupType.ToString());
        //            }
        //            else
        //            {
        //                applicationModel.SendDate = DateTime.Now;
        //                var creatorId = data.userGroups.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId;
        //                await SaveNewApplication(applicationModel);
        //                await SendNewApplication(applicationModel, creatorId);
        //            }
        //        }
        //        else
        //        {
        //            await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreInGroup.ToString());
        //        }
        //    }
        //    else
        //    {
        //        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.wasSentEarlier.ToString());
        //    }
        //}
        private async Task SendNewApplication(ApplicationModel applicationModel, Guid creatorId)
        {
            if (creatorId != null)
            {
                await Clients.User(creatorId.ToString()).ReceiveApplication(applicationModel);
            }
            await Clients.User(Context.UserIdentifier).IncreaseMyApplicationsCount(1);
        }
        private async Task SaveNewApplication(ApplicationModel applicationModel)
        {
            await _context.Applications.AddAsync(new Application()
            {
                Value = applicationModel.Value,
                SendDate = DateTime.Now,
                UserId = applicationModel.User.Id,
                GroupId = applicationModel.GroupId,
            });
            await _context.SaveChangesAsync();
        }
        public async Task<int> RejectApplication(ApplicationModel applicationModel)
        {
            try
            {
                var application = await _context.Applications.Where(a => a.GroupId == applicationModel.GroupId
                && a.UserId == applicationModel.User.Id)
                    .FirstOrDefaultAsync();
                if (application == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                else
                {
                    await SaveRejecting(application);
                    await SendRejectingResult(applicationModel);
                    //await Clients.User(Context.UserIdentifier).ReceiveRejectApplicationResult(ApplicationResultType.successRejecting.ToString());
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
        private async Task SaveRejecting(Application application)
        {
            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
        }
        private async Task SendRejectingResult(ApplicationModel applicationModel)
        {
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationsCount(1);
        }

        public async Task<int> AcceptApplication(ApplicationModel applicationModel)
        {
            try
            {
                var data = await _context.Groups
                    .Where(g => g.Id == applicationModel.GroupId)
                    .Include(g => g.UserGroups)
                    .ThenInclude(ug => ug.User)
                    .Include(g => g.Invitations)
                    .Include(g => g.Messages)
                    .ThenInclude(g => g.User)
                    .Include(g => g.Applications)
                    .ThenInclude(a => a.User)
                    .ThenInclude(u => u.Connections)
                    .Select(group =>
                    new {
                        group,
                        isInGroup = group.UserGroups.Any(ug => ug.UserId == applicationModel.User.Id && ug.IsLeaved == false),
                        leavedUserGroup = group.UserGroups
                        .Where(ug => ug.UserId == applicationModel.User.Id && ug.IsLeaved == true)
                        .SingleOrDefault(),
                        invitations = group.Invitations.Where(i => i.InvitedUserId == applicationModel.User.Id),
                        applications = group.Applications.Where(a => a.UserId == applicationModel.User.Id),
                        connections = group.Applications.Where(a => a.UserId == applicationModel.User.Id)
                        .Select(a => a.User).SelectMany(u => u.Connections).Where(c => c.IsConnected),
                        creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                    })
                    .FirstOrDefaultAsync();
                var reduceInvtationModels = data.invitations.Select(i => _mapper.Map<ReduceInvtationModel>(i));
                var simpleGroup = _mapper.Map<SimpleGroupModel>(data.group);
                var application = data.applications.SingleOrDefault();
                if (data.creatorId == null
                    && application == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                if (!data.isInGroup
                    && _mapper.Map<ApplicationModel>(application).Equals(applicationModel) 
                    && data.creatorId == Guid.Parse(Context.UserIdentifier)
                    )
                {
                    await SaveAcceptingResult(applicationModel, application, data.invitations, data.leavedUserGroup);
                    await AddToGroup(data.connections, data.group.Id);
                    await SendAcceptingResult(applicationModel, reduceInvtationModels, simpleGroup);
                    //await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successAccepting.ToString());
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
        private async Task SaveAcceptingResult(ApplicationModel applicationModel, 
            Application application, 
            IEnumerable<Invitation> invitations, 
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
                    GroupId = applicationModel.GroupId,
                    UserId = applicationModel.User.Id,
                    IsCreator = false,
                    IsLeaved = false
                });
            }
            
            _context.Applications.Remove(application);
            _context.Invitations.RemoveRange(invitations);
            await _context.SaveChangesAsync();
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
        private async Task SendAcceptingResult(
            ApplicationModel applicationModel,
            IEnumerable<ReduceInvtationModel> reduceInvtationModels,
            SimpleGroupModel simpleGroup
            )
        {
            await _groupHub.Clients.User(applicationModel.User.Id.ToString()).ReceiveSimpleGroup(simpleGroup);
            var userInGroupModel = new UserInGroupModel()
            {
                Id = applicationModel.User.Id,
                Email = applicationModel.User.Email,
                ImageId = applicationModel.User.ImageId,
                IsCreator = false
            };
            await _superMessangesHub.Clients.Group(applicationModel.GroupId.ToString()).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);

            if (reduceInvtationModels != null && reduceInvtationModels.Count() > 0)
            {
                await _invitationHub.Clients.User(applicationModel.User.Id.ToString()).ReduceMyInvitations(reduceInvtationModels);
            }
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationsCount(1);
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
        }
    }
}
