using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class FileInformation
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime SendDate { get; set; }
        public string MimeType { get; set; }
        public long Size { get; set; }


        public Group Group { get; set; }
        public Guid? GroupId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid? UserId { get; set; }
        public MessageFile MessageFile { get; set; }
        public Guid? MessageFileId { get; set; }
    }
}
