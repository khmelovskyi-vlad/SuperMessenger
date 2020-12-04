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
        Task ReceiveMyInvitations(IEnumerable<InvitationModel> invitations);
        Task ReceiveDeclineInvitationResult(string decliningResult);
        Task ReduceMyInvitations(IEnumerable<InvitationModel> invitationModels);

        Task ReceiveInvitationResultType(string resultType);
    }
}
