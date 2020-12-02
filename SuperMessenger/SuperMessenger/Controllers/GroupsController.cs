using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.StaticFiles;
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
    public class GroupsController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly IHubContext<GroupHub, IGroupClient> _hubContext;
        private readonly ImagePathesOptions imagePathes;
        public GroupsController(SuperMessengerDbContext context, 
            IHubContext<GroupHub, IGroupClient> hubContext, 
            IOptions<ImagePathesOptions> imagePathesOptions)
        {
            _context = context;
            _hubContext = hubContext;
            imagePathes = imagePathesOptions.Value;
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
        public class FooClass
        {
            public IFormFile GroupImg { get; set; }
            public string Lol { get; set; }
        }

        [HttpPost]
        public async Task PostGroup([FromForm]IFormFile groupImg)
        {
            var fileName = Path.GetFileNameWithoutExtension(groupImg.FileName);
            if (await _context.Groups
                .AnyAsync(group => group.ImageId == Guid.Parse(fileName)
                && group.UserGroups.Any(ug => ug.UserId == Guid.Parse(User.FindFirst("sub").Value) && ug.IsCreator)))
            {
                var extension = Path.GetExtension(groupImg.FileName).ToLower();
                if (extension != null)
                {
                    //await AddGroupImage(groupImg, $"{groupImg.FileName}");
                    await AddGroupImage(groupImg, $"{fileName}.jpg");
                    await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.successAdded.ToString());
                }
            }
            else
            {

            }
            //return Ok(new { count = 2});
        }
        private async Task AddGroupImage(IFormFile postedFile, string fileName)
        {
            //var imgPath = @"C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\groupImgs";
            using (var stream = System.IO.File.Create(Path.Combine(imagePathes.GroupImages, fileName)))
            {
                stream.SetLength(postedFile.Length);
                await postedFile.CopyToAsync(stream);
            }
            //using (FileStream stream = new FileStream(Path.Combine(imagePathes.GroupImages, fileName), FileMode.Create))
            //{
            //    //SetLength
            //    await postedFile.CopyToAsync(stream);
            //}
        }
        //[HttpPost]
        ////public async Task<ActionResult<Group>> PostGroup([FromForm] NewGroupModel newGroup)
        //public async Task PostGroup([FromForm] NewGroupModel newGroup)
        //{
        //    var ex = Path.GetExtension(newGroup.GroupImg.FileName).ToLower();
        //    //FileExtensionContentTypeProvider
        //    ////JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions() {
        //    ////    PropertyNamingPolicy = null
        //    ////};
        //    //List<InvitationModel> invitations = new List<InvitationModel>();
        //    //var invitations3 = JsonSerializer.Deserialize<List<FooClass>>(newGroup.Invitations2);
        //    //foreach (var invitation in newGroup.Invitations)
        //    //{
        //    //    var res = JsonSerializer.Deserialize<InvitationModel>(invitation);
        //    //    invitations.Add(JsonSerializer.Deserialize<InvitationModel>(invitation));
        //    //}
        //    //var invitations2 = JsonSerializer.Deserialize<List<InvitationModel>>(newGroup.Invitations2);
        //    ////var invitations = JsonSerializer.Deserialize<List<InvitationModel>>(newGroup.InvitationsJson);
        //    //var sasdas = User?.FindFirst("sub").Value;
        //    //var sasdasasda = User?.Identity.Name;
        //    var type = (GroupType)Enum.Parse(typeof(GroupType), newGroup.GroupType, true);
        //    if (await CheckCanCreateGroup(type, newGroup, newGroup.Invitations3))
        //    {
        //        var groupId = Guid.NewGuid();
        //        var imgId = Guid.NewGuid();
        //        var group = new Group()
        //        {
        //            Id = groupId,
        //            Name = type == GroupType.Chat ? null : newGroup.GroupName,
        //            Type = type,
        //            CreationDate = DateTime.Now
        //        };
        //        if (newGroup.GroupImg != null && type != GroupType.Chat)
        //        {
        //            var imgType = FindType(newGroup.GroupImg.ContentType);
        //            if (imgType != null)
        //            {
        //                await AddGroupImage(newGroup.GroupImg, $"{imgId}.{imgType}");
        //                group.ImageId = imgId;
        //            }
        //        }
        //        else
        //        {
        //            imgId = new Guid();
        //        }
        //        await SaveGroup(group, newGroup.Invitations3);


        //        //await _context.Groups.AddAsync(group);
        //        //await _context.UserGroups.AddAsync(new UserGroup()
        //        //{
        //        //    UserId = Guid.Parse(User?.FindFirst("sub")?.Value),
        //        //    GroupId = groupId,
        //        //    IsCreator = true,
        //        //    IsLeaved = false
        //        //});
        //        //await _context.SaveChangesAsync();




        //        //await SendInvitations(newGroup.Invitations); /////////////////////////////////////this need
        //        await SendGroup(newGroup, groupId, imgId);
        //        await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.successAdded.ToString());
        //        //return CreatedAtAction("GetGroup", new { id = groupId }, @group);
        //    }
        //}
        //private async Task SaveGroup(Group group, List<InvitationModel> invitations)
        //{
        //    //var newInvitations = CreateInvitations(invitations); /////////////////////////////////////this need
        //    //await _context.Invitations.AddRangeAsync(newInvitations); /////////////////////////////////////this need
        //    await _context.Groups.AddAsync(group);
        //    await _context.UserGroups.AddAsync(new UserGroup()
        //    {
        //        UserId = Guid.Parse(User?.FindFirst("sub")?.Value),
        //        GroupId = group.Id,
        //        IsCreator = true,
        //        IsLeaved = false
        //    });
        //    await _context.SaveChangesAsync();
        //}
        //private async Task SendInvitations(List<InvitationModel> invitations)
        //{
        //    foreach (var invitation in invitations)
        //    {
        //        await _hubContext.Clients.User(invitation.InvitedUser.Id.ToString()).ReceiveInvitation(invitation);
        //    }
        //}
        //private async Task SendGroup(NewGroupModel newGroup, Guid groupId, Guid imgId)
        //{
        //    var simpleGroup = new SimpleGroupModel()
        //    {
        //        Id = groupId,
        //        ImageId = imgId,
        //        Name = newGroup.GroupName,
        //        Type = newGroup.GroupType,
        //        LastMessage = null
        //    };
        //    await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveSimpleGroup(simpleGroup);
        //}
        //private List<Invitation> CreateInvitations(List<InvitationModel> invitations)
        //{
        //    List<Invitation> newInvitations = new List<Invitation>();
        //    var now = DateTime.Now;
        //    foreach (var invitation in invitations)
        //    {
        //        invitation.SendDate = now;
        //        newInvitations.Add(new Invitation() { 
        //            Value = invitation.Value,
        //            SendDate = invitation.SendDate,
        //            GroupId = invitation.SimpleGroup.Id, 
        //            InviterId = invitation.Inviter.Id, 
        //            InvitedUserId = invitation.InvitedUser.Id 
        //        });
        //    }
        //    return newInvitations;
        //}
        //private async Task<bool> CheckCanCreateGroup(GroupType type, NewGroupModel newGroup, List<InvitationModel> invitations)
        //{
        //    if ((type == GroupType.Private || type == GroupType.Public) 
        //        && (newGroup.GroupName == null || newGroup.GroupName.Length == 0 || newGroup.GroupName.Length > 50))
        //    {
        //        await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.invalidName.ToString());
        //        return false;
        //    }
        //    else if (type == GroupType.Public)
        //    {
        //        if(await _context.Groups
        //            .Where(group => group.Type == GroupType.Public)
        //            .AnyAsync(g => g.Name == newGroup.GroupName))
        //        {
        //            await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.nameIsUsed.ToString());
        //            return false;
        //        }
        //        return true;
        //    }
        //    else if (type == GroupType.Chat)
        //    {
        //        if (invitations.Count() > 1)
        //        {
        //            await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.tooFewInvitations.ToString());
        //            return false;
        //        }
        //        else if(invitations.Count() < 1)
        //        {
        //            await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.tooManyInvitations.ToString());
        //            return false;
        //        }
        //        else
        //        {
        //            var inviterInvited = invitations.Select(i => new { inviter = i.Inviter, invited = i.InvitedUser }).FirstOrDefault();
        //            if (await _context.Users.Where(user => user.Id == inviterInvited.inviter.Id
        //             && user.Id == inviterInvited.invited.Id)
        //                .SelectMany(user => user.UserGroups)
        //                .Select(userGroup => userGroup.Group)
        //                .Where(g => g.Type == GroupType.Chat)
        //                .SelectMany(g => g.UserGroups)
        //                .AnyAsync(ug => ug.UserId == inviterInvited.inviter.Id && ug.UserId == inviterInvited.invited.Id))
        //            {
        //                await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.youAreInGroup.ToString());
        //                return false;
        //            }
        //            else
        //            {
        //                return true;
        //            }
        //        }
        //    }
        //    else if (type == GroupType.Private)
        //    {
        //        return true;
        //    }
        //    await _hubContext.Clients.User(User?.FindFirst("sub").Value).ReceiveGroupResultType(GroupResultType.noHaveThisType.ToString());
        //    return false;
        //}

        //private string FindType(string contentType)
        //{
        //    switch (contentType)
        //    {
        //        case "image/jpeg":
        //            return "jpg";
        //        default:
        //            return "jpg";
        //            //return null;
        //    }
        //}


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
