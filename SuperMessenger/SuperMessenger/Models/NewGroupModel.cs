using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewGroupModel
    {
        public IFormFile GroupImg { get; set; }
        public string GroupType { get; set; }
        public string GroupName { get; set; }
    }
}
