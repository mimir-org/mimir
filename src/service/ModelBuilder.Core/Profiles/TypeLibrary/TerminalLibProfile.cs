using AutoMapper;
using Mb.Models.Data;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class TerminalLibProfile : Profile
    {
        public TerminalLibProfile()
        {
            CreateMap<TerminalLibCm, TerminalType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.ParentName))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.NodeTypes, opt => opt.Ignore())
                .ForMember(dest => dest.InterfaceTypes, opt => opt.Ignore())
                .ForMember(dest => dest.TransportTypes, opt => opt.Ignore());

            CreateMap<TerminalLibCm, Terminal>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Iri, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(dest => dest.ConnectorVisibility, opt => opt.MapFrom(src => ConnectorVisibility.None))
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.NodeIri, opt => opt.Ignore())
                .ForMember(dest => dest.IsRequired, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.ParentName))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.TerminalTypeIri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));
        }
    }
}