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
            CreateMap<Message, MessageModel>();
            CreateMap<MessageFile, MessageFileModel>()
                .ForMember(p => p.Name,
                opt => opt.MapFrom(messangeFile => messangeFile.PreviousName))
                .ForMember(p => p.SendDate,
                opt => opt.MapFrom(messangeFile => messangeFile.FileInformation.SendDate));
        }
    }
}
