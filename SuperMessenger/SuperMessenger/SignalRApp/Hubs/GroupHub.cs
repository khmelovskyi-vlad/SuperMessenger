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
        private async Task RemoveFromGroup(IEnumerable<Connection> connections, Guid groupId)
        {
            if (connections != null)
            {
                foreach (var connection in connections)
                {
                    await _superMessangesHub.Groups.RemoveFromGroupAsync(connection.ConnectionId, groupId.ToString());
                }
            }
        }
        public async Task CheckGroupNamePart(string groupNamePart)
        {
            await Clients.User(Context.UserIdentifier).ReceiveCheckGroupNamePartResult(
            !((await _context.Groups.Where(group => group.Type == GroupType.Public && group.Name == groupNamePart).CountAsync()) > 0));
        }
        public async Task<int> LeaveGroup(Guid groupId)
        {
            try
            {
                var myUserGroup = await _context.Groups.Where(g => g.Id == groupId)
                    .Include(g => g.UserGroups)
                    .ThenInclude(ug => ug.User)
                    .ThenInclude(ug => ug.Connections)
                    .SelectMany(group => group.UserGroups.Where(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)))
                    .SingleOrDefaultAsync();
                var myConnections = myUserGroup.User.Connections.Where(c => c.IsConnected);
                if (myUserGroup != null)
                {
                    await SaveLeaving(myUserGroup);
                    await RemoveFromGroup(myConnections, groupId);
                    await SendRemodeGroup(groupId);
                    return StatusCodes.Status200OK;
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
        private async Task SendRemodeGroup(Guid groupId)
        {
            await _superMessangesHub.Clients.Group(groupId.ToString()).ReceiveLeftGroupUserId(Guid.Parse(Context.UserIdentifier), groupId);
        }
        private async Task SaveLeaving(UserGroup userGroup)
        {
            userGroup.IsLeaved = true;
            await _context.SaveChangesAsync();
        }
        public async Task SearchNoMyGroup(string groupNamePart)
        {
            var myId = Guid.Parse(Context.UserIdentifier);
            var groups = await _context.Groups
                .Where(group => group.Type == GroupType.Public
                && group.Name.Contains(groupNamePart)
                && !group.UserGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier) && !ug.IsLeaved))
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
        public async Task<int> RemoveGroup(Guid groupId)
        {
            try
            {
                var data = await _context.Groups
                    .Include(g => g.UserGroups)
                    .ThenInclude(ug => ug.User)
                    .ThenInclude(u => u.Connections)
                    .Include(g => g.Applications)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.InvitedUser)
                    .Include(g => g.Invitations)
                    .ThenInclude(i => i.Inviter)
                    .Where(g => g.Id == groupId)
                    .Select(group =>
                    new {
                        group,
                        //myUserGroup = group.UserGroups.FirstOrDefault(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)),
                        applications = group.Applications,
                        connections = group.UserGroups.Select(ug => ug.User).SelectMany(u => u.Connections).Where(c => c.IsConnected),
                    })
                    .FirstOrDefaultAsync();
                var reduceInvtationModels = data.group.Invitations.Select(inv => _mapper.Map<ReduceInvtationModel>(inv));
                var myUserGroup = data.group.UserGroups.FirstOrDefault(ug => ug.UserId == Guid.Parse(Context.UserIdentifier));
                if (myUserGroup == null)
                {
                    throw new HubException(StatusCodes.Status404NotFound.ToString());
                }
                if (myUserGroup.IsCreator)
                {
                    await SaveRemoving(data.group);
                    await SendRemoving(reduceInvtationModels, data.applications, groupId);
                    await RemoveFromGroup(data.connections, groupId);
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
        private async Task SaveRemoving(Group group)
        {
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
        }
        private async Task SendRemoving(
            IEnumerable<ReduceInvtationModel> reduceInvtationModels, 
            IEnumerable<Application> applications, 
            Guid groupId)
        {
            await _superMessangesHub.Clients.Group(groupId.ToString()).ReceiveRomevedGroup(groupId, "Group was deleted");
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
                foreach (var invitation in applications)
                {
                    await _applicationHub.Clients.User(invitation.UserId.ToString()).ReduceMyApplicationsCount(1);
                }
            }
        }
        public async Task<int> CreateGroup(NewGroupModel newGroupModel)
        {
            try
            {
                var type = (GroupType)Enum.Parse(typeof(GroupType), newGroupModel.Type, true);
                await CheckCanCreateGroup(type, newGroupModel);
                var group = CreateNewGroup(newGroupModel, type);
                await SaveNewGroup(group, newGroupModel);
                var simpleGroup = _mapper.Map<SimpleGroupModel>(group);
                var connections = await _context.Users.Where(u => u.Id == Guid.Parse(Context.UserIdentifier)).SelectMany(u => u.Connections).ToListAsync();
                await AddToGroup(connections, group.Id);
                await SendGroup(newGroupModel, simpleGroup);
                return StatusCodes.Status200OK;
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
            var imgId = newGroupModel.HaveImage ? Guid.NewGuid() : new Guid();
            return new Group()
            {
                Id = groupId,
                Name = type == GroupType.Chat ? null : newGroupModel.Name,
                Type = type,
                CreationDate = DateTime.Now,
                //ImageId = imgId, /////////////////////////////////////////////////////////////////////////////////////////////      change
            };
        }
        private async Task SendGroup(NewGroupModel newGroup, SimpleGroupModel simpleGroup)
        {
            await Clients.User(Context.UserIdentifier).ReceiveSimpleGroup(simpleGroup);
            foreach (var invitation in newGroup.Invitations)
            {
                invitation.SimpleGroup = simpleGroup;
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
            else if (type == GroupType.Public && await _context.Groups
                    .Where(group => group.Type == GroupType.Public)
                    .AnyAsync(g => g.Name == newGroupModel.Name))
            {
                throw new HubException(StatusCodes.Status403Forbidden.ToString());
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
