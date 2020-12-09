using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class ReduceInvtationModel
    {
        public Guid GroupId { get; set; }
        public Guid InvitedUserId { get; set; }
        public Guid InviterId { get; set; }
    }
}
