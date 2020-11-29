using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewGroupModel
    {
        //public IFormFile GroupImg { get; set; }
        //public string GroupType { get; set; }
        //public string GroupName { get; set; }
        //public string InvitationsJson { get; set; }
        //public List<string> Invitations { get; set; }
        //public string Invitations2 { get; set; }
        //public List<InvitationModel> Invitations3 { get; set; }

        public string Name { get; set; }
        public string Type { get; set; }
        public bool HaveImage { get; set; }
        public List<InvitationModel> Invitations { get; set; }
        public Guid PreviousImageId { get; set; }
    }
}
