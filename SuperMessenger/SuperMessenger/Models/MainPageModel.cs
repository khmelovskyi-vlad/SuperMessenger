using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class MainPageModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid ImageId { get; set; }
        public int InvitationCount { get; set; }
        public int ApplicationCount { get; set; }
        public List<Country> Countries { get; set; }
        public List<SimpleGroupModel> Groups { get; set; }
    }
}
