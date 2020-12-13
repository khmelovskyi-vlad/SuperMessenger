using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class ProfileModel
    {
        public Guid Id { get; set; }
        public string ImageName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
