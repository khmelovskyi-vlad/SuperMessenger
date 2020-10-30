using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Data.Initializers
{
    public interface IInitializer
    {
        void Run(ModelBuilder modelBuilder);
    }
}
