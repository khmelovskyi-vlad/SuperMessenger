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
        public GroupHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //public async Task SendMessage(string groupName, Group group)
        //{
        //    message.Id = Guid.NewGuid();
        //    message.SendDate = DateTime.Now;
        //    await SaveMessage(message);
        //    await Clients.OthersInGroup(groupName).ReceiveMessage(message);
        //    //Context.UserIdentifier
        //}
        //private async Task SaveMessage(Message message)
        //{
        //    await _context.Message.AddAsync(message);
        //}
        public async Task CheckGroupNamePart(string groupNamePart)
        {
            await Clients.User(Context.UserIdentifier).ReceiveCheckGroupNamePartResult(
            !((await _context.Groups.Where(group => group.Type == GroupType.Public && group.Name == groupNamePart).CountAsync()) > 0));
        }
        public async Task LeaveGroup(Guid groupId)
        {
            var group = await _context.Groups.Where(g => g.Id == groupId)
                .Include(g => g.UserGroups)
                .FirstOrDefaultAsync();
            var myUserGroup = group.UserGroups.Where(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)).FirstOrDefault();
            if (myUserGroup != null)
            {
                await SaveLeaving(myUserGroup);
                await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.successLeft.ToString());
                await SendRemodeGroup(group.UserGroups, groupId);
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.noLeft.ToString());
            }
        }
        private async Task SendRemodeGroup(List<UserGroup> userGroups, Guid groupId)
        {
            foreach (var userGroup in userGroups)
            {
                await Clients.User(userGroup.UserId.ToString()).ReceiveLeftGroupUserId(Guid.Parse(Context.UserIdentifier), groupId);
            }
        }
        private async Task SaveLeaving(UserGroup userGroup)
        {
            userGroup.IsLeaved = true;
            await _context.SaveChangesAsync();
        }
        public async Task CreateeGroup(string groupType, string groupName, object files)
        {
            //public Guid Id { get; set; }
            //public string Name { get; set; }
            //public DateTime CreationDate { get; set; }
            //public Guid ImageId { get; set; }
            //public GroupType Type { get; set; }
            var type = (GroupType) Enum.Parse(typeof(GroupType), groupType, true);
            var groupId = Guid.NewGuid();
            var group = new Group() { Id = groupId, CreationDate = DateTime.Now, Type = type, Name = groupName };
            await _context.Groups.AddAsync(group);
            //if ()
            //{

            //}
        }
        public async Task SearchGroup(string groupNamePart)
        {
            var groups = await _context.Groups
                .Where(group => group.Type == GroupType.Public
                && group.Name.Contains(groupNamePart))
                .ProjectTo<SimpleGroupModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            foreach (var group in groups)
            {
                group.LastMessage = null;
            }
            await Clients.User(Context.UserIdentifier).ReceiveSearchedGroups(groups);
        }
        public async Task SearchNoMyGroup(string groupNamePart)
        {
            var groups = await _context.Groups
                .Where(group => group.Type == GroupType.Public
                && !group.UserGroups.Any(ug => ug.UserId == Guid.Parse(Context.UserIdentifier))
                && group.Name.Contains(groupNamePart))
                .ProjectTo<SimpleGroupModel>(_mapper.ConfigurationProvider)
                .ToListAsync();
            foreach (var group in groups)
            {
                group.LastMessage = null;
            }
            await Clients.User(Context.UserIdentifier).ReceiveNoMySearchedGroups(groups);
        }
        public async Task SearchMyGroup(string groupName, bool isPrivate = false, bool isPublic = false, bool isChat = false)
        {
            var groups = await _context.Users
                .Where(user => user.Id == Guid.Parse(Context.UserIdentifier))
                .SelectMany(user => user.UserGroups)
                .Select(userGroup => userGroup.Group)
                .Where(group => isPrivate ? group.Type == GroupType.Private : true
                && isPublic ? group.Type == GroupType.Public : true
                && isChat ? group.Type == GroupType.Chat : true
                && group.Name.Contains(groupName))
                .ToListAsync();
            await Clients.User(Context.UserIdentifier).ReceiveMySearchedGroups(groups);
        }
        public async Task ConnectToGroups()
        {
            var userGroups = await  _context.Users.Where(user => user.Id == Guid.Parse(Context.UserIdentifier))
                .SelectMany(user => user.UserGroups)
                .ToListAsync();
            foreach (var userGroup in userGroups)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userGroup.GroupId.ToString());
            }
        }
        public async Task SendGroupData(Guid groupId)
        {
            var groupModel = await _context.UserGroups.
                Where(userGroup => userGroup.GroupId == groupId 
                && userGroup.UserId == Guid.Parse(Context.UserIdentifier)
                && !userGroup.IsLeaved)
                .Select(userGroup => userGroup.Group)
                .ProjectTo<GroupModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            if (groupModel != null)
            {
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
        }
        public async Task RemoveGroup(Guid groupId)
        {
            var group = await _context.Groups.Where(g => g.Id == groupId)
                .Include(g => g.UserGroups)
                .FirstOrDefaultAsync();
            var myUserGroup = group.UserGroups.Where(ug => ug.UserId == Guid.Parse(Context.UserIdentifier)).FirstOrDefault();
            if (myUserGroup != null)
            {
                if (myUserGroup.IsCreator)
                {
                    await SaveRemoving(group);
                    await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.successRemoved.ToString());
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.haveNoPermissions.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.haveNoPermissions.ToString());
            }
        }
        private async Task SaveRemoving(Group group)
        {
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
        }
        public async Task CreateGroup(NewGroupModel newGroupModel)
        {
            var type = (GroupType)Enum.Parse(typeof(GroupType), newGroupModel.Type, true);
            if (await CheckCanCreateGroup(type, newGroupModel))
            {
                var groupId = Guid.NewGuid();
                var imgId = newGroupModel.HaveImage ? Guid.NewGuid() : new Guid() ;
                var group = new Group()
                {
                    Id = groupId,
                    Name = type == GroupType.Chat ? null : newGroupModel.Name,
                    Type = type,
                    CreationDate = DateTime.Now,
                    ImageId = imgId,
                };

                await SaveNewGroup(group, newGroupModel.Invitations);

                var simpleGroup = new SimpleGroupModel()
                {
                    Id = groupId,
                    ImageId = imgId,
                    Name = newGroupModel.Name,
                    Type = newGroupModel.Type,
                    LastMessage = null
                };

                await SendGroup(newGroupModel, simpleGroup);
                if (newGroupModel.HaveImage)
                {
                    await Clients.User(Context.UserIdentifier).SendGroupImage(imgId, newGroupModel.PreviousImageId);
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.successAdded.ToString());
                }
            }
        }
        private async Task SendGroup(NewGroupModel newGroup, SimpleGroupModel simpleGroup)
        {
            await Clients.User(Context.UserIdentifier).ReceiveSimpleGroup(simpleGroup);
            foreach (var invitation in newGroup.Invitations)
            {
                invitation.SimpleGroup = simpleGroup;
                await Clients.User(invitation.InvitedUser.Id.ToString()).ReceiveInvitation(invitation);
            }
        }
        private async Task<bool> CheckCanCreateGroup(GroupType type, NewGroupModel newGroupModel)
        {
            if ((type == GroupType.Private || type == GroupType.Public)
                && (newGroupModel.Name == null || newGroupModel.Name.Length == 0 || newGroupModel.Name.Length > 50))
            {
                await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.invalidName.ToString());
                return false;
            }
            else if (type == GroupType.Public)
            {
                if (await _context.Groups
                    .Where(group => group.Type == GroupType.Public)
                    .AnyAsync(g => g.Name == newGroupModel.Name))
                {
                    await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.nameIsUsed.ToString());
                    return false;
                }
                return true;
            }
            else if (type == GroupType.Chat)
            {
                if (newGroupModel.Invitations.Count() > 1)
                {
                    await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.tooFewInvitations.ToString());
                    return false;
                }
                else if (newGroupModel.Invitations.Count() < 1)
                {
                    await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.tooManyInvitations.ToString());
                    return false;
                }
                else
                {
                    if (newGroupModel.HaveImage)
                    {
                        return false; ///////////////////////////////////////////////////////////////////////////////////////////
                    }
                    else
                    {
                        var inviterInvited = newGroupModel.Invitations.Select(i => new { inviter = i.Inviter, invited = i.InvitedUser }).FirstOrDefault();
                        if (await _context.Users.Where(user => user.Id == inviterInvited.inviter.Id
                         && user.Id == inviterInvited.invited.Id)
                            .SelectMany(user => user.UserGroups)
                            .Select(userGroup => userGroup.Group)
                            .Where(g => g.Type == GroupType.Chat)
                            .SelectMany(g => g.UserGroups)
                            .AnyAsync(ug => ug.UserId == inviterInvited.inviter.Id && ug.UserId == inviterInvited.invited.Id))
                        {
                            await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.youAreInGroup.ToString());
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
            else if (type == GroupType.Private)
            {
                return true;
            }
            await Clients.User(Context.UserIdentifier).ReceiveGroupResultType(GroupResultType.noHaveThisType.ToString());
            return false;
        }
        private async Task SaveNewGroup(Group group, List<InvitationModel> invitations)
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
            var newInvitations = CreateInvitations(invitations, group.Id);
            await _context.Invitations.AddRangeAsync(newInvitations);
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
