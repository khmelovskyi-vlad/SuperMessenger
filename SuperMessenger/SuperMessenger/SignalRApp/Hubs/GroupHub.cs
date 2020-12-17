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
    public class GroupHub : Hub<IGroupClient>
    {
        SuperMessengerDbContext _context { get; set; }
        private readonly IMapper _mapper;
        private readonly IHubContext<InvitationHub, IInvitationClient> _invitationHub;
        private readonly IHubContext<ApplicationHub, IApplicationClient> _applicationHub;
        private readonly IHubContext<SuperMessengerHub, ISuperMessengerClient> _superMessangesHub;
        public GroupHub(SuperMessengerDbContext context, 
            IMapper mapper, 
            IHubContext<InvitationHub, IInvitationClient> invitationHub, 
            IHubContext<ApplicationHub, IApplicationClient> applicationHub,
            IHubContext<SuperMessengerHub, ISuperMessengerClient> superMessangesHub)
        {
            _context = context;
            _mapper = mapper;
            _invitationHub = invitationHub;
            _applicationHub = applicationHub;
            _superMessangesHub = superMessangesHub;
        }
        public async Task CheckGroupNamePart(string groupNamePart)
        {
            await Clients.User(Context.UserIdentifier).ReceiveCheckGroupNamePartResult(
            !((await _context.Groups.Where(group => group.Type == GroupType.Public && group.Name == groupNamePart).CountAsync()) > 0));
        }
        public async Task LeaveGroup(Guid groupId)
        {
            try
            {
                var userGroups = await _context.Groups.Where(g => g.Id == groupId)
                    .Include(g => g.UserGroups)
                    .Select(group => group.UserGroups)
                    .SingleOrDefaultAsync();
                var myUserGroup = userGroups.SingleOrDefault(ug => ug.UserId == Guid.Parse(Context.UserIdentifier));
                var newOwner = userGroups.OrderBy(ug => ug.AddDate).FirstOrDefault(ug => ug.UserId != Guid.Parse(Context.UserIdentifier));
                if (myUserGroup != null)
                {
                    await SaveLeaving(myUserGroup, newOwner);
                    await SendRemodeGroup(groupId, userGroups, newOwner);
                }
                else
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
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
        private async Task SendRemodeGroup(Guid groupId, List<UserGroup> userGroups, UserGroup newOwner)
        {
            var userIds = userGroups.Where(ug => ug.UserId != Guid.Parse(Context.UserIdentifier)).Select(ug => ug.UserId.ToString()).ToList();
            await _superMessangesHub.Clients.Groups(userIds).ReceiveLeftGroupUserId(Guid.Parse(Context.UserIdentifier), groupId);
            if (newOwner != null)
            {
                await _superMessangesHub.Clients.Groups(userIds).ReceiveNewOwnerUserId(newOwner.UserId, groupId);
            }
        }
        private async Task SaveLeaving(UserGroup userGroup, UserGroup newOwner)
        {
            userGroup.IsLeaved = true;
            if (newOwner != null)
            {
                newOwner.IsCreator = true;
                userGroup.IsCreator = false;
            }
            await _context.SaveChangesAsync();
        }
        public async Task SearchNoMyGroup(string groupNamePart)
        {
            var myId = Guid.Parse(Context.UserIdentifier);
            var groups = await _context.Groups
                .Where(group => group.Type == GroupType.Public
                && group.Name.Contains(groupNamePart)
                && !group.UserGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier) && !ug.IsLeaved)
                && !group.Applications.Any(a => a.UserId == Guid.Parse(Context.UserIdentifier)))
                .ProjectTo<SimpleGroupModel>(_mapper.ConfigurationProvider)
                .Select(sgm => new SimpleGroupModel() { Id = sgm.Id, ImageName = sgm.ImageName, Name = sgm.Name, Type = sgm.Type})
                .Take(10)
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveNoMySearchedGroups(groups);
        }
        public async Task SendGroupData(Guid groupId)
        {
            try
            {
                var groupModel = await _context.UserGroups.
                    Where(userGroup => userGroup.GroupId == groupId
                    && userGroup.UserId == Guid.Parse(Context.UserIdentifier)
                    && !userGroup.IsLeaved)
                    .Select(userGroup => userGroup.Group)
                    .ProjectTo<GroupModel>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();
                if (groupModel == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                if (groupModel.Users.Any(user => user.IsCreator && user.Id == Guid.Parse(Context.UserIdentifier)))
                {
                    groupModel.IsCreator = true;
                }
                else
                {
                    groupModel.Invitations = null;
                    groupModel.Applications = null;
                }
                await Clients.User(Context.UserIdentifier).ReceiveGroupData(groupModel);
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
        public async Task RemoveGroup(Guid groupId)
        {
            try
            {
                var group = await _context.Groups
                    .Include(g => g.UserGroups)
                    .Include(g => g.Applications)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.InvitedUser)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.Inviter)
                    .Where(g => g.Id == groupId)
                    .SingleOrDefaultAsync();
                var reduceInvtationModels = group.Invitations.Select(inv => _mapper.Map<ReduceInvtationModel>(inv));
                var userGroups = group.UserGroups;
                var myUserGroup = group.UserGroups.SingleOrDefault(ug => ug.UserId == Guid.Parse(Context.UserIdentifier));
                if (myUserGroup == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                if (myUserGroup.IsCreator)
                {
                    await SaveRemoving(group);
                    await SendRemoving(reduceInvtationModels, group.Applications, groupId, userGroups);
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
        private async Task SaveRemoving(Group group)
        {
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
        }
        private async Task SendRemoving(
            IEnumerable<ReduceInvtationModel> reduceInvtationModels, 
            IEnumerable<Application> applications, 
            Guid groupId,
            List<UserGroup> userGroups 
            )
        {
            var userIds = userGroups.Select(ug => ug.UserId.ToString()).ToList();
            await _superMessangesHub.Clients.Groups(userIds).ReceiveRomevedGroup(groupId, "Group was deleted");
            if (reduceInvtationModels != null)
            {
                foreach (var reduceInvtationModel in reduceInvtationModels)
                {
                    await _invitationHub.Clients.User(reduceInvtationModel.InvitedUserId.ToString())
                        .ReduceMyInvitations(new List<ReduceInvtationModel>() { reduceInvtationModel });
                }
            }
            if (applications != null)
            {
                foreach (var application in applications)
                {
                    await _applicationHub.Clients.User(application.UserId.ToString()).ReduceMyApplicationsCount(1);
                }
            }
        }
        public async Task CreateGroup(NewGroupModel newGroupModel)
        {
            try
            {
                var type = (GroupType)Enum.Parse(typeof(GroupType), newGroupModel.Type, true);
                await CheckCanCreateGroup(type, newGroupModel);
                var group = CreateNewGroup(newGroupModel, type);
                await SaveNewGroup(group, newGroupModel);
                var simpleGroup = _mapper.Map<SimpleGroupModel>(group);
                await SendGroup(newGroupModel, simpleGroup);
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
        private Group CreateNewGroup(NewGroupModel newGroupModel, GroupType type)
        {
            var groupId = Guid.NewGuid();
            return new Group()
            {
                Id = groupId,
                Name = type == GroupType.Chat ? null : newGroupModel.Name,
                Type = type,
                CreationDate = DateTime.Now,
            };
        }
        private async Task SendGroup(NewGroupModel newGroup, SimpleGroupModel simpleGroup)
        {
            await Clients.User(Context.UserIdentifier).ReceiveSimpleGroup(simpleGroup);
            foreach (var invitation in newGroup.Invitations)
            {
                invitation.Group = simpleGroup;
                await _invitationHub.Clients.User(invitation.InvitedUser.Id.ToString()).ReceiveInvitation(invitation);
            }
        }
        private async Task CheckCanCreateGroup(GroupType type, NewGroupModel newGroupModel)
        {
            if ((type == GroupType.Private || type == GroupType.Public)
                && (newGroupModel.Name == null || newGroupModel.Name.Length == 0 || newGroupModel.Name.Length > 50))
            {
                throw new HubException(StatusCodes.Status403Forbidden.ToString());
            }
            else if (type == GroupType.Public)
            {
                if (await _context.Groups
                    .Where(group => group.Type == GroupType.Public)
                    .AnyAsync(g => g.Name == newGroupModel.Name))
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
                return;
            }
            else if (type == GroupType.Chat)
            {
                var users = newGroupModel.Invitations.Select(i => new { inviter = i.Inviter, invited = i.InvitedUser }).FirstOrDefault();
                if (newGroupModel.Invitations.Count() != 1 || newGroupModel.HaveImage 
                    || await _context.Users.Where(user => user.Id == users.inviter.Id
                        && user.Id == users.invited.Id)
                        .SelectMany(user => user.UserGroups)
                        .Select(userGroup => userGroup.Group)
                        .Where(g => g.Type == GroupType.Chat)
                        .SelectMany(g => g.UserGroups)
                        .AnyAsync(ug => ug.UserId == users.inviter.Id && ug.UserId == users.invited.Id))
                {
                    throw new HubException(StatusCodes.Status403Forbidden.ToString());
                }
            }
            else if (type == GroupType.Private)
            {
                return;
            }
            else
            {
                throw new HubException(StatusCodes.Status403Forbidden.ToString());
            }
        }
        private async Task SaveNewGroup(Group group, NewGroupModel newGroupModel)
        {
            await _context.Groups.AddAsync(group);
            await _context.UserGroups.AddAsync(new UserGroup()
            {
                UserId = Guid.Parse(Context.UserIdentifier),
                GroupId = group.Id,
                IsCreator = true,
                IsLeaved = false,
                AddDate = DateTime.Now,
            });
            var newInvitations = CreateInvitations(newGroupModel.Invitations, group.Id);
            await _context.Invitations.AddRangeAsync(newInvitations);
            if (newGroupModel.HaveImage)
            {
                (await _context.FileInformations.Where(fi => fi.Id == newGroupModel.ContentId).SingleOrDefaultAsync()).GroupId = group.Id;
            }
            await _context.SaveChangesAsync();
        }
        private List<Invitation> CreateInvitations(List<InvitationModel> invitations, Guid groupId)
        {
            List<Invitation> newInvitations = new List<Invitation>();
            foreach (var invitation in invitations)
            {
                invitation.SendDate = DateTime.Now;
                newInvitations.Add(new Invitation()
                {
                    Value = invitation.Value,
                    SendDate = invitation.SendDate,
                    GroupId = groupId,
                    InviterId = invitation.Inviter.Id,
                    InvitedUserId = invitation.InvitedUser.Id
                });
            }
            return newInvitations;
        }
    }
}
