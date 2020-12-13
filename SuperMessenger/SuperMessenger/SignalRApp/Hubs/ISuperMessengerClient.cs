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
        Task ReceiveFirstData(MainPageModel mainPageModel);
        Task ReceiveFoundUsers(List<SimpleUserModel> users);
        Task ReceiveMessage(MessageModel message);
        Task ReceiveNewProfile(ProfileModel profile);
        Task ReceiveNewUserData(SimpleUserModel simpleUser);
        Task ReceiveUserResultType(string resultType);
        Task ReceiveMessageConfirmation(MessageConfirmationModel messageConfirmation);
        Task ReceiveFileConfirmations(List<FileConfirmationModel> fileConfirmations);
        Task ReceiveFiles(IEnumerable<MessageModel> files);

        Task ReceiveLeftGroupUserId(Guid userId, Guid groupId);
        Task ReceiveRomevedGroup(Guid groupId, string removalResult);
        Task ReceiveNewGroupUser(UserInGroupModel user, Guid groupId);
    }
}
