using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessengerApi.Models.EntityFramework
{
    public class AspNetUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsInBan { get; set; }
        public Guid ImageId { get; set; }
    }
}

