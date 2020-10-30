using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Models.EntityFramework;
using SuperMessenger.SignalRApp.Hubs;

namespace SuperMessenger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        private readonly SuperMessengerDbContext _context;
        private readonly IHubContext<InvitationHub, IInvitationClient> _hubContext;

        public InvitationsController(SuperMessengerDbContext context, IHubContext<InvitationHub, IInvitationClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Invitations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invitation>>> GetInvitations()
        {
            return await _context.Invitations.ToListAsync();
        }

        //// GET: api/Invitations/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Invitation>> GetInvitation(Guid id)
        //{
        //    var invitation = await _context.Invitations.FindAsync(id);

        //    if (invitation == null)
        //    {
        //        return NotFound();
        //    }

        //    return invitation;
        //}

        //// PUT: api/Invitations/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutInvitation(Guid id, Invitation invitation)
        //{
        //    if (id != invitation.GroupId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(invitation).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!InvitationExists(id))
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

        // POST: api/Invitations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        //public async Task<ActionResult<Invitation>> PostInvitation(Invitation invitation)
        public async Task<ActionResult<bool>> PostInvitation(Invitation invitation)
        {
            _context.Invitations.Add(invitation);
            try
            {
                await _context.SaveChangesAsync();
                await _hubContext.Clients.User(invitation.InvitedUserId.ToString()).ReceiveInvitation(invitation);
            }
            catch (DbUpdateException)
            {
                if (InvitationExists(invitation.GroupId, invitation.InvitedUserId, invitation.InviterId))
                {
                    return Conflict();
                }
                else
                {
                    return false;
                    //throw;
                }
            }
            //catch (Exception)
            //{
            //    return true;
            //}
            return true;
            //return CreatedAtAction("GetInvitation", new { id = invitation.GroupId }, invitation);
        }
        //[HttpPost]
        //public async Task<bool> PostInvitation(Invitation invitation)
        //{
        //    _context.Invitations.Add(invitation);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (InvitationExists(invitation.GroupId, invitation.InvitedUserId, invitation.InviterId))
        //        {
        //            return false;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //    return true;
        //    //return CreatedAtAction("GetInvitation", new { id = invitation.GroupId }, invitation);
        //}

        // DELETE: api/Invitations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Invitation>> DeleteInvitation(Guid id)
        {
            var invitation = await _context.Invitations.FindAsync(id);
            if (invitation == null)
            {
                return NotFound();
            }

            _context.Invitations.Remove(invitation);
            await _context.SaveChangesAsync();

            return invitation;
        }

        private bool InvitationExists(Guid groupId, Guid invitedUserId, Guid inviterId)
        {
            return _context.Invitations.Any(e => e.GroupId == groupId && e.InvitedUserId == invitedUserId && e.InviterId == inviterId);
        }
    }
}
