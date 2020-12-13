using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models.EntityFramework
{
    public class MessageFile
    {
        public Guid Id { get; set; }
        public string PreviousName { get; set; }

        public FileInformation FileInformation { get; set; }
        public Guid FileInformationId { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
