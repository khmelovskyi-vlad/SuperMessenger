using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class NewFilesModel
    {
        public List<NewFileModel> NewFileModels { get; set; }
        public Guid GroupId { get; set; }
    }
}
