using SuperMessenger.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class SimpleGroupModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid ImageId { get; set; }
        public GroupType Type { get; set; }
        public bool IsCreator { get; set; }
    }
}
