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
        Task ReceiveMessage(MessageModel message);
        Task ReceiveNewProfile(ProfileModel profile);
        Task ReceiveNewUserData(SimpleUserModel simpleUser);
        Task ReceiveUserResultType(string resultType);
        Task ReceiveMessageConfirmation(MessageConfirmationModel messageConfirmation);
        Task ReceiveFileConfirmations(List<FileConfirmationModel> fileConfirmations);
        Task ReceiveFiles(List<SentFileModel> files);
        //Task ReceiveFileIds(List<Guid> fileIds);
    }
}
