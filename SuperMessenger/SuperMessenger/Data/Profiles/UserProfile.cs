﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            Guid? id = null;
            CreateMap<ApplicationUser, MainPageModel>()
                .ForMember(p => p.Countries,
                opt => opt.MapFrom(x => x.UserCountries.Select(uc => uc.Country).ToList()))
                .ForMember(p => p.ImageName,
                opt => opt.MapFrom(x => x.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name))
                .ForMember(p => p.Groups,
                opt => opt.MapFrom(x => x.UserGroups
                .Where(ug => !ug.IsLeaved)
                .Select(ug =>
                ug.Group.Type == GroupType.Chat ?
                new SimpleGroupModel()
                {
                    Id = ug.GroupId,
                    ImageName = ug.Group.UserGroups.Where(ug => ug.UserId != id)
                    .Select(ug => ug.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name).SingleOrDefault(),
                    Name = ug.Group.UserGroups.Where(ug => ug.UserId != x.Id).FirstOrDefault().User.Email,
                    Type = ug.Group.Type.ToString(),
                    LastMessage = ug.Group.Messages.OrderBy(message => message.SendDate).LastOrDefault().SendDate >
                    ug.Group.MessageFiles.OrderBy(file => file.FileInformation.SendDate).LastOrDefault().FileInformation.SendDate
                    || ug.Group.MessageFiles.OrderBy(file => file.FileInformation.SendDate).LastOrDefault().FileInformation.SendDate == null ?
                    ug.Group.Messages
                    .Select(message => new MessageModel()
                    {
                        Id = message.Id,
                        GroupId = message.GroupId,
                        SendDate = message.SendDate,
                        User = new SimpleUserModel() 
                        { 
                            Id = message.UserId, 
                            Email = message.User.Email,
                            ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                        },
                        Value = message.Value
                    })
                    .OrderBy(message => message.SendDate)
                    .LastOrDefault()
                    :
                    ug.Group.MessageFiles
                    .Select(file => new MessageModel()
                    {
                        Id = file.Id,
                        GroupId = file.GroupId,
                        SendDate = file.FileInformation.SendDate,
                        User = new SimpleUserModel() 
                        { 
                            Id = file.UserId, 
                            Email = file.User.Email,
                            ImageName = file.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                        },
                        Value = file.PreviousName
                    })
                    .OrderBy(message => message.SendDate)
                    .LastOrDefault()
                }
                :
                new SimpleGroupModel() { Id = ug.GroupId,
                    ImageName = ug.Group.ImageInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                    Name = ug.Group.Name, 
                    Type = ug.Group.Type.ToString(),
                    LastMessage = ug.Group.Messages.OrderBy(message => message.SendDate).LastOrDefault().SendDate >
                    ug.Group.MessageFiles.OrderBy(file => file.FileInformation.SendDate).LastOrDefault().FileInformation.SendDate 
                    || ug.Group.MessageFiles.OrderBy(file => file.FileInformation.SendDate).LastOrDefault().FileInformation.SendDate == null ?
                    ug.Group.Messages
                    .Select(message => new MessageModel()
                    {
                        Id = message.Id,
                        GroupId = message.GroupId,
                        SendDate = message.SendDate,
                        User = new SimpleUserModel() 
                        { 
                            Id = message.UserId, 
                            Email = message.User.Email,
                            ImageName = message.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                        },
                        Value = message.Value
                    })
                    .OrderBy(message => message.SendDate)
                    .LastOrDefault()
                    :
                    ug.Group.MessageFiles
                    .Select(file => new MessageModel()
                    {
                        Id = file.Id,
                        GroupId = file.GroupId,
                        SendDate = file.FileInformation.SendDate,
                        User = new SimpleUserModel() 
                        { 
                            Id = file.UserId, 
                            Email = file.User.Email,
                            ImageName = file.User.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
                        },
                        Value = file.PreviousName
                    })
                    .OrderBy(message => message.SendDate)
                    .LastOrDefault()
                })))
                .ForMember(p => p.InvitationCount,
                opt => opt.MapFrom(x => x.InvitationsForMe.Count()))
                .ForMember(p => p.ApplicationCount,
                opt => opt.MapFrom(x => x.Applications.Count()));
            CreateMap<ApplicationUser, UserProfile>();
            CreateMap<ApplicationUser, SimpleUserModel>()
                .ForMember(p => p.ImageName,
            opt => opt.MapFrom(user => user.AvatarInformations == null ? null
            : user.AvatarInformations.Count() == 0 ? null 
            : user.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name));
            CreateMap<ApplicationUser, ProfileModel>()
                .ForMember(p => p.ImageName,
                opt => opt.MapFrom(user => user.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name));
        }
    }
}
