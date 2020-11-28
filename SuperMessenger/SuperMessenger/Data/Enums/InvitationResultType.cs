using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Enums
{
    public enum InvitationResultType
    {
        userIsInGroup,
        wasInvitedEarlier,
        successSubmitted,
        haveNoPermissions,
        notHaveInvitation,
        invalidValue,
        successAccepting,
        successDeclining
    }
}
