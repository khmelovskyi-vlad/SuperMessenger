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
    public class ApplicationHub : Hub<IApplicationClient>
    {
        private readonly SuperMessengerDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHubContext<GroupHub, IGroupClient> _groupHub;
        private readonly IHubContext<InvitationHub, IInvitationClient> _invitationHub;
        public ApplicationHub(
            SuperMessengerDbContext context,
            IMapper mapper, IHubContext<GroupHub, IGroupClient> groupHub,
            IHubContext<InvitationHub, IInvitationClient> invitationHub
            )
        {
            _context = context;
            _mapper = mapper;
            _groupHub = groupHub;
            _invitationHub = invitationHub;
        }
        public async Task SendApplication2(ApplicationModel applicationModel)
        {
            if (applicationModel.Value == null || applicationModel.Value.Length > 150)
            {
                throw new HubException("500");
            }
            var data = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
                .Include(g => g.UserGroups)
                .Include(g => g.Applications)
                .Select(group => new
                {
                    group,
                    userGroups = group.UserGroups,
                    wasSentEarlier = group.Applications.Any(a => a.UserId == Guid.Parse(Context.UserIdentifier)),
                })
                .FirstOrDefaultAsync();
            if (!data.wasSentEarlier)
            {
                if (!data.userGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)))
                {
                    if (data.group.Type == GroupType.Public)
                    {
                        applicationModel.SendDate = DateTime.Now;
                        var creatorId = data.userGroups.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId;
                        await SaveNewApplication(applicationModel);
                        await SendNewApplication(applicationModel, creatorId);
                        return;
                    }
                }
            }
            throw new HubException("500");
        }
        public async Task SendApplication(ApplicationModel applicationModel)
        {
            if (applicationModel.Value == null || applicationModel.Value.Length > 150)
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidValue.ToString());
                throw new HubException("500");
            }
            var data = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
                .Include(g => g.UserGroups)
                .Include(g => g.Applications)
                .Select(group => new
                {
                    group,
                    userGroups = group.UserGroups,
                    wasSentEarlier = group.Applications.Any(a => a.UserId == Guid.Parse(Context.UserIdentifier)),
                })
                .FirstOrDefaultAsync();
            if (!data.wasSentEarlier)
            {
                var userGroups = await _context.Groups
                    .Where(group => group.Id == applicationModel.GroupId)
                    .SelectMany(group => group.UserGroups)
                    .Include(ug => ug.User)
                    .ToListAsync();
                if (!data.userGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)))
                {
                    if (data.group.Type != GroupType.Public)
                    {
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidGroupType.ToString());
                    }
                    else
                    {
                        applicationModel.SendDate = DateTime.Now;
                        var creatorId = data.userGroups.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId;
                        await SaveNewApplication(applicationModel);
                        await SendNewApplication(applicationModel, creatorId);
                    }
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreInGroup.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.wasSentEarlier.ToString());
            }
        }
        private async Task SendNewApplication(ApplicationModel applicationModel, Guid? creatorId)
        {
            if (creatorId != null)
            {
                await Clients.User(creatorId.ToString()).ReceiveApplication(applicationModel);
            }
            await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successSubmitted.ToString());
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
            var application = await _context.Applications.Where(a => a.GroupId == applicationModel.GroupId
            && a.UserId == applicationModel.User.Id)
                .FirstOrDefaultAsync();
            if (application != null)
            {
                await SaveRejecting(application);
                await SendRejectingResult(applicationModel);
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveRejectApplicationResult(ApplicationResultType.notHaveApplication.ToString());
            }
        }
        private async Task SaveRejecting(Application application)
        {
            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
        }
        private async Task SendRejectingResult(ApplicationModel applicationModel)
        {
            await Clients.User(Context.UserIdentifier).ReceiveRejectApplicationResult(ApplicationResultType.successRejecting.ToString());
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationsCount(1);
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
        public async Task AcceptApplication(ApplicationModel applicationModel)
        {
            var data = await _context.Groups
                .Where(g => g.Id == applicationModel.GroupId)
                .Include(g => g.Applications)
                .Include(g => g.UserGroups)
                .Include(g => g.Invitations)
                .ThenInclude(i => i.InvitedUser)
                .Include(g => g.Invitations)
                .ThenInclude(i => i.Inviter)
                .Include(g => g.Messages)
                .ThenInclude(g => g.User)
                .Select(group => 
                new { 
                    group,
                    invitations = group.Invitations.Where(i => i.InvitedUserId == applicationModel.User.Id),
                    application = group.Applications.Where(a => a.UserId == applicationModel.User.Id).FirstOrDefault(),
                    creatorId = group.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault().UserId,
                    invitationModels = group.Invitations.Where(i => i.InvitedUserId == applicationModel.User.Id)
                    .Select(i => _mapper.Map<InvitationModel>(i)),
                    simpleGroup = _mapper.Map<SimpleGroupModel>(group),
                })
                .FirstOrDefaultAsync();
            if (data.creatorId != null && data.creatorId == Guid.Parse(Context.UserIdentifier))
            {
                if (data.application != null)
                {
                    await SaveAcceptingResult(applicationModel, data.application, data.invitations);
                    await SendAcceptingResult(applicationModel, data.group.UserGroups, data.invitationModels, data.simpleGroup);
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.notHaveApplication.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreNotCreator.ToString());
            }
        }
        private async Task SaveAcceptingResult(ApplicationModel applicationModel, Application application, IEnumerable<Invitation> invitations)
        {
            await _context.UserGroups.AddAsync(new UserGroup()
            {
                GroupId = applicationModel.GroupId,
                UserId = applicationModel.User.Id,
                IsCreator = false,
                IsLeaved = false
            });
            _context.Applications.Remove(application);
            _context.Invitations.RemoveRange(invitations);
            await _context.SaveChangesAsync();
        }
        private async Task SendAcceptingResult(
            ApplicationModel applicationModel,
            IEnumerable<UserGroup> userGroups, 
            IEnumerable<InvitationModel> invitationModels,
            SimpleGroupModel simpleGroup
            )
        {
            await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successAccepting.ToString());
            await _groupHub.Clients.User(applicationModel.User.Id.ToString()).ReceiveSimpleGroup(simpleGroup);
            var userInGroupModel = new UserInGroupModel()
            {
                Id = applicationModel.User.Id,
                Email = applicationModel.User.Email,
                ImageId = applicationModel.User.ImageId,
                IsCreator = false
            };
            if (userGroups != null)
            {
                foreach (var userGroup in userGroups.Where(ug => ug.UserId != applicationModel.User.Id))
                {
                    await _groupHub.Clients.User(userGroup.UserId.ToString()).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);
                }
            }

            if (invitationModels != null && invitationModels.Count() > 0)
            {
                await _invitationHub.Clients.User(applicationModel.User.Id.ToString()).ReduceMyInvitations(invitationModels);
            }
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationsCount(1);
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
        }
    }
}
