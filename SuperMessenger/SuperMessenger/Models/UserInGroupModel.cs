using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class UserInGroupModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string ImageName { get; set; }
        public bool IsCreator { get; set; }
    }
}
