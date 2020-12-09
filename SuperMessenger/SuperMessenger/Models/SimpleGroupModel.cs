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
        public Guid ImageId { get; set; }
        public string Type { get; set; }
        public MessageModel LastMessage { get; set; }
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                SimpleGroupModel simpleGroupModel = (SimpleGroupModel)obj;
                return (Id == simpleGroupModel.Id) && (Name == simpleGroupModel.Name) 
                    && (ImageId == simpleGroupModel.ImageId) && (Type == simpleGroupModel.Type);
            }
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
