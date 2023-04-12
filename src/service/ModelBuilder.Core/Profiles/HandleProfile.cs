using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class HandleProfile : Profile
    {
        public HandleProfile()
        {
            CreateMap<HandleAm, HandleDm>()
                .ForMember(dest => dest.PositionTree, opt => opt.MapFrom(src => src.PositionTree))
                .ForMember(dest => dest.PositionBlock, opt => opt.MapFrom(src => src.PositionBlock));

            CreateMap<HandleDm, HandleCm>()
                .ForMember(dest => dest.PositionTree, opt => opt.MapFrom(src => src.PositionTree))
                .ForMember(dest => dest.PositionBlock, opt => opt.MapFrom(src => src.PositionBlock));

            CreateMap<HandleDm, HandleAm>()
                .ForMember(dest => dest.PositionTree, opt => opt.MapFrom(src => src.PositionTree))
                .ForMember(dest => dest.PositionBlock, opt => opt.MapFrom(src => src.PositionBlock));
        }
    }
}