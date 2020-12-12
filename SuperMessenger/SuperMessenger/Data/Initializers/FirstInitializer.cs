using Microsoft.EntityFrameworkCore;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Initializers
{
    public class FirstInitializer : IInitializer
    {
        public void Run(ModelBuilder modelBuilder)
        {
            var random = new Random();
            var countries = GetCountries(random);
            var fileInformations = GetFileInformations();

            modelBuilder.Entity<Country>().HasData(countries);
            modelBuilder.Entity<FileInformation>().HasData(fileInformations);
        }

        private List<FileInformation> GetFileInformations()
        {
            var fileInformationId = new Guid();
            return new List<FileInformation>() 
            {
                new FileInformation(){ MimeType="image/jpeg", Size=0, SendDate = DateTime.Now, Name=$"{fileInformationId}.jpg" }
            };
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
