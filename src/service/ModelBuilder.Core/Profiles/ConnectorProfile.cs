using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ConnectorProfile : Profile
    {
        public ConnectorProfile()
        {
            CreateMap<ConnectorAm, Connector>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
                .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
                .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject));

            CreateMap<ConnectorTerminalAm, ConnectorTerminal>()
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .IncludeBase<ConnectorAm, Connector>();

            CreateMap<RelationAm, ConnectorRelation>()
                .IncludeBase<ConnectorAm, Connector>();

            CreateMap<Connector, ConnectorAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
                .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
                .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject));

            CreateMap<ConnectorTerminal, ConnectorTerminalAm>()
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .IncludeBase<Connector, ConnectorAm>();

            CreateMap<ConnectorRelation, RelationAm>()
                .IncludeBase<Connector, ConnectorAm>();
        }
    }
}