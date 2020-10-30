using MessengerApi.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessengerApi.Data.Initializers
{
    public class FirstInitializer : IInitializer
    {
        public void Run(ModelBuilder modelBuilder)
        {
            var random = new Random();
            var countries = GetCountries(random);

            modelBuilder.Entity<Country>().HasData(countries);
        }

        private List<Country> GetCountries(Random random)
        {
            List<Country> countries = new List<Country>();
            for (int i = 1; i <= 100; i++)
            {
                countries.Add(new Country() { Id = Guid.NewGuid(), Value = CreateRandomString(10, 30, "abcdefghijklmnopqrstuvwxyz", random) });
            }
            return countries;
        }
        private string CreateRandomString(int minLength, int maxLenght, string chars, Random random)
        {
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < random.Next(minLength, maxLenght); i++)
            {
                stringBuilder.Append(chars[random.Next(0, chars.Length)]);
            }
            return stringBuilder.ToString();
        }
    }
}
