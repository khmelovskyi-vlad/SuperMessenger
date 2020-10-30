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
                .ForMember(p => p.Users,
                opt => opt.MapFrom(x => x.UserGroups
                .Where(ug => !ug.IsLeaved)
                .Select(ug =>
                new SimpleUserModel()
                {
                    Id = ug.UserId,
                    IsCreator = ug.IsCreator,
                    Email = ug.User.Email,
                    FirstName = ug.User.FirstName,
                    LastName = ug.User.LastName,
                    ImageId = ug.User.ImageId,
                    IsInBan = ug.User.IsInBan
                })));
        }
    }
}
