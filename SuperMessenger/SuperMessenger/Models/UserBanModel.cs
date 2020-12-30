using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class UserBanModel
    {
        public List<ApplicationUser> BannedUsers { get; set; }
        public List<ApplicationUser> NoBannedUsers { get; set; }
    }
}
