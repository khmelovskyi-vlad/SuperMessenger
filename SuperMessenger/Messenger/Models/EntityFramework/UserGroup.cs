using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Models.EntityFramework
{
    public class UserGroup
    {
        public Guid UserId { get; set; }
        public AspNetUser User { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public bool IsLeaved { get; set; }
    }
}
