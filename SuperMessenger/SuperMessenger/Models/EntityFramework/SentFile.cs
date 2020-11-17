using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class SentFile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ContentId { get; set; }
        public DateTime SendDate { get; set; }
        //public string Type { get; set; }

        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
