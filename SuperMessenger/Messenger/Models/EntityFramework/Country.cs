using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Models.EntityFramework
{
    public class Country
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
        public List<UserCountry> UserCountries { get; set; }
    }
}
