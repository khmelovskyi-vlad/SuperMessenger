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
                //.ForMember(p => p.User,
                //opt => opt.MapFrom(application =>
                //new SimpleUserModel()
                //{
                //    Id = application.UserId,
                //    Email = application.User.Email,
                //    ImageName = application.User.AvatarInformations.Count() == 0 ? null
                //    : application.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                //    //ImageName = application.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                //    ///////////////////////////////////////////////////////////////////////////////////////////// change
                //}))
                ;
        }
        private static string GetUserAvatarName(ApplicationUser user)
        {
            if (user == null || user.AvatarInformations == null || user.AvatarInformations.Count() == 0)
            {
                return null;
            }
            return user.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name;
        }
    }
}
