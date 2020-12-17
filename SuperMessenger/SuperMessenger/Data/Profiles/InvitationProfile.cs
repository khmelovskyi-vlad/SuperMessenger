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
            //.ForMember(p => p.SimpleGroup,

            //opt => opt.MapFrom((invitation, dest, context) =>
            //new SimpleGroupModel()
            //{
            //    Id = invitation.GroupId,
            //    Name = invitation.Group.Name,
            //    ImageName = invitation.Group.ImageInformations.Count() == 0 ? null
            //    : invitation.Group.ImageInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
            //    //ImageName = invitation.Group.ImageInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
            //    ///////////////////////////////////////////////////////////////////////////////////////////// change
            //    Type = invitation.Group.Type.ToString()
            //}))
            //.ForMember(p => p.InvitedUser,
            //opt => opt.MapFrom(invitation =>
            //new SimpleUserModel()
            //{
            //    Id = invitation.InvitedUserId,
            //    Email = invitation.InvitedUser.Email,
            //    ImageName = invitation.InvitedUser.AvatarInformations.Count() == 0 ? null
            //    : invitation.InvitedUser.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
            //    //ImageName = invitation.InvitedUser.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
            //    ///////////////////////////////////////////////////////////////////////////////////////////// change
            //}))
            //.ForMember(p => p.Inviter,
            //opt => opt.MapFrom(invitation =>
            //new SimpleUserModel()
            //{
            //    Id = invitation.InviterId,
            //    Email = invitation.Inviter.Email,
            //    ImageName = invitation.Inviter.AvatarInformations.Count() == 0 ? null
            //    : invitation.Inviter.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
            //    //ImageName = invitation.Inviter.AvatarInformations.OrderBy(ai => ai.SendDate).FirstOrDefault().Name,
            //    ///////////////////////////////////////////////////////////////////////////////////////////// change
            //}))
            //.AfterMap((invitation, invitationModel, context) =>
            //{
            //    invitationModel.Group.LastMessage = null;
            //})
            ;
            CreateMap<Invitation, ReduceInvtationModel>();
        }
    }
}
