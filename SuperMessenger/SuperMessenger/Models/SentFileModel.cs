using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class SentFileModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ContentId { get; set; }
        public DateTime SendDate { get; set; }

        public Guid GroupId { get; set; }
        public SimpleUserModel User { get; set; }
    }
}
