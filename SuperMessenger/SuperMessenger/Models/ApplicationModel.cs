using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class ApplicationModel
    {
        public string Value { get; set; }
        public DateTime SendDate { get; set; }

        public Guid GroupId { get; set; }
        public SimpleUserModel User { get; set; }
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                ApplicationModel applicationModel = (ApplicationModel)obj;
                return (Value == applicationModel.Value) 
                    && (GroupId == applicationModel.GroupId) && (User.Equals(applicationModel.User));
            }
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
