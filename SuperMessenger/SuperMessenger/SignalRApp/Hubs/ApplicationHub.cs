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
            if (application.Value == null || application.Value.Length > 150)
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidValue.ToString());
            }
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
                    if ((await _context.Groups.Where(g => g.Id == application.GroupId).FirstOrDefaultAsync())?.Type != GroupType.Public)
                    {
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.invalidGroupType.ToString());
                    }
                    else
                    {
                        application.SendDate = DateTime.Now;
                        await _context.Applications.AddAsync(new Application()
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
                        await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successSubmitted.ToString());
                        //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.successSubmitted.ToString());
                    }
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreInGroup.ToString());
                    //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.youAreInGroup.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.wasSentEarlier.ToString());
                //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.wasSentEarlier.ToString());
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
                    //if (application.Group.UserGroups.Where(ug => ug.UserId == applicationModel.User.Id).Count() == 0)
                    //{
                        await SaveAcceptingResult(applicationModel, application);
                        await SendAcceptingResult(applicationModel, application);
                        //await Clients.User(applicationModel.User.Id.ToString()).ReceiveAcceptApplicationResult(groupModel);
                        //await Clients.User(Context.UserIdentifier).ReceiveAcceptApplicationResult(SendingResult.successAcceptingApplication, groupModel);
                    //}
                    //else
                    //{
                    //    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.userIsInGroup.ToString());
                    //    //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.userIsInGroup.ToString());
                    //}
                }
                else
                {
                    await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.notHaveApplication.ToString());
                    //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.notHaveApplication.ToString());
                }
            }
            else
            {
                await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.youAreNotCreator.ToString());
                //await Clients.User(Context.UserIdentifier).ReceiveApplicationSendingResult(ApplicationResultType.youAreNotCreator.ToString());
            }
        }
        private async Task SaveAcceptingResult(ApplicationModel applicationModel, Application application)
        {
            await _context.UserGroups.AddAsync(new UserGroup()
            {
                GroupId = applicationModel.GroupId,
                UserId = applicationModel.User.Id,
                IsCreator = false,
                IsLeaved = false
            });
            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
        }
        private async Task SendAcceptingResult(ApplicationModel applicationModel, Application application)
        {
            //var groupModel = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
            //    .ProjectTo<GroupModel>(_mapper.ConfigurationProvider)
            //    .FirstOrDefaultAsync();
            var simpleGroup = await _context.Groups.Where(g => g.Id == applicationModel.GroupId)
                .ProjectTo<SimpleGroupModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            await Clients.User(Context.UserIdentifier).ReceiveApplicationResultType(ApplicationResultType.successAccepting.ToString());
            //await Clients.User(Context.UserIdentifier).ReceiveAcceptApplicationResult(ApplicationResultType.successAccepting.ToString());
            await Clients.User(applicationModel.User.Id.ToString()).ReceiveSimpleGroup(simpleGroup);
            //await Clients.User(applicationModel.User.Id.ToString()).ReceiveApplicationConfirmation(groupModel);
            var userInGroupModel = new UserInGroupModel()
            {
                Id = applicationModel.User.Id,
                Email = applicationModel.User.Email,
                ImageId = applicationModel.User.ImageId,
                IsCreator = false
            };
            foreach (var userGroup in application.Group.UserGroups)
            {
                await Clients.User(userGroup.UserId.ToString()).ReceiveNewGroupUser(userInGroupModel, simpleGroup.Id);
            }
        }
    }
}
