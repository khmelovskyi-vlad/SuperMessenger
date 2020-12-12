using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperMessenger.Data;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImagePathesOptions imagePathes;
        public ImagesController(SuperMessengerDbContext context,
            IOptions<ImagePathesOptions> imagePathesOptions)
        {
            _context = context;
            imagePathes = imagePathesOptions.Value;
        }
        [HttpGet]
        public async Task<IActionResult> GetImage(string type, string imageName)
        {
            var path = GetPath(type, imageName);
            if (path == null)
            {
                return NotFound();
            }
            var fileInformation = await GetFileInformation(type, imageName);
            if (fileInformation == null)
            {
                return NotFound();
            }
            var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(stream, fileInformation.MimeType);
        }
        private string GetPath(string type, string imageName)
        {
            switch (type)
            {
                case "Avatars":
                    return Path.Combine(imagePathes.Avatars, imageName);
                case "GroupImages":
                    return Path.Combine(imagePathes.GroupImages, imageName);
                default:
                    return null;
            }
        }
        private async Task<FileInformation> GetFileInformation(string type, string imageName)
        {
            if (imageName == $"{new Guid()}.jpg")
            {
                return await _context.FileInformations.Where(fi => fi.Name == imageName)
                    .SingleOrDefaultAsync();
            }
            switch (type)
            {
                case "Avatars":
                    return await _context.FileInformations.Where(fi => fi.Name == imageName)
                        .SingleOrDefaultAsync();
                case "GroupImages":
                    return await _context.FileInformations.Where(fi => fi.Name == imageName
                    && (fi.Group.Type == GroupType.Public 
                    || (fi.Group.Type == GroupType.Private 
                    && (fi.Group.UserGroups.Any(ug => ug.UserId == Guid.Parse(User.FindFirst("sub").Value)
                    && fi.Group.Invitations.Any(i => i.InvitedUserId == Guid.Parse(User.FindFirst("sub").Value)))))))
                        .SingleOrDefaultAsync();
                default:
                    return null;
            }
        }
    }
}
