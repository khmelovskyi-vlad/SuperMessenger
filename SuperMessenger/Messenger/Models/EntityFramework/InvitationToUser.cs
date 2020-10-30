using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Models.EntityFramework
{
    public class InvitationToUser
    {
        public string Value { get; set; }
        public DateTime SendDate { get; set; }

        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public Guid InvitedUserId { get; set; }
        public AspNetUser InvitedUser { get; set; }
        public Guid InviterId { get; set; }
        public AspNetUser Inviter { get; set; }
    }
}
