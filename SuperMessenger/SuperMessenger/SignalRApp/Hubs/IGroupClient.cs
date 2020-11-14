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
        Task ReceiveGroup(GroupModel group);
    }
}
