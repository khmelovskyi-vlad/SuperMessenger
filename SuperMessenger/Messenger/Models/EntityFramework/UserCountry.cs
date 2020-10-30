using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Models.EntityFramework
{
    public class UserCountry
    {
        public Guid UserId { get; set; }
        public AspNetUser User { get; set; }
        public Guid CountryId { get; set; }
        public Country Country { get; set; }
    }
}
