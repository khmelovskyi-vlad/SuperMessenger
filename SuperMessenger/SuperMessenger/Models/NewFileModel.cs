using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewFileModel
    {
        public Guid ContentId { get; set; }
        public string PreviousName { get; set; }
        public Guid PreviousId { get; set; }
    }
}
