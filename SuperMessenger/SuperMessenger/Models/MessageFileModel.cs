using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class MessageFileModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ContentName { get; set; }
        public DateTime SendDate { get; set; }

        public Guid GroupId { get; set; }
        public SimpleUserModel User { get; set; }
    }
}
