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
                new UserInGroupModel()
                {
                    Id = ug.UserId,
                    IsCreator = ug.IsCreator,
                    Email = ug.User.Email,
                    //FirstName = ug.User.FirstName,
                    //LastName = ug.User.LastName,
                    ImageId = ug.User.ImageId
                })))
                .ForMember(p => p.IsCreator,
                opt => opt.MapFrom(x => false))
                .ForMember(p => p.Type,
                opt => opt.MapFrom(x => x.Type.ToString()))
                .ForMember(p => p.SentFiles,
                opt => opt.MapFrom(x => x.SentFiles
                .Select(sentFile =>
                new SentFileModel() 
                {
                   Id = sentFile.Id,
                   Name = sentFile.Name,
                   ContentId = sentFile.ContentId,
                   SendDate = sentFile.SendDate,
                   User = new SimpleUserModel() { Id = sentFile.UserId, Email = sentFile.User.Email, ImageId = sentFile.User.ImageId },
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
                    User = new SimpleUserModel() { Id = message.UserId, Email = message.User.Email, ImageId = message.User.ImageId },
                    GroupId = message.GroupId
                })))
                .ForMember(p => p.Invitations,
                opt => opt.MapFrom(x => x.Invitations
                .Select(invitation =>
                new InvitationModel()
                {
                    Value = invitation.Value,
                    SendDate = invitation.SendDate,
                    GroupId = invitation.GroupId,
                    InvitedUser = new SimpleUserModel()
                    {
                        Id = invitation.InvitedUserId,
                        Email = invitation.InvitedUser.Email,
                        ImageId = invitation.InvitedUser.ImageId
                    },
                    Inviter = new SimpleUserModel()
                    {
                        Id = invitation.InviterId,
                        Email = invitation.Inviter.Email,
                        ImageId = invitation.Inviter.ImageId
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
                    User = new SimpleUserModel() { Id = application.UserId, Email = application.User.Email, ImageId = application.User.ImageId }
                })));
        }
    }
}
