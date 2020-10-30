using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessengerApi.Models.EntityFramework
{
    public class UserIp
    {
        public Guid UserId { get; set; }
        public AspNetUser User { get; set; }
        public Guid IpId { get; set; }
        public Ip Ip { get; set; }
    }
}
