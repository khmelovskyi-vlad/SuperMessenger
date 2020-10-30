using SuperMessenger.Data;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class GroupModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid ImageId { get; set; }
        public GroupType Type { get; set; }

        public List<SimpleUserModel> Users { get; set; }
        public List<SentFile> SentFiles { get; set; }
        public List<Message> Messages { get; set; }
        public List<Invitation> InvitationToUsers { get; set; }
        public List<Application> ApplicationToGroups { get; set; }
    }
}
