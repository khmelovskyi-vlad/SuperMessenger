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
        readonly SuperMessengerDbContext _context;
        readonly IMapper _mapper;
        public ApplicationHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task SendApplication(ApplicationModel application)
        {
            if (application.Value == null || application.Value.Length > 150)
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidValue.ToString());
            }
            if ((await _context.Applications.Where(a => a.UserId == application.User.Id &&
                a.GroupId == application.GroupId).CountAsync()) == 0)
            {
                var userGroups = await _context.Groups
                    .Where(group => group.Id == application.GroupId)
                    .SelectMany(group => group.UserGroups)
                    .Include(ug => ug.User)
                    .ToListAsync();
                if (userGroups.Where(ug => ug.UserId == application.User.Id).Count() == 0)
                {
                    if ((await _context.Groups.Where(g => g.Id == application.GroupId).FirstOrDefaultAsync())?.Type != GroupType.Public)
                    {
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidGroupType.ToString());
                    }
                    else
                    {
                        application.SendDate = DateTime.Now;
                        await _context.Applications.AddAsync(new Application()
                        {
                            Value = application.Value,
                            SendDate = application.SendDate,
                            UserId = application.User.Id,
                            GroupId = application.GroupId,
                        });
                        var creatorId = userGroups.Where(ug => ug.IsCreator)
                            .FirstOrDefault()?.UserId;
                        await _context.SaveChangesAsync();
                        if (creatorId != null)
                        {
                            await Clients.User(creatorId.ToString()).ReceiveApplication(application);
                        }
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successSubmitted.ToString());
                        await Clients.User(Context.UserIdentifier).IncreaseMyApplicationsCount(1);
                        //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.successSubmitted.ToString());
                    }
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreInGroup.ToString());
                    //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.youAreInGroup.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.wasSentEarlier.ToString());
                //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.wasSentEarlier.ToString());
            }
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
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationCount(1);
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
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
            //var userGroups = await _context.Groups
            //    .Where(group => group.Id == applicationModel.GroupId)
            //    .SelectMany(group => group.UserGroups)
            //    .Include(ug => ug.User)
            //    .ToListAsync();
            var group = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
                .Include(g => g.Invitations)
                .ThenInclude(i => i.InvitedUser)
                .Include(g => g.Invitations)
                .ThenInclude(i => i.Inviter)
                .Include(g => g.Applications)
                .Include(g => g.UserGroups)
                //.ThenInclude(ug => ug.User)
                .FirstOrDefaultAsync();
            var invitations = group?.Invitations.Where(i => i.InvitedUserId == applicationModel.User.Id);
            var invitationsCount = invitations.Count();
            var application = group?.Applications.Where(a => a.UserId == applicationModel.User.Id).FirstOrDefault();
            //var application = await _context.Applications
            //    .Where(a => a.GroupId == applicationModel.GroupId)
            //    .Include(a => a.Group)
            //    .ThenInclude(group => group.UserGroups)
            //    .ThenInclude(ug => ug.User)
            //    .FirstAsync();
            var creatorId = group?.UserGroups.Where(ug => ug.IsCreator).FirstOrDefault()?.UserId;
                //application?.Group.UserGroups.Where(ug => ug.IsCreator)
                //.FirstOrDefault()?.UserId;
            if (creatorId != null && creatorId == Guid.Parse(Context.UserIdentifier))
            {
                //if ((await _context.Applications.Where(a => a.UserId == applicationModel.User.Id &&
                //    a.GroupId == applicationModel.GroupId).CountAsync()) != 0)
                if (application != null)
                {
                    var invitationModels = CreateInvitationModels(invitations, group);
                    //if (application.Group.UserGroups.Where(ug => ug.UserId == applicationModel.User.Id).Count() == 0)
                    //{
                    await SaveAcceptingResult(applicationModel, application, invitations);
                        await SendAcceptingResult(applicationModel, group.UserGroups, invitationsCount, invitationModels);
                        //await Clients.User(applicationModel.User.Id.ToString()).ReceiveAcceptApplicationResult(groupModel);
                        //await Clients.User(Context.UserIdentifier).ReceiveAcceptApplicationResult(SendingResult.successAcceptingApplication, groupModel);
                    //}
                    //else
                    //{
                    //    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.userIsInGroup.ToString());
                    //    //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.userIsInGroup.ToString());
                    //}
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.notHaveApplication.ToString());
                    //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.notHaveApplication.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreNotCreator.ToString());
                //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.youAreNotCreator.ToString());
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
            //var userInvitations = groupInvitations.Where(i => i.InvitedUserId == applicationModel.User.Id);
            //var invitations = await _context.Invitations
            //    .Where(i => i.InvitedUserId == applicationModel.User.Id && i.GroupId == applicationModel.GroupId)
            //    .ToListAsync();
            _context.Invitations.RemoveRange(invitations);
            await _context.SaveChangesAsync();
        }
        private async Task SendAcceptingResult(
            ApplicationModel applicationModel, 
            List<UserGroup> userGroups, 
            int invitationsCount,
            List<InvitationModel> invitationModels
            )
        {
            //var groupModel = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
            //    .ProjectTo<GroupModel>(_mapper.ConfigurationProvider)
            //    .FirstOrDefaultAsync();
            var simpleGroup = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
                .ProjectTo<SimpleGroupModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successAccepting.ToString());
            //await Clients.User(Context.UserIdentifier).ReceiveAcceptApplicationResult(ApplicationResultType.successAccepting.ToString());
            await Clients.User(applicationModel.User.Id.ToString()).ReceiveSimpleGroup(simpleGroup);
            //await Clients.User(applicationModel.User.Id.ToString()).ReceiveApplicationConfirmation(groupModel);
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
                    await Clients.User(userGroup.UserId.ToString()).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);
                }
            }

            //if (invitationsCount > 0)
                if(invitationModels != null && invitationModels.Count() > 0)
            {
                await Clients.User(applicationModel.User.Id.ToString()).ReduceMyInvitations(invitationModels);
                //await Clients.User(applicationModel.User.Id.ToString()).ReduceMyInvitationCount(invitationsCount);
            }
            await Clients.User(applicationModel.User.Id.ToString()).ReduceMyApplicationCount(1);
            await Clients.User(Context.UserIdentifier).ReduceGroupApplication(applicationModel.User.Id, applicationModel.GroupId);
        }
    }
}
