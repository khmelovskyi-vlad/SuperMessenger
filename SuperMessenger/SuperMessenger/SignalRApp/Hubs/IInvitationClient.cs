using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    public interface IInvitationClient
    {
        Task ReceiveInvitation(InvitationModel invitation);
        //Task AddNewUserToGroup(SimpleUserModel invitation);
        //Task ReceiveAcceptInvitation(SimpleGroupModel invitation);
        //Task ReceiveInvitationSendingResult(string sendingResult);
        Task ReceiveMyInvitations(List<InvitationModel> invitations);
        //Task ReceiveAcceptInvitationResult(string acceptingResult, SimpleGroupModel group);
        Task ReceiveDeclineInvitationResult(string acceptingResult);

        Task ReceiveInvitationResultType(string resultType);
        Task ReceiveSimpleGroup(SimpleGroupModel group);
        Task ReceiveNewGroupUser(UserInGroupModel user, Guid groupId);
    }
}
