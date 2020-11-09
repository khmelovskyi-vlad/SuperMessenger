using AutoMapper;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Profiles
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageModel>()
                .ForMember(p => p.User,
                opt => opt.MapFrom(messange => 
                new SimpleUserModel() { Id = messange.UserId, Email = messange.User.Email, ImageId = messange.User.ImageId }));
        }
    }
}
