using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Enums
{
    public enum GroupResultType
    {
        nameIsUsed,
        tooManyInvitations,
        tooFewInvitations,
        youAreInGroup,
        noHaveThisType,
        invalidName,
        successAdded,
        successLeft,
        noLeft
    }
}
