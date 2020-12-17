using AutoMapper;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Profiles
{
    public class GroupProfile : Profile
    {
        public GroupProfile()
        {
            CreateMap<Group, GroupModel>()
                .ForMember(p => p.ImageName,
                opt => opt.MapFrom(x => x.ImageInformations.OrderBy(ii => ii.SendDate).FirstOrDefault().Name))
                .ForMember(p => p.Users,
                opt => opt.MapFrom(x => x.UserGroups
                .Where(ug => !ug.IsLeaved)
                .Select(ug =>
                new UserInGroupModel()
                {
                    Id = ug.UserId,
                    IsCreator = ug.IsCreator,
                    Email = ug.User.Email,
                    ImageName = ug.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                })))
                .ForMember(p => p.IsCreator,
                opt => opt.MapFrom(x => false))
                .ForMember(p => p.Type,
                opt => opt.MapFrom(x => x.Type.ToString()))
                ;
            CreateMap<Group, SimpleGroupModel>()
                .ForMember(p => p.ImageName,
                opt => opt.MapFrom(group => group.ImageInformations == null ? null
                : group.ImageInformations.Count() == 0 ? null
                : group.ImageInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name))
                .ForMember(p => p.Type,
                opt => opt.MapFrom(x => x.Type.ToString()))
                .ForMember(p => p.LastMessage,
                opt => opt.MapFrom(x => x.Messages.Select(message => new MessageModel()
                {
                    Id = message.Id,
                    GroupId = message.GroupId,
                    SendDate = message.SendDate,
                    User = new SimpleUserModel()
                    {
                        Id = message.UserId,
                        Email = message.User.Email,
                        ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    },
                    Value = message.Value
                })
                .OrderBy(message => message.SendDate)
                .LastOrDefault()));
        }
    }
}
