using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Models.EntityFramework
{
    public class AspNetUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsInBan { get; set; }
        public Guid ImageId { get; set; }

        public List<Group> Groups { get; set; }
        public List<UserIp> UserIps { get; set; }
        public List<UserGroup> UserGroups { get; set; }
        public List<UserCountry> UserCountries { get; set; }
        public List<SentFile> SentFiles { get; set; }
        public List<Message> Messages { get; set; }
        public List<InvitationToUser> IInvited{ get; set; }
        public List<InvitationToUser> InvitationToUsers { get; set; }
        public List<ApplicationToGroup> ApplicationToGroups { get; set; }
    }
}
