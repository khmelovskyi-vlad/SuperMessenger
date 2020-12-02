﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewFilesModel
    {
        public List<IFormFile> Files { get; set; }
        public List<Guid> PreviousIds { get; set; }
        public Guid GroupId { get; set; }

        //public Guid PreviousContentId { get; set; }
        //public string Type { get; set; }
        ////public Guid GroupId { get; set; }
        //public string Name { get; set; }
    }
}
