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
        Task ReceiveGroupData(GroupModel group);
        Task ReceiveCheckGroupNamePartResult(bool canUseGroupName);
        Task ReceiveSimpleGroup(SimpleGroupModel group);
        Task ReceiveNoMySearchedGroups(List<SimpleGroupModel> groups);

        Task ReceiveNewOwnerUserId(Guid userId, Guid groupId);
        Task ReceiveLeftGroupUserId(Guid userId, Guid groupId);
        Task ReceiveRomevedGroup(Guid groupId, string groupName);
        Task ReceiveNewGroupUser(UserInGroupModel user, Guid groupId);
    }
}
