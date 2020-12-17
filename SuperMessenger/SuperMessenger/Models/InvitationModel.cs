using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class InvitationModel
    {
        public string Value { get; set; }
        public DateTime SendDate { get; set; }

        public SimpleGroupModel Group { get; set; }
        public SimpleUserModel InvitedUser { get; set; }
        public SimpleUserModel Inviter { get; set; }
        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                InvitationModel invitationModel = (InvitationModel)obj;
                return (Value == invitationModel.Value) && (Group.Equals(invitationModel.Group))
                    && (Inviter.Equals(invitationModel.Inviter)) && (InvitedUser.Equals(invitationModel.InvitedUser));
            }
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
