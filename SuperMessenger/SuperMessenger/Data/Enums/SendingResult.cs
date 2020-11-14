using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Enums
{
    public enum SendingResult
    {
        successSendingApplication,
        isInGroup,
        applicationWasSendingErlea,
        isNotCreator,
        notHaveApplication,
        successAcceptingApplication
    }
}
