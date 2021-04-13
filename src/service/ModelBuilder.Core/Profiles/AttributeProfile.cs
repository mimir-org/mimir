using AutoMapper;
using Mb.Core.Models;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class AttributeProfile : Profile
    {
        public AttributeProfile()
        {
            CreateMap<AttributeAm, Attribute>()
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.Node, opt => opt.Ignore());

            CreateMap<Attribute, AttributeAm>()
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .PreserveReferences();

        }
    }
}
