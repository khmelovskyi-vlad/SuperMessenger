using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Win32;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.Services.FileMaster;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupsController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImageOptions _imageOptions;
        private readonly IFileMaster _fileMaster;
        public GroupsController(SuperMessengerDbContext context, 
            IOptions<ImageOptions> imageOptions,
            IFileMaster fileMaster)
        {
            _context = context;
            _imageOptions = imageOptions.Value;
            _fileMaster = fileMaster;
        }

        [HttpPost]
        public async Task<Guid> PostGroup([FromForm] IFormFile groupImg)
        {
            try
            {
                if (groupImg != null)
                {
                    var fileId = Guid.NewGuid();
                    var fileExtension = Path.GetExtension(groupImg.FileName).ToLower();
                    if (fileExtension != null)
                    {
                        var fileName = $"{fileId}{fileExtension}";
                        await _fileMaster.SaveFile(groupImg, fileName, _imageOptions.ImagePartPathes.GroupImages);
                        await SaveFileInformation(groupImg, fileId, fileName);
                        return fileId;
                    }
                }
                throw new Exception(StatusCodes.Status404NotFound.ToString());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private async Task SaveFileInformation(IFormFile groupImg, Guid fileId, string fileName)
        {
            await _context.FileInformations.AddAsync(new FileInformation()
            {
                Id = fileId,
                Name = fileName,
                MimeType = groupImg.ContentType,
                Size = groupImg.Length,
                SendDate = DateTime.Now,
            });
            await _context.SaveChangesAsync();
        }
    }
}
