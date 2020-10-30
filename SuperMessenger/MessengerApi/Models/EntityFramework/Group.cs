using MessengerApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessengerApi.Models.EntityFramework
{
    public class Group
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid ImageId { get; set; }
        public GroupType Type { get; set; }


        public Guid UserId { get; set; }
        public AspNetUser User { get; set; }
    }
}
