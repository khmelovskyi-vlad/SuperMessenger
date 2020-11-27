using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class MessageConfirmationModel
    {
        public Guid Id { get; set; }
        public Guid PreviousId { get; set; }
        public DateTime SendDate { get; set; }
        public Guid GroupId { get; set; }
    }
}
