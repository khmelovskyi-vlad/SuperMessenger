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

            CreateMap<Invitation, InvitationModel>();
            CreateMap<Invitation, ReduceInvtationModel>();
        }
    }
}
