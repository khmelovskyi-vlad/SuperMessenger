using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    public interface IApplicationClient
    {
        Task ReceiveApplication(ApplicationModel application);
        //Task ReceiveApplicationSendingResult(string sendingResult);
        //Task ReceiveAcceptApplicationResult(string sendingResult);
        //Task ReceiveApplicationConfirmation(GroupModel group);
        Task ReceiveNewGroupUser(UserInGroupModel user, Guid groupId);
        Task ReceiveRejectApplicationResult(string rejectingResult);
        Task ReduceMyInvitations(List<InvitationModel> invitationModels);

        Task ReceiveApplicationResultType(string resultType);
        Task ReceiveSimpleGroup(SimpleGroupModel group);
        Task ReduceMyInvitationCount(int invitationsCount);
        Task ReduceMyApplicationCount(int applicationsCount);
        Task ReduceGroupApplication(Guid applicationId, Guid groupId);
        Task IncreaseMyApplicationsCount(int applicationsCount);
    }
}
