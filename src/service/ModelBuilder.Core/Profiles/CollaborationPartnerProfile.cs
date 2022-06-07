using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class CollaborationPartnerProfile : Profile
    {
        public CollaborationPartnerProfile()
        {
            CreateMap<CollaborationPartnerAm, CollaborationPartner>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Current, opt => opt.MapFrom(src => src.Current))
                .ForMember(dest => dest.Iris, opt => opt.MapFrom(src => src.Iris));
        }
    }
}