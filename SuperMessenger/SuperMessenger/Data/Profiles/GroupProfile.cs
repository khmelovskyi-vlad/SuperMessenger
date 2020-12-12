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
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                })))
                .ForMember(p => p.IsCreator,
                opt => opt.MapFrom(x => false))
                .ForMember(p => p.Type,
                opt => opt.MapFrom(x => x.Type.ToString()))
                .ForMember(p => p.SentFiles,
                opt => opt.MapFrom(x => x.MessageFiles
                .Select(sentFile =>
                new MessageFileModel() 
                {
                   Id = sentFile.Id,
                   Name = sentFile.PreviousName,
                   ContentName = sentFile.FileInformation.Name,
                   SendDate = sentFile.FileInformation.SendDate,
                   User = new SimpleUserModel() 
                   { 
                       Id = sentFile.UserId, 
                       Email = sentFile.User.Email, 
                       ImageName = sentFile.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                   },
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                    GroupId = sentFile.GroupId
                })))
                .ForMember(p => p.Messages,
                opt => opt.MapFrom(x => x.Messages
                .Select(message =>
                new MessageModel()
                {
                    Id = message.Id,
                    Value = message.Value,
                    SendDate = message.SendDate,
                    User = new SimpleUserModel() 
                    { 
                        Id = message.UserId, 
                        Email = message.User.Email,
                        ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    },
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                    GroupId = message.GroupId
                })))
                .ForMember(p => p.Invitations,
                opt => opt.MapFrom(x => x.Invitations
                .Select(invitation =>
                new InvitationModel()
                {
                    Value = invitation.Value,
                    SendDate = invitation.SendDate,
                    SimpleGroup = new SimpleGroupModel() 
                    { 
                        Id = invitation.GroupId,
                        Name = invitation.Group.Name,
                        ImageName = invitation.Group.ImageInformations.OrderBy(ii => ii.SendDate).FirstOrDefault().Name,
                        ///////////////////////////////////////////////////////////////////////////////////////////// change
                        Type = invitation.Group.Type.ToString()
                    },
                    InvitedUser = new SimpleUserModel()
                    {
                        Id = invitation.InvitedUserId,
                        Email = invitation.InvitedUser.Email,
                        ImageName = invitation.InvitedUser.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                        ///////////////////////////////////////////////////////////////////////////////////////////// change
                    },
                    Inviter = new SimpleUserModel()
                    {
                        Id = invitation.InviterId,
                        Email = invitation.Inviter.Email,
                        ImageName = invitation.InvitedUser.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                        ///////////////////////////////////////////////////////////////////////////////////////////// change
                    }
                })))
                .ForMember(p => p.Applications,
                opt => opt.MapFrom(x => x.Applications
                .Select(application =>
                new ApplicationModel()
                {
                    Value = application.Value,
                    SendDate = application.SendDate,
                    GroupId = application.GroupId,
                    User = new SimpleUserModel() 
                    { 
                        Id = application.UserId, 
                        Email = application.User.Email,
                        ImageName = application.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    }
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                })));
            CreateMap<Group, SimpleGroupModel>()
                .ForMember(p => p.Type,
                opt => opt.MapFrom(x => x.ImageInformations.OrderBy(ii => ii.SendDate).FirstOrDefault().Name))
                .ForMember(p => p.ImageName,
                opt => opt.MapFrom(x => x.Type.ToString()))
                .ForMember(p => p.LastMessage,
                opt => opt.MapFrom(x => x.Messages.Select(message => new MessageModel()
                {
                    Id = message.Id,
                    GroupId = message.GroupId,
                    SendDate = message.SendDate,
                    User = new SimpleUserModel() 
                    { Id = message.UserId, 
                        Email = message.User.Email,
                        ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    },
                    ///////////////////////////////////////////////////////////////////////////////////////////// change
                    Value = message.Value
                })
                .OrderBy(message => message.SendDate)
                .LastOrDefault()));
        }
    }
}
