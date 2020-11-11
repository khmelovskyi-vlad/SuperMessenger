﻿using SuperMessenger.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class Group
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid ImageId { get; set; }
        public GroupType Type { get; set; }


        public List<UserGroup> UserGroups { get; set; }
        public List<SentFile> SentFiles { get; set; }
        public List<Message> Messages { get; set; }
        public List<Invitation> Invitations { get; set; }
        public List<Application> Applications { get; set; }
    }
}