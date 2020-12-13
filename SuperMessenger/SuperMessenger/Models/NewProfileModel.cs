using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewProfileModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool HaveImage { get; set; }
        public Guid ContentId { get; set; }
    }
}
