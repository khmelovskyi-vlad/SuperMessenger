using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Enums
{
    public enum ApplicationResultType
    {
        wasSentEarlier,
        youAreInGroup,
        successSubmitted,
        youAreNotCreator,
        notHaveApplication,
        //userIsInGroup,
        successAccepting,
        invalidGroupType,
        invalidValue,
        successRejecting
    }
}
