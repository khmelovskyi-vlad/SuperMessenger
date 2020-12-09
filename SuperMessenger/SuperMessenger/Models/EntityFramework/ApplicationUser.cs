using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsInBan { get; set; }
        public Guid ImageId { get; set; }

        public List<UserIp> UserIps { get; set; }
        public List<UserGroup> UserGroups { get; set; }
        public List<UserCountry> UserCountries { get; set; }
        public List<SentFile> SentFiles { get; set; }
        public List<Message> Messages { get; set; }
        public List<Invitation> InvitationsFromMe { get; set; }
        public List<Invitation> InvitationsForMe { get; set; }
        public List<Application> Applications { get; set; }
        public List<Connection> Connections { get; set; }
    }
}
