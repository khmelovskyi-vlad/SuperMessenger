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
        Task ReceiveRejectApplicationResult(string rejectingResult);

        Task ReceiveApplicationResultType(string resultType);
        Task ReduceMyApplicationsCount(int applicationsCount);
        Task ReduceGroupApplication(Guid applicationId, Guid groupId);
        Task IncreaseMyApplicationsCount(int applicationsCount);
    }
}
