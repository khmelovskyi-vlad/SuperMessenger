using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    public interface ISuperMessengerClient
    {
        Task SendMessage(Message message);
        //Task ReceiveFirstData(ApplicationUser myProfile,
        //    List<Group> groups,
        //    List<Invitation> invitations,
        //    List<Application> applications);
        Task ReceiveFirstData(MainPageModel mainPageModel);
        Task ReceiveFoundUsers(List<SimpleUserModel> users);
    }
}
