using AutoMapper;
using Mb.Core.Models;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class EdgeProfile : Profile
    {
        public EdgeProfile()
        {
            CreateMap<Edge, EdgeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.FromNode, opt => opt.MapFrom(src => src.FromNode))
                .ForMember(dest => dest.ToNode, opt => opt.MapFrom(src => src.ToNode))
                .PreserveReferences();

            CreateMap<EdgeAm, Edge>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.FromNode, opt => opt.MapFrom(src => src.FromNode))
                .ForMember(dest => dest.ToNode, opt => opt.MapFrom(src => src.ToNode))
                .ForMember(dest => dest.Projects, opt => opt.Ignore());
        }
    }
}
