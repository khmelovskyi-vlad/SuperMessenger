using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class IpBanModel
    {
        public List<Ip> BannedIps { get; set; }
        public List<Ip> NoBannedIps { get; set; }
    }
}
