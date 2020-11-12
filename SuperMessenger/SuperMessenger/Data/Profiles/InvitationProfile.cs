using AutoMapper;
using SuperMessenger.Models;
using SuperMessenger.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Data.Profiles
{
    public class InvitationProfile : Profile
    {
        public InvitationProfile()
        {
            CreateMap<Invitation, InvitationModel>()
                .ForMember(p => p.SimpleGroup,
                opt => opt.MapFrom(invitation =>
                new SimpleGroupModel()
                {
                    Id = invitation.GroupId,
                    Name = invitation.Group.Name,
                    ImageId = invitation.Group.ImageId,
                    Type = invitation.Group.Type.ToString()
                }))
                .ForMember(p => p.InvitedUser,
                opt => opt.MapFrom(invitation =>
                new SimpleUserModel()
                {
                    Id = invitation.InvitedUserId,
                    Email = invitation.InvitedUser.Email,
                    ImageId = invitation.InvitedUser.ImageId
                }))
                .ForMember(p => p.Inviter,
                opt => opt.MapFrom(invitation =>
                new SimpleUserModel()
                {
                    Id = invitation.InviterId,
                    Email = invitation.Inviter.Email,
                    ImageId = invitation.Inviter.ImageId
                }));
        }
    }
}
