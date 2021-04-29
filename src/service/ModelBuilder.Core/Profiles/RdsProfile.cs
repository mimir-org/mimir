using AutoMapper;
using Mb.Core.Models;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class RdsProfile : Profile
    {
        public RdsProfile()
        {
            CreateMap<Rds, RdsAm>()
                .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.Code))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsFunction, opt => opt.MapFrom(src => src.IsFunction))
                .ForMember(dest => dest.IsProduct, opt => opt.MapFrom(src => src.IsProduct))
                .ForMember(dest => dest.IsLocation, opt => opt.MapFrom(src => src.IsLocation));


            CreateMap<RdsAm, Rds>()
                .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.Code))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsFunction, opt => opt.MapFrom(src => src.IsFunction))
                .ForMember(dest => dest.IsProduct, opt => opt.MapFrom(src => src.IsProduct))
                .ForMember(dest => dest.IsLocation, opt => opt.MapFrom(src => src.IsLocation));
        }
    }
}
