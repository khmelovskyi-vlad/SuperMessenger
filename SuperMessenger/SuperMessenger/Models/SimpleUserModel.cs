using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class SimpleUserModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string ImageName { get; set; }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                SimpleUserModel simpleUserModel = (SimpleUserModel)obj;
                return (Id == simpleUserModel.Id) && (Email == simpleUserModel.Email) && (ImageName == simpleUserModel.ImageName);
            }
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
