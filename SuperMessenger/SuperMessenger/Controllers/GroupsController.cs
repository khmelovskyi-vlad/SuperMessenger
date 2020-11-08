using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly IHubContext<GroupHub, IGroupClient> _hubContext;

        public GroupsController(SuperMessengerDbContext context, IHubContext<GroupHub, IGroupClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            return await _context.Groups.ToListAsync();
        }

        //// GET: api/Groups/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Group>> GetGroup(Guid id)
        //{
        //    var @group = await _context.Groups.FindAsync(id);

        //    if (@group == null)
        //    {
        //        return NotFound();
        //    }

        //    return @group;
        //}

        //// PUT: api/Groups/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutGroup(Guid id, Group @group)
        //{
        //    if (id != @group.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(@group).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!GroupExists(id))
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

        // POST: api/Groups
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<Group>> PostGroup(Group @group)
        //{
        //    _context.Groups.Add(@group);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetGroup", new { id = @group.Id }, @group);
        //}
        [HttpPost]
        public async Task<ActionResult<Group>> PostGroup([FromForm] NewGroupModel newGroup)
        {
            var type = (GroupType)Enum.Parse(typeof(GroupType), newGroup.GroupType, true);
            var groupId = Guid.NewGuid();
            var group = new Group() { Id = groupId, Name = newGroup.GroupName, Type = type, CreationDate = DateTime.Now };
            if (newGroup.GroupImg != null && type != GroupType.Chat)
            {
                var imgId = Guid.NewGuid();
                var imgType = FindType(newGroup.GroupImg.ContentType);
                if (imgType != null)
                {
                    await AddGroupImage(newGroup.GroupImg, $"{imgId}.{imgType}");
                    group.ImageId = imgId;
                }
            }
            await _context.Groups.AddAsync(group);
            await _context.UserGroups.AddAsync(new UserGroup() { 
                UserId = Guid.Parse(User?.FindFirst("sub")?.Value), 
                GroupId = groupId, 
                IsCreator = true, 
                IsLeaved = false});
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetGroup", new { id = groupId }, @group);
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
        private async Task AddGroupImage(IFormFile postedFile, string fileName)
        {
            var imgPath = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\groupImgs";
            using (FileStream stream = new FileStream(Path.Combine(imgPath, fileName), FileMode.Create))
            {
                await postedFile.CopyToAsync(stream);
            }
        }
        //// DELETE: api/Groups/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Group>> DeleteGroup(Guid id)
        //{
        //    var @group = await _context.Groups.FindAsync(id);
        //    if (@group == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Groups.Remove(@group);
        //    await _context.SaveChangesAsync();

        //    return @group;
        //}

        //private bool GroupExists(Guid id)
        //{
        //    return _context.Groups.Any(e => e.Id == id);
        //}
    }
}
