using AutoMapper;
using AutoMapper.QueryableExtensions;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, MainPageModel>()
                .ForMember(p => p.Countries,
                opt => opt.MapFrom(x => x.UserCountries.Select(uc => uc.Country).ToList()))
                .ForMember(p => p.Groups,
                opt => opt.MapFrom(x => x.UserGroups
                .Where(ug => !ug.IsLeaved)
                .Select(ug => 
                new SimpleGroupModel() { Id = ug.GroupId,
                    //IsCreator = ug.IsCreator,
                    //CreationDate = ug.Group.CreationDate,
                    ImageId = ug.Group.ImageId,
                    Name = ug.Group.Name, 
                    Type = ug.Group.Type.ToString(),
                    LastMessage = ug.Group.Messages
                    .Select(message => new MessageModel()
                    {
                        Id = message.Id,
                        GroupId = message.GroupId,
                        SendDate = message.SendDate,
                        User = new SimpleUserModel() { Id = message.UserId, Email = message.User.Email, ImageId = message.User.ImageId },
                        Value = message.Value
                    })
                    .OrderBy(message => message.SendDate)
                    .LastOrDefault()
                })))
                .ForMember(p => p.InvitationCount,
                opt => opt.MapFrom(x => x.InvitationsForMe.Count()))
                .ForMember(p => p.ApplicationCount,
                opt => opt.MapFrom(x => x.InvitationsForMe.Count()));
            CreateMap<ApplicationUser, UserProfile>();
            CreateMap<ApplicationUser, SimpleUserModel>();
        }
    }
}
