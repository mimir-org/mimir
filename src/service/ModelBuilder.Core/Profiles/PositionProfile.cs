using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class PositionProfile : Profile
    {
        public PositionProfile()
        {
            CreateMap<PositionAm, PositionDm>()
                .ForMember(dest => dest.PosX, opt => opt.MapFrom(src => src.PosX))
                .ForMember(dest => dest.PosY, opt => opt.MapFrom(src => src.PosY));

            CreateMap<PositionDm, PositionCm>()
                .ForMember(dest => dest.PosX, opt => opt.MapFrom(src => src.PosX))
                .ForMember(dest => dest.PosY, opt => opt.MapFrom(src => src.PosY));

            CreateMap<PositionDm, PositionAm>()
                .ForMember(dest => dest.PosX, opt => opt.MapFrom(src => src.PosX))
                .ForMember(dest => dest.PosY, opt => opt.MapFrom(src => src.PosY));
        }
    }
}