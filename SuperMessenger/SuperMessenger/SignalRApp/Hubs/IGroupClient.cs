using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    public interface IGroupClient
    {
        Task ReceiveMySearchedGroups(List<Group> groups);
        Task ReceiveSearchedGroups(List<SimpleGroupModel> groups);
        Task ReceiveNoMySearchedGroups(List<SimpleGroupModel> groups);
        Task ReceiveGroupData(GroupModel group);
        Task ReceiveCheckGroupNamePartResult(bool canUseGroupName);
        Task ReceiveGroupResultType(string result);
        Task ReceiveInvitation(InvitationModel invitation);
        Task ReceiveSimpleGroup(SimpleGroupModel group);
        Task ReceiveLeftGroupUserId(Guid userId, Guid groupId);
        Task SendGroupImage(Guid newImageId, Guid previousImageId);
        Task ReceiveNewGroupUser(UserInGroupModel user, Guid groupId);
    }
}
