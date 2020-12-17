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
                //.ForMember(p => p.User,
                //opt => opt.MapFrom(message => 
                //new SimpleUserModel() 
                //{ 
                //    Id = message.UserId, 
                //    Email = message.User.Email,
                //    ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                //    ///////////////////////////////////////////////////////////////////////////////////////////// change
                //}))
                //.AfterMap((message, messageModal, context) =>
                //{
                //    messageModal.User = context.Mapper.Map<SimpleUserModel>(message.User);
                //})
                ;
            CreateMap<MessageFile, MessageFileModel>()
                .ForMember(p => p.Name,
                opt => opt.MapFrom(messangeFile => messangeFile.PreviousName))
                .ForMember(p => p.SendDate,
                opt => opt.MapFrom(messangeFile => messangeFile.FileInformation.SendDate))
                .ForMember(p => p.ContentName,
                opt => opt.MapFrom(messangeFile => messangeFile.FileInformation.Name))
                //.ForMember(p => p.User,
                //opt => opt.MapFrom(message =>
                //new SimpleUserModel()
                //{
                //    Id = message.UserId,
                //    Email = message.User.Email,
                //    ImageName = message.User.AvatarInformations == null ? null 
                //    : message.User.AvatarInformations.Count() == 0 ? null
                //    : message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                //    ///////////////////////////////////////////////////////////////////////////////////////////// change
                //}))
                //.ForMember(p => p.Id,
                //opt => opt.MapFrom(messangeFile => messangeFile.Id))
                //.ForMember(p => p.GroupId,
                //opt => opt.MapFrom(messangeFile => messangeFile.GroupId))
                ;
        }
    }
}
