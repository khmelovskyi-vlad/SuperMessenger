using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class Connection
    {
        public string ConnectionId { get; set; }
        public bool IsConnected { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
