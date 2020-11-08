using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewProfileModel
    {
        public IFormFile Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
