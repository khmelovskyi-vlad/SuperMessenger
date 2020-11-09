using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class ApplicationModel
    {
        public string Value { get; set; }
        public DateTime SendDate { get; set; }

        public Guid GroupId { get; set; }
        public SimpleUserModel User { get; set; }
    }
}
