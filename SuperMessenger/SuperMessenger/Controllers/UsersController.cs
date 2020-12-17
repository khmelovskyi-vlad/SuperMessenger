using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
using SuperMessenger.Data.FileMaster;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImagePathesOptions imagePathes;
        private readonly IFileMaster _fileMaster;
        public UsersController(SuperMessengerDbContext context,
            IOptions<ImagePathesOptions> imagePathesOptions,
            IFileMaster fileMaster)
        {
            _context = context;
            imagePathes = imagePathesOptions.Value;
            _fileMaster = fileMaster;
        }

        [HttpPut]
        public async Task<Guid> PutUser([FromForm] IFormFile avatar)
        {
            try
            {
                if (avatar != null)
                {
                    if (avatar.ContentType.Length < 5 && avatar.ContentType.Substring(0, 5) != "image")
                    {
                        throw new Exception(StatusCodes.Status403Forbidden.ToString());
                    }
                    var fileId = Guid.NewGuid();
                    var fileExtension = Path.GetExtension(avatar.FileName).ToLower();
                    if (fileExtension != null)
                    {
                        var fileName = $"{fileId}{fileExtension}";
                        await _fileMaster.SaveFile(avatar, fileName, imagePathes.Avatars);
                        await SaveFileInformation(avatar, fileId, fileName);
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
        private async Task SaveFileInformation(IFormFile avatar, Guid fileId, string fileName)
        {
            await _context.FileInformations.AddAsync(new FileInformation()
            {
                Id = fileId,
                Name = fileName,
                MimeType = avatar.ContentType,
                Size = avatar.Length,
                SendDate = DateTime.Now,
            });
            await _context.SaveChangesAsync();
        }
    }
}
