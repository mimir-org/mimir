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
            CreateMap<PositionRequest, Position>()
                .ForMember(dest => dest.PosX, opt => opt.MapFrom(src => src.PosX))
                .ForMember(dest => dest.PosY, opt => opt.MapFrom(src => src.PosY));

            CreateMap<Position, PositionResponse>()
                .ForMember(dest => dest.PosX, opt => opt.MapFrom(src => src.PosX))
                .ForMember(dest => dest.PosY, opt => opt.MapFrom(src => src.PosY));

            CreateMap<Position, PositionRequest>()
                .ForMember(dest => dest.PosX, opt => opt.MapFrom(src => src.PosX))
                .ForMember(dest => dest.PosY, opt => opt.MapFrom(src => src.PosY));
        }
    }
}