using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Data.Enums;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    public class ApplicationHub : Hub<IApplicationClient>
    {
        readonly SuperMessengerDbContext _context;
        readonly IMapper _mapper;
        public ApplicationHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task SendApplication(ApplicationModel application)
        {
            if ((await _context.Applications.Where(a => a.UserId == application.User.Id &&
                a.GroupId == application.GroupId).CountAsync()) == 0)
            {
                var userGroups = await _context.Groups
                    .Where(group => group.Id == application.GroupId)
                    .SelectMany(group => group.UserGroups)
                    .Include(ug => ug.User)
                    .ToListAsync();
                if (userGroups.Where(ug => ug.UserId == application.User.Id).Count() == 0)
                {
                    application.SendDate = DateTime.Now;
                    await _context.Applications.AddRangeAsync(new Application()
                    {
                        Value = application.Value,
                        SendDate = application.SendDate,
                        UserId = application.User.Id,
                        GroupId = application.GroupId,
                    });
                    var creatorId = userGroups.Where(ug => ug.IsCreator)
                        .FirstOrDefault()?.UserId;
                    await _context.SaveChangesAsync();
                    if (creatorId != null)
                    {
                        await Clients.User(creatorId.ToString()).ReceiveApplication(application);
                    }
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.successSendingApplication);
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.isInGroup);
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.applicationWasSendingErlea);
            }
        }
        public async Task AcceptApplication(ApplicationModel applicationModel)
        {
            //var userGroups = await _context.Groups
            //    .Where(group => group.Id == applicationModel.GroupId)
            //    .SelectMany(group => group.UserGroups)
            //    .Include(ug => ug.User)
            //    .ToListAsync();
            var application = await _context.Applications
                .Where(a => a.GroupId == applicationModel.GroupId)
                .Include(a => a.Group)
                .ThenInclude(group => group.UserGroups)
                .ThenInclude(ug => ug.User)
                .FirstAsync();
            var creatorId = application?.Group.UserGroups.Where(ug => ug.IsCreator)
                .FirstOrDefault()?.UserId;
            if (creatorId != null && creatorId == Guid.Parse(Context.UserIdentifier))
            {
                if ((await _context.Applications.Where(a => a.UserId == applicationModel.User.Id &&
                    a.GroupId == applicationModel.GroupId).CountAsync()) != 0)
                {
                    if (application.Group.UserGroups.Where(ug => ug.UserId == applicationModel.User.Id).Count() == 0)
                    {
                        _context.Applications.Remove(application);
                        await _context.SaveChangesAsync();
                        var groupModel = await _context.Groups.Where(g => g.Id == application.GroupId)
                            .ProjectTo<GroupModel>(_mapper.ConfigurationProvider)
                            .FirstOrDefaultAsync();
                        await Clients.User(applicationModel.User.Id.ToString()).AcceptApplication(groupModel);
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.successAcceptingApplication);
                    }
                    else
                    {
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.isInGroup);
                    }
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.notHaveApplication);
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(SendingResult.isNotCreator);
            }
        }
    }
}
