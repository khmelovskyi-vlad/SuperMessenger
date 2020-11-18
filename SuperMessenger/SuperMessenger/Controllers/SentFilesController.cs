using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SentFilesController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;

        public SentFilesController(SuperMessengerDbContext context)
        {
            _context = context;
        }

        //// GET: api/SentFiles
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<SentFile>>> GetSentFiles()
        //{
        //    return await _context.SentFiles.ToListAsync();
        //}

        //// GET: api/SentFiles/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<SentFile>> GetSentFile(Guid id)
        //{
        //    var sentFile = await _context.SentFiles.FindAsync(id);

        //    if (sentFile == null)
        //    {
        //        return NotFound();
        //    }

        //    return sentFile;
        //}

        //// PUT: api/SentFiles/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutSentFile(Guid id, SentFile sentFile)
        //{
        //    if (id != sentFile.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(sentFile).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!SentFileExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/SentFiles
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<SentFile>> PostSentFile(SentFile sentFile)
        //{
        //    _context.SentFiles.Add(sentFile);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetSentFile", new { id = sentFile.Id }, sentFile);
        //}

        [HttpGet]
        public async Task<IActionResult> DownloadFile(Guid groupId, Guid fileId)
        {
            var path = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\files";
            if (await _context.Groups.Where(g => g.Id == groupId)
                .SelectMany(g => g.UserGroups)
                .AnyAsync(ug => ug.UserId == Guid.Parse(User.FindFirst("sub").Value) && !ug.IsLeaved))
            {
                var file = await _context.SentFiles.FindAsync(fileId);
                var type = file.Name.Split('.').Last();
                if (file != null)
                {
                    var filePath = Path.Combine(path, $"{file.ContentId}.{type}");
                    var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                    return File(stream, "application/octet-stream", file.Name);
                }
                return NoContent();
            }
            return BadRequest();
            //var arrayBytes = await System.IO.File.ReadAllBytesAsync(
            //    @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\avatars\0d1bd702-8250-4cfb-bd61-59e3a41dd2b8.jpg");

            //var result = new HttpResponseMessage(HttpStatusCode.OK);

            //result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            //result.Content.Headers.ContentDisposition.FileName = "065077580_2020-11-01_13_56_10_351.pdf";
            //result.Content.Headers.ContentType =
            //    new MediaTypeHeaderValue("application/pdf");

            //return File(new FileStream(), "application/octet-stream", "0d1bd702-8250-4cfb-bd61-59e3a41dd2b8.jpg");
        }
        //public byte[] DownloadFile()
        //{
        //    List<byte> allBite = new List<byte>();
        //    int buffer = 64;
        //    byte[] bytesFile = new byte[buffer];
        //    var readedRealBytes = 0;
        //    byte[] arrayBytes;
        //    using (FileStream stream1 =
        //        new FileStream(@"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\avatars\0d1bd702-8250-4cfb-bd61-59e3a41dd2b8.jpg",
        //        FileMode.Open))
        //    {
        //        while (true)
        //        {
        //            readedRealBytes += stream1.Read(bytesFile, 0, buffer);
        //            allBite.AddRange(bytesFile);
        //            if (readedRealBytes < buffer)
        //            {
        //                arrayBytes = allBite.ToArray();
        //                break;
        //            }
        //            else
        //            {
        //                buffer *= 2;
        //                bytesFile = new byte[buffer];
        //            }
        //        }
        //    }
        //    //var stream = new MemoryStream();
        //    // processing the stream.

        //    var result = new HttpResponseMessage(HttpStatusCode.OK)
        //    {
        //        Content = new ByteArrayContent(arrayBytes)
        //    };
        //    result.Content.Headers.ContentDisposition =
        //        new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
        //        {
        //            FileName = "CertificationCard.pdf"
        //        };
        //    result.Content.Headers.ContentType =
        //        new MediaTypeHeaderValue("application/octet-stream");
        //    return arrayBytes;
        //}
        //public IActionResult DownloadFile()
        //{
        //    //List<byte> allBite = new List<byte>();
        //    //int buffer = 64;
        //    //byte[] bytesFile = new byte[buffer];
        //    //var readedRealBytes = 0;
        //    //byte[] arrayBytes;
        //    //using (FileStream stream1 =
        //    //    new FileStream(@"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\avatars\0d1bd702-8250-4cfb-bd61-59e3a41dd2b8.jpg",
        //    //    FileMode.Open))
        //    //{
        //    //    while (true)
        //    //    {
        //    //        readedRealBytes += stream1.Read(bytesFile, 0, buffer);
        //    //        allBite.AddRange(bytesFile);
        //    //        if (readedRealBytes < buffer)
        //    //        {
        //    //            arrayBytes = allBite.ToArray();
        //    //            break;
        //    //        }
        //    //        else
        //    //        {
        //    //            buffer *= 2;
        //    //            bytesFile = new byte[buffer];
        //    //        }
        //    //    }
        //    //}
        //    var arrayBytes = System.IO.File.ReadAllBytes(
        //        @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\avatars\0d1bd702-8250-4cfb-bd61-59e3a41dd2b8.jpg");
        //    var arrayBytes2 = System.IO.File.ReadAllBytes(
        //        @"D:\065077580_2020-11-01_13_56_10_351.pdf");
        //    //var stream = new MemoryStream();
        //    // processing the stream.

        //    //IHttpActionResult response;
        //    var result = new HttpResponseMessage(HttpStatusCode.OK);
        //    //Content = new ByteArrayContent(arrayBytes)
        //    result.Content = new ByteArrayContent(arrayBytes2);
        //    //result.Content.Headers.ContentLength = arrayBytes.LongLength;
        //    result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
        //    result.Content.Headers.ContentDisposition.FileName = "065077580_2020-11-01_13_56_10_351.pdf";
        //    result.Content.Headers.ContentType =
        //        //new MediaTypeHeaderValue("image/JPEG");
        //        //new MediaTypeHeaderValue("application/octet-stream");
        //        new MediaTypeHeaderValue("application/pdf");
        //    //response = ResponseMessage(responseMsg);
        //    return File(arrayBytes, "application/octet-stream", "0d1bd702-8250-4cfb-bd61-59e3a41dd2b8.jpg");
        //    //return result;
        //}
        [HttpPost]
        public async Task PostSentFile([FromForm] NewFilesModel newFilesModel)
        {
            if (newFilesModel.Files != null && newFilesModel.Files.Count != 0)
            {
                var sentFiles = await CreateFiles(newFilesModel);
                await _context.SentFiles.AddRangeAsync(sentFiles);
                await _context.SaveChangesAsync();

            }
            else
            {

            }
            var result = newFilesModel;
            await Task.Run(() => Console.WriteLine(""));
            //_context.SentFiles.Add(sentFile);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetSentFile", new { id = sentFile.Id }, sentFile);
        }
        public async Task<List<SentFile>> CreateFiles(NewFilesModel newFilesModel)
        {
            List<SentFile> sentFiles = new List<SentFile>();
            var now = DateTime.Now;
            foreach (var newFile in newFilesModel.Files)
            {
                var fileId = Guid.NewGuid();
                var contentId = Guid.NewGuid();
                sentFiles.Add(new SentFile() 
                { 
                    Id = fileId, 
                    Name = newFile.FileName, 
                    SendDate = now, 
                    ContentId = contentId, 
                    GroupId = newFilesModel.GroupId,
                    UserId = Guid.Parse(User?.FindFirst("sub").Value),
                    //Type = newFile.ContentType
                });
                var type = newFile.FileName.Split('.').Last();
                await WriteFile(newFile, $"{contentId}.{type}");
                //await WriteFile(newFile, FindType(newFile.ContentType));
            }
            return sentFiles;
        }
        private string FindType(string contentType)
        {
            switch (contentType)
            {
                case "image/jpeg":
                    return "jpg";
                default:
                    return "jpg";
                    //return null;
            }
        }
        private async Task WriteFile(IFormFile file, string fileName)
        {
            var imgPath = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\files";
            using (FileStream stream = new FileStream(Path.Combine(imgPath, fileName), FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }

        //// DELETE: api/SentFiles/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<SentFile>> DeleteSentFile(Guid id)
        //{
        //    var sentFile = await _context.SentFiles.FindAsync(id);
        //    if (sentFile == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.SentFiles.Remove(sentFile);
        //    await _context.SaveChangesAsync();

        //    return sentFile;
        //}

        //private bool SentFileExists(Guid id)
        //{
        //    return _context.SentFiles.Any(e => e.Id == id);
        //}
    }
}
