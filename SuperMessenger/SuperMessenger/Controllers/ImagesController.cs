using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImagesController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImageOptions _imageOptions;
        public ImagesController(SuperMessengerDbContext context, IOptions<ImageOptions> imageOptions)
        {
            _context = context;
            _imageOptions = imageOptions.Value;
        }

        [HttpGet]
        public async Task<IActionResult> GetImage(ImageType type, string name)
        {
            var path = GetPath(type, name);
            if (path == null)
            {
                return NotFound();
            }
            var fileInformation = await GetFileInformation(type, name);
            if (fileInformation == null)
            {
                return NotFound();
            }
            var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(stream, fileInformation.MimeType);
        }
        private string GetPath(ImageType type, string imageName)
        {
            switch (type)
            {
                case ImageType.Avatars:
                    return Path.Combine(_imageOptions.ImagePartPathes.Avatars, imageName);
                case ImageType.GroupImages:
                    return Path.Combine(_imageOptions.ImagePartPathes.GroupImages, imageName);
                default:
                    return null;
            }
        }
        private async Task<FileInformation> GetFileInformation(ImageType type, string imageName)
        {
            if (imageName == $"{new Guid()}.jpg")
            {
                return await _context.FileInformations.Where(fi => fi.Name == imageName)
                    .SingleOrDefaultAsync();
            }
            switch (type)
            {
                case ImageType.Avatars:
                    return await _context.FileInformations.Where(fi => fi.Name == imageName)
                        .SingleOrDefaultAsync();
                case ImageType.GroupImages:
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
