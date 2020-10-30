using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data
{
    public class FileMaster
    {
        public async Task DownloadFile(IFormFile postedFile, string fileName)
        {
            var imgPath = @"C:\GIT\News\News\wwwroot\img";
            using (FileStream stream = new FileStream(Path.Combine(imgPath, fileName), FileMode.Create))
            {
                await postedFile.CopyToAsync(stream);
            }
        }
    }
}
