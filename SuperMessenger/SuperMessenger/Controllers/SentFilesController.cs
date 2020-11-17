using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
                    Name = newFile.Name, 
                    SendDate = now, 
                    ContentId = contentId, 
                    GroupId = newFilesModel.GroupId,
                    UserId = Guid.Parse(User?.FindFirst("sub").Value),
                    //Type = newFile.ContentType
                });
                await WriteFile(newFile, FindType(newFile.ContentType));
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
