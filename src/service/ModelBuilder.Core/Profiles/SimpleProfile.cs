using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class SimpleProfile : Profile
    {
        public SimpleProfile()
        {
            CreateMap<SimpleAm, Simple>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.Node, opt => opt.Ignore());

            CreateMap<Simple, SimpleAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId));
        }        
    }
}