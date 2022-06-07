using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class VersionProfile : Profile
    {
        public VersionProfile(ICommonRepository commonRepository)
        {
            CreateMap<Version, VersionCm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Ver, opt => opt.MapFrom(src => src.Ver))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.TypeId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));
        }
    }
}