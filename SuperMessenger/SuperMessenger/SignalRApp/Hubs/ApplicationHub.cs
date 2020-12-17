using AutoMapper;
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
        public async Task SendApplication(ApplicationModel applicationModel)
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
                    .ThenInclude(ug => ug.User)
                    .Include(g => g.Applications)
                    .Select(group => new
                    {
                        groupType = group.Type,
                        isInGroup = group.UserGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier) && !ug.IsLeaved),
                        wasSentEarlier = group.Applications.Any(a => a.UserId == Guid.Parse(Context.UserIdentifier)),
                        creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                    })
                    .FirstOrDefaultAsync();
                var me = await _context.Users.Where(u => u.Id == Guid.Parse(Context.UserIdentifier))
                    .ProjectTo<SimpleUserModel>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();
                if (applicationModel.User.Equals(me)
                    && !data.wasSentEarlier
                    && !data.isInGroup
                    && data.groupType == GroupType.Public)
                {
                    applicationModel.SendDate = DateTime.Now;
                    await SaveNewApplication(applicationModel);
                    await SendNewApplication(applicationModel, data.creatorId);
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
                SendDate = applicationModel.SendDate,
                UserId = applicationModel.User.Id,
                GroupId = applicationModel.GroupId,
            });
            await _context.SaveChangesAsync();
        }
        public async Task RejectApplication(ApplicationModel applicationModel)
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

        public async Task AcceptApplication(ApplicationModel applicationModel)
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
                    .ThenInclude(u => u.AvatarInformations)
                    .Select(group =>
                    new {
                        group,
                        isInGroup = group.UserGroups.Any(ug => ug.UserId == applicationModel.User.Id && ug.IsLeaved == false),
                        leavedUserGroup = group.UserGroups
                        .Where(ug => ug.UserId == applicationModel.User.Id && ug.IsLeaved == true)
                        .SingleOrDefault(),
                        invitations = group.Invitations.Where(i => i.InvitedUserId == applicationModel.User.Id),
                        applications = group.Applications.Where(a => a.UserId == applicationModel.User.Id),
                        creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                    })
                    .FirstOrDefaultAsync();
                var reduceInvtationModels = data.invitations.Select(i => _mapper.Map<ReduceInvtationModel>(i));
                var simpleGroup = _mapper.Map<SimpleGroupModel>(data.group);
                var application = data.applications.SingleOrDefault();
                var userGroups = data.group.UserGroups;
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
                    await SendAcceptingResult(applicationModel, reduceInvtationModels, simpleGroup, userGroups);
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
                    IsLeaved = false,
                    AddDate = DateTime.Now,
                });
            }
            
            _context.Applications.Remove(application);
            _context.Invitations.RemoveRange(invitations);
            await _context.SaveChangesAsync();
        }

        private async Task SendAcceptingResult(
            ApplicationModel applicationModel,
            IEnumerable<ReduceInvtationModel> reduceInvtationModels,
            SimpleGroupModel simpleGroup,
            List<UserGroup> userGroups
            )
        {
            await _groupHub.Clients.User(applicationModel.User.Id.ToString()).ReceiveSimpleGroup(simpleGroup);
            var userInGroupModel = new UserInGroupModel()
            {
                Id = applicationModel.User.Id,
                Email = applicationModel.User.Email,
                ImageName = applicationModel.User.ImageName,
                IsCreator = false
            };
            var userIds = userGroups.Select(ug => ug.UserId.ToString()).ToList();
            await _superMessangesHub.Clients.Groups(userIds).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);

            if (reduceInvtationModels != null && reduceInvtationModels.Count() > 0)
            {
                await _invitationHub.Clients.User(applicationModel.User.Id.ToString()).ReduceMyInvitations(reduceInvtationModels);
            }
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationsCount(1);
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
        }
    }
}
