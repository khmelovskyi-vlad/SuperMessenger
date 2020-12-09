using AutoMapper;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Profiles
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<Application, ApplicationModel>()
                .ForMember(p => p.User,
                opt => opt.MapFrom(application =>
                new SimpleUserModel()
                {
                    Id = application.UserId,
                    Email = application.User.Email,
                    ImageId = application.User.ImageId
                }));
        }
    }
}
