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
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperMessenger.Data;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SentFilesController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImagePathesOptions imagePathes;
        private readonly IHubContext<SuperMessengerHub, ISuperMessengerClient> _hubContext;

        public SentFilesController(SuperMessengerDbContext context,
            IOptions<ImagePathesOptions> imagePathesOptions,
            IHubContext<SuperMessengerHub, ISuperMessengerClient> hubContext)
        {
            _context = context;
            imagePathes = imagePathesOptions.Value;
            _hubContext = hubContext;
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
        public IActionResult Some()
        {
            var stream = new FileStream(@"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\imgs\00000000-0000-0000-0000-000000000000.jpg", 
                FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(stream, "image/jpeg");
        }

        [HttpGet]
        public async Task<IActionResult> DownloadFile(Guid groupId, Guid fileId)
        {
            //var path = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\files";
            var data = await _context.Groups.Where(g => g.Id == groupId)
                .Include(g => g.UserGroups)
                .Include(g => g.MessageFiles)
                .Select(g => new 
                { 
                    haveUser = g.UserGroups.Any(ug => ug.UserId == Guid.Parse(User.FindFirst("sub").Value) && !ug.IsLeaved),
                    file = g.MessageFiles.FirstOrDefault(sf => sf.Id == fileId),
                })
                .FirstOrDefaultAsync();
            if (data.haveUser)
            {
                if (data.file != null)
                {
                    var filePath = Path.Combine(imagePathes.Files, $"{data.file.FileInformation.Name}");
                    var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                    return File(stream, data.file.FileInformation.MimeType ?? "application/octet-stream", data.file.PreviousName);
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
        public async Task PostSentFile([FromForm] List<IFormFile> files)
        {
            var fileNames = files.Select(file => Guid.Parse(Path.GetFileNameWithoutExtension(file.FileName)));
            if (files == null || files.Count == 0)
            {
                throw new HubException("500");
            }
            var dbFiles = await _context.MessageFiles
                .Where(sentFile => fileNames.Any(fileName => fileName == sentFile.FileInformationId) 
                && sentFile.UserId == Guid.Parse(User.FindFirst("sub").Value))
                .ToListAsync();
            if (dbFiles == null || dbFiles.Count() != files.Count())
            {
                throw new HubException("500");
            }
            foreach (var file in files)
            {
                await WriteFile(file, file.FileName);
            }
            //await _hubContext.Clients.User(User.FindFirst("sub").Value).ReceiveFileIds(fileIds);
        }

        private async Task SendFiles(List<MessageFileModel> filesToSend, IEnumerable<Guid> userIds)
        {
            foreach (var userId in userIds)
            {
                await _hubContext.Clients.User(userId.ToString()).ReceiveFiles(filesToSend);
            }
        }

        private async Task SendFileConfirmations(List<FileConfirmationModel> fileConfirmations)
        {
            await _hubContext.Clients.User(User.FindFirst("sub").Value).ReceiveFileConfirmations(fileConfirmations);
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
            //var imgPath = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\files";
            using (FileStream stream = new FileStream(Path.Combine(imagePathes.Files, fileName), FileMode.Create))
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
