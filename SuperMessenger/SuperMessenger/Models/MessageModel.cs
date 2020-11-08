using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class MessageModel
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
        public DateTime SendDate { get; set; }

        public Guid UserId { get; set; }
        public string UserEmail { get; set; }
        public Guid GroupId { get; set; }
    }
}
