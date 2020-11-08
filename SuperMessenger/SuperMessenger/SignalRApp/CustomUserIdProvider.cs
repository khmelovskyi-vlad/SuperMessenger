using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            //var s2 = connection.User?.FindFirst("sub")?.Value;
            //var s = connection.User?.Claims.Where(claim => claim.Type == "sub");
            //return connection.User?.Identity.Name;
            return connection.User?.FindFirst("sub")?.Value;
        }
    }
}