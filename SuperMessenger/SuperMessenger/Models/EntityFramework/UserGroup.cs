using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class UserGroup
    {
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public bool IsLeaved { get; set; }
        public bool IsCreator { get; set; }
        public DateTime AddDate { get; set; }
    }
}
