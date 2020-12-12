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
        public string ImageName { get; set; }
        public string Type { get; set; }
        public bool IsCreator { get; set; }

        public List<UserInGroupModel> Users { get; set; }
        public List<MessageFileModel> SentFiles { get; set; }
        public List<MessageModel> Messages { get; set; }
        public List<InvitationModel> Invitations { get; set; }
        public List<ApplicationModel> Applications { get; set; }
    }
}
