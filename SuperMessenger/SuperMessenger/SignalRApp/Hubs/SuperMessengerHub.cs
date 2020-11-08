using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.SignalRApp.Hubs
{
    [Authorize]
    public class SuperMessengerHub : Hub<ISuperMessengerClient>
    {
        SuperMessengerDbContext _context { get; set; }
        private readonly IMapper _mapper;
        public SuperMessengerHub(SuperMessengerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task CreateGroup(Group group, IFormFile img)
        {
            await _context.Groups.AddAsync(group);
            //Context.UserIdentifier
        }
        public async Task AddToGroup(string groupName, string playerName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            //await Clients.OthersInGroup(groupName).StartGameAsPlayer1(playerName);
        }
        public async Task SendMessage(string groupName, Message message)
        {
            await Clients.OthersInGroup(groupName).SendMessage(message);
        }
        private async Task AddGroup(Group group, IFormFile img)
        {
            var path = "";
            var imgId = Guid.NewGuid();
            group.Id = Guid.NewGuid();
            await new FileMaster().DownloadFile(img, imgId.ToString());
        }
        public async Task SendFirstData()
        {
            //var asasda = Context.User.Identity;
            //var asasdasa = Context.User.Identity.Name;
            //var userIdentifier = Context.UserIdentifier;
            //var userIdentifier2 = Guid.Parse(Context.UserIdentifier);
            await Clients.User(Context.UserIdentifier).ReceiveFirstData(await GetFirstData(Guid.Parse(Context.UserIdentifier)));
        }
        private async Task<MainPageModel> GetFirstData(Guid userIdentifier)
        {
            //var user = await _context.Users.Where(user => user.Id == userIdentifier).FirstOrDefaultAsync();
            //var profile = _mapper.Map<ProfileModel>(user);
            var result = await _context.Users
                .Where(user => user.Id == userIdentifier)
                .ProjectTo<MainPageModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return result;
        }
    }
}
