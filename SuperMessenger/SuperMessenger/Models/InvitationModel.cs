using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class InvitationModel
    {
        public string Value { get; set; }
        public DateTime SendDate { get; set; }

        public Guid GroupId { get; set; }
        public SimpleUserModel InvitedUser { get; set; }
        public SimpleUserModel Inviter { get; set; }
    }
}
