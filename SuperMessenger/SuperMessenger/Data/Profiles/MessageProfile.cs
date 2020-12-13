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
                opt => opt.MapFrom(message => 
                new SimpleUserModel() 
                { 
                    Id = message.UserId, 
                    Email = message.User.Email,
                    ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                }));
            CreateMap<MessageFile, MessageModel>()
                .ForMember(p => p.User,
                opt => opt.MapFrom(message =>
                new SimpleUserModel()
                {
                    Id = message.UserId,
                    Email = message.User.Email,
                    ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                }))
                .ForMember(p => p.Value,
                opt => opt.MapFrom(messangeFile => messangeFile.PreviousName))
                .ForMember(p => p.SendDate,
                opt => opt.MapFrom(messangeFile => messangeFile.FileInformation.SendDate));
            CreateMap<MessageFile, FileConfirmationModel>()
                .ForMember(p => p.SendDate,
                opt => opt.MapFrom(messangeFile => messangeFile.FileInformation.SendDate));
        }
    }
}
