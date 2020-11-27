using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class FileFormModel
    {
        public IFormFile File { get; set; }
        public Guid PreviousId { get; set; }
    }
}
