using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Services.FileMaster
{
    public class FileMaster : IFileMaster
    {
        public async Task SaveFile(IFormFile postedFile, string fileName, string path)
        {
            using (FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                stream.SetLength(postedFile.Length);
                await postedFile.CopyToAsync(stream);
            }
        }
    }
}
