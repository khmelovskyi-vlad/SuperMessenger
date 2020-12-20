using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperMessenger.Data;
using SuperMessenger.Data.FileMaster;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SentFilesController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImageOptions _imageOptions;
        private readonly IFileMaster _fileMaster;

        public SentFilesController(SuperMessengerDbContext context,
            IOptions<ImageOptions> imageOptions,
            IFileMaster fileMaster)
        {
            _context = context;
            _imageOptions = imageOptions.Value;
            _fileMaster = fileMaster;
        }

        [HttpGet]
        public async Task<IActionResult> DownloadFile(Guid groupId, Guid fileId)
        {
            var data = await _context.Groups.Where(g => g.Id == groupId)
                .Include(g => g.UserGroups)
                .Include(g => g.MessageFiles)
                .ThenInclude(mf => mf.FileInformation)
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
                    var filePath = Path.Combine(_imageOptions.ImagePartPathes.Files, $"{data.file.FileInformation.Name}");
                    var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                    return File(stream, data.file.FileInformation.MimeType ?? "application/octet-stream", data.file.PreviousName);
                }
                return NoContent();
            }
            return BadRequest();
        }
        [HttpPost]
        public async Task<List<NewFileModel>> PostSentFile([FromForm] List<IFormFile> files)
        {
            try
            {
                if (files != null || files.Count != 0)
                {
                    List<NewFileModel> newFileModels = new List<NewFileModel>();
                    List<FileInformation> fileInformations = new List<FileInformation>();
                    foreach (var file in files)
                    {
                        var fileId = Guid.NewGuid();
                        var fileExtension = Path.GetExtension(file.FileName).ToLower();
                        if (fileExtension == null)
                        {
                            throw new Exception(StatusCodes.Status404NotFound.ToString());
                        }
                        else
                        {
                            newFileModels.Add(new NewFileModel() { ContentId = fileId, PreviousName = file.FileName });
                            var fileName = $"{fileId}{fileExtension}";
                            await _fileMaster.SaveFile(file, fileName, _imageOptions.ImagePartPathes.Files);
                            fileInformations.Add(CreateFileInformation(fileId, fileName, file));
                        }
                    }
                    await SaveFileInformations(fileInformations);
                    return newFileModels;
                }
                throw new Exception(StatusCodes.Status404NotFound.ToString());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private FileInformation CreateFileInformation(Guid fileId, string fileName, IFormFile file)
        {
            return new FileInformation()
            {
                Id = fileId,
                Name = fileName,
                MimeType = file.ContentType,
                Size = file.Length,
                SendDate = DateTime.Now,
            };
        }
        private async Task SaveFileInformations(List<FileInformation> fileInformations)
        {
            await _context.FileInformations.AddRangeAsync(fileInformations);
            await _context.SaveChangesAsync();
        }
    }
}
