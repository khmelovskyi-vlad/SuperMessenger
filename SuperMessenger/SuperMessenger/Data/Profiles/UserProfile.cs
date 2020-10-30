using AutoMapper;
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
            CreateMap<ApplicationUser, UserModel>()
                .ForMember(p => p.Countries,
                opt => opt.MapFrom(x => x.UserCountries.Select(uc => uc.Country).ToList()))
                .ForMember(p => p.Groups,
                opt => opt.MapFrom(x => x.UserGroups
                .Where(ug => !ug.IsLeaved)
                .Select(ug => 
                new SimpleGroupModel() { Id = ug.GroupId,
                    IsCreator = ug.IsCreator,
                    CreationDate = ug.Group.CreationDate,
                    ImageId = ug.Group.ImageId,
                    Name = ug.Group.Name, 
                    Type = ug.Group.Type})));
        }
    }
}
