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
                if ((ImageName != null && simpleUserModel.ImageName == null) || (ImageName == null && simpleUserModel.ImageName != null))
                {
                    return false;
                }
                else if ((ImageName == null && simpleUserModel.ImageName == null) || ImageName == simpleUserModel.ImageName)
                {
                    return (Id == simpleUserModel.Id) && (Email == simpleUserModel.Email);
                }
                return false;
            }
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
