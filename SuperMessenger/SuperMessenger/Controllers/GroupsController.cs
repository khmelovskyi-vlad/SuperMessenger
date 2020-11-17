using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
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
        class FooClass
        {
            public List<InvitationModel> invitations { get; set; }
        }
        [HttpPost]
        //public async Task<ActionResult<Group>> PostGroup([FromForm] NewGroupModel newGroup)
        public async Task PostGroup([FromForm] NewGroupModel newGroup)
        {
            //JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions() {
            //    PropertyNamingPolicy = null
            //};
            List<InvitationModel> invitations = new List<InvitationModel>();
            var invitations3 = JsonSerializer.Deserialize<List<FooClass>>(newGroup.Invitations2);
            foreach (var invitation in newGroup.Invitations)
            {
                var res = JsonSerializer.Deserialize<InvitationModel>(invitation);
                invitations.Add(JsonSerializer.Deserialize<InvitationModel>(invitation));
            }
            var invitations2 = JsonSerializer.Deserialize<List<InvitationModel>>(newGroup.Invitations2);
            //var invitations = JsonSerializer.Deserialize<List<InvitationModel>>(newGroup.InvitationsJson);
            var sasdas = User?.FindFirst("sub").Value;
            var sasdasasda = User?.Identity.Name;
            return;
            var type = (GroupType)Enum.Parse(typeof(GroupType), newGroup.GroupType, true);
            if (await CheckCanCreateGroup(type, newGroup, invitations))
            {
                var groupId = Guid.NewGuid();
                var imgId = Guid.NewGuid();
                var group = new Group()
                {
                    Id = groupId,
                    Name = type == GroupType.Chat ? null : newGroup.GroupName,
                    Type = type,
                    CreationDate = DateTime.Now
                };
                if (newGroup.GroupImg != null && type != GroupType.Chat)
                {
                    var imgType = FindType(newGroup.GroupImg.ContentType);
                    if (imgType != null)
                    {
                        await AddGroupImage(newGroup.GroupImg, $"{imgId}.{imgType}");
                        group.ImageId = imgId;
                    }
                }
                //var newInvitations = CreateInvitation(newGroup.Invitations);
                await _context.Groups.AddAsync(group);
                await _context.UserGroups.AddAsync(new UserGroup()
                {
                    UserId = Guid.Parse(User?.FindFirst("sub")?.Value),
                    GroupId = groupId,
                    IsCreator = true,
                    IsLeaved = false
                });
                //await _context.Invitations.AddRangeAsync(newInvitations);
                await _context.SaveChangesAsync();
                //await SendInvitations(newGroup.Invitations);
                await SendGroup(newGroup, groupId, imgId);
                await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveCreateGroupResult(SendingResult.haveThisGroup.ToString());
                //return CreatedAtAction("GetGroup", new { id = groupId }, @group);
            }
        }
        private async Task SendInvitations(List<InvitationModel> invitations)
        {
            foreach (var invitation in invitations)
            {
                await _hubContext.Clients.User(invitation.InvitedUser.Id.ToString()).ReceiveInvitation(invitation);
            }
        }
        private async Task SendGroup(NewGroupModel newGroup, Guid groupId, Guid imgId)
        {
            var simpleGroup = new SimpleGroupModel()
            {
                Id = groupId,
                ImageId = imgId,
                Name = newGroup.GroupName,
                Type = newGroup.GroupType,
                LastMessage = null
            };
            await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroup(simpleGroup);
        }
        private List<Invitation> CreateInvitation(List<InvitationModel> invitations)
        {
            List<Invitation> newInvitations = new List<Invitation>();
            var now = DateTime.Now;
            foreach (var invitation in invitations)
            {
                invitation.SendDate = now;
                newInvitations.Add(new Invitation() { 
                    Value = invitation.Value,
                    SendDate = invitation.SendDate,
                    GroupId = invitation.SimpleGroup.Id, 
                    InviterId = invitation.Inviter.Id, 
                    InvitedUserId = invitation.InvitedUser.Id 
                });
            }
            return newInvitations;
        }
        private async Task<bool> CheckCanCreateGroup(GroupType type, NewGroupModel newGroup, List<InvitationModel> invitations)
        {
            if (type == GroupType.Public)
            {
                if(await _context.Groups
                    .Where(group => group.Type == GroupType.Public)
                    .AnyAsync(g => g.Name == newGroup.GroupName))
                {
                    return true;
                }
                await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveCreateGroupResult(SendingResult.haveThisGroup.ToString());
            }
            else if (type == GroupType.Chat)
            {
                if (invitations.Count() == 1)
                {
                    var inviterInvited = invitations.Select(i => new { inviter = i.Inviter, invited = i.InvitedUser }).FirstOrDefault();
                    if(await _context.Users.Where(user => user.Id == inviterInvited.inviter.Id
                    && user.Id == inviterInvited.invited.Id)
                        .SelectMany(user => user.UserGroups)
                        .Select(userGroup => userGroup.Group)
                        .Where(g => g.Type == GroupType.Chat)
                        .SelectMany(g => g.UserGroups)
                        .AnyAsync(ug => ug.UserId == inviterInvited.inviter.Id && ug.UserId == inviterInvited.invited.Id))
                    {
                        await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveCreateGroupResult(SendingResult.haveThisGroup.ToString());
                    }
                }
                else
                {
                    await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveCreateGroupResult(SendingResult.manyInvitation.ToString());
                    return false;
                }
            }
            else if (type == GroupType.Private)
            {
                return true;
            }
            await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveCreateGroupResult(SendingResult.dontHaveThisType.ToString());
            return false;
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
