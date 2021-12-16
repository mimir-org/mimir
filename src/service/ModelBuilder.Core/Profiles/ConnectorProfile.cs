﻿using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ConnectorProfile : Profile
    {
        public ConnectorProfile(ICommonRepository commonRepository)
        {
            CreateMap<ConnectorAm, Connector>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.IsRequired, opt => opt.MapFrom(src => src.IsRequired));

            CreateMap<TerminalAm, Terminal>()
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .IncludeBase<ConnectorAm, Connector>();

            CreateMap<RelationAm, Relation>()
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.RelationType))
                .IncludeBase<ConnectorAm, Connector>();

            CreateMap<ConnectorAm, RelationAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.IsRequired, opt => opt.MapFrom(src => src.IsRequired))
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.RelationType));

            CreateMap<ConnectorAm, TerminalAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.IsRequired, opt => opt.MapFrom(src => src.IsRequired))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

            CreateMap<Connector, ConnectorAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.IsRequired, opt => opt.MapFrom(src => src.IsRequired));

            CreateMap<Terminal, TerminalAm>()
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .IncludeBase<Connector, ConnectorAm>();

            CreateMap<Relation, RelationAm>()
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.RelationType))
                .IncludeBase<Connector, ConnectorAm>();
        }
    }
}
