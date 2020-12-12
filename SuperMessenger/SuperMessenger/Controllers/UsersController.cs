using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly ImagePathesOptions imagePathes;
        private readonly IHubContext<SuperMessengerHub, ISuperMessengerClient> _hubContext;
        public UsersController(SuperMessengerDbContext context, 
            IOptions<ImagePathesOptions> imagePathesOptions, 
            IHubContext<SuperMessengerHub, ISuperMessengerClient> hubContext)
        {
            _context = context;
            imagePathes = imagePathesOptions.Value;
            _hubContext = hubContext;
        }

        // GET: api/ApplicationUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        //// GET: api/ApplicationUsers/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ApplicationUser>> GetApplicationUser(Guid id)
        //{
        //    var applicationUser = await _context.Users.FindAsync(id);

        //    if (applicationUser == null)
        //    {
        //        return NotFound();
        //    }

        //    return applicationUser;
        //}

        //// PUT: api/ApplicationUsers/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutApplicationUser(Guid id, ApplicationUser applicationUser)
        //{
        //    if (id != applicationUser.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(applicationUser).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ApplicationUserExists(id))
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
        [HttpPut]
        public async Task PutUser([FromForm] NewProfileModel newProfile)
        //public async Task<IActionResult> PostApplicationUser([FromForm] object some)
        {
            //NewProfileModel newProfile = new NewProfileModel();
            var me = await _context.Users.Where(user => user.Id == Guid.Parse(User.FindFirst("sub").Value)).FirstOrDefaultAsync();
            ChangeMyNames(me, newProfile.FirstName, newProfile.LastName);
            if (newProfile.Avatar != null)
            {
                var imgId = Guid.NewGuid();
                var imgType = FindType(newProfile.Avatar.ContentType);
                if (imgType != null)
                {
                    await AddAvatar(newProfile.Avatar, $"{imgId}.{imgType}");
                    //me.ImageId = imgId;
                    ///////////////////////////////////////////////////////////////////////////////////////////////////// change
                }
            }
            await _context.SaveChangesAsync();
            await SendChanges(me);
            //return NoContent();

            //return CreatedAtAction("GetUsers", new { id = me.Id }, me);
        }
        private async Task SendChanges(ApplicationUser me)
        {
            var newProfile = new ProfileModel() { Id = me.Id, FirstName = me.FirstName, LastName = me.LastName, ImageId = me.AvatarInformations.FirstOrDefault().Id};
            ///////////////////////////////////////////////////////////////////////////////////////////////////// change
            await _hubContext.Clients.User(User.FindFirst("sub").Value).ReceiveNewProfile(newProfile);
            var userIds = _context.Users.Where(user => user.Id == me.Id)
                .SelectMany(user => user.UserGroups)
                .Select(ug => ug.Group)
                .SelectMany(g => g.UserGroups)
                .Select(ug => ug.UserId)
                .Distinct()
                .Where(id => id != me.Id);
            await _hubContext.Clients.User(User.FindFirst("sub").Value).ReceiveUserResultType(UserResultType.successProfileChange.ToString());
            var newUserInGroup = new SimpleUserModel(){ Id = me.Id, Email = me.Email, ImageName = me.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name };
            ///////////////////////////////////////////////////////////////////////////////////////////////////// change
            foreach (var userId in userIds)
            {
                await _hubContext.Clients.User(userId.ToString()).ReceiveNewUserData(newUserInGroup);
            }
        }
        private void ChangeMyNames(ApplicationUser me, string FirstName, string LastName)
        {
            if (FirstName != null && FirstName != "")
            {
                me.FirstName = FirstName;
            }
            if (LastName != null && LastName != "")
            {
                me.LastName = LastName;
            }
        }
        private string FindType(string contentType)
        {
            switch (contentType)
            {
                case "image/jpeg":
                    return "jpg";
                default:
                    return null;
            }
        }
        private async Task AddAvatar(IFormFile postedFile, string fileName)
        {
            //var imgPath = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\avatars";
            using (FileStream stream = new FileStream(Path.Combine(imagePathes.Avatars, fileName), FileMode.Create))
            {
                await postedFile.CopyToAsync(stream);
            }
        }
        //// POST: api/ApplicationUsers
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<ApplicationUser>> PostApplicationUser(ApplicationUser applicationUser)
        //{
        //    _context.Users.Add(applicationUser);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        //}

        //// DELETE: api/ApplicationUsers/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<ApplicationUser>> DeleteApplicationUser(Guid id)
        //{
        //    var applicationUser = await _context.Users.FindAsync(id);
        //    if (applicationUser == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Users.Remove(applicationUser);
        //    await _context.SaveChangesAsync();

        //    return applicationUser;
        //}

        //private bool ApplicationUserExists(Guid id)
        //{
        //    return _context.Users.Any(e => e.Id == id);
        //}
    }
}
