using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewGroupModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public Guid ContentId { get; set; }
        public bool HaveImage { get; set; }
        public List<InvitationModel> Invitations { get; set; }
    }
}
