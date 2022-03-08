/*using System.Collections.Generic;
using System.Text.RegularExpressions;
using AutoMapper;
using Mb.Models.Application;

namespace RdfParserModule
{
    public class RdfProfile : Profile
    {
        public RdfProfile()
        {
            CreateMap<ParserNode, NodeAm>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => "4590637F39B6BA6F39C74293BE9138DF"))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Terminals))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.IsRoot, opt => opt.MapFrom(src => src.IsRoot))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

            CreateMap<ParserEdge, EdgeAm>()
                .ForMember(dest => dest.FromConnectorIri, opt => opt.MapFrom(src => src.FromConnector.Iri))
                .ForMember(dest => dest.ToConnectorIri, opt => opt.MapFrom(src => src.ToConnector.Iri))
                .ForMember(dest => dest.FromNodeIri, opt => opt.MapFrom(src => src.FromNode.Iri))
                .ForMember(dest => dest.ToNodeIri, opt => opt.MapFrom(src => src.ToNode.Iri))
                .ForMember(dest => dest.FromConnectorDomain, opt => opt.MapFrom(src => src.FromConnector.Domain))
                .ForMember(dest => dest.ToConnectorDomain, opt => opt.MapFrom(src => src.ToConnector.Domain))
                .ForMember(dest => dest.FromNodeDomain, opt => opt.MapFrom(src => src.FromNode.Domain))
                .ForMember(dest => dest.ToNodeDomain, opt => opt.MapFrom(src => src.ToNode.Domain))
                .ForMember(dest => dest.Transport, opt => opt.MapFrom(src => src.Transport))
                .ForMember(dest => dest.Interface, opt => opt.MapFrom(src => src.Interface))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri));

            CreateMap<ParserTransport, TransportAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.InputTerminalIri, opt => opt.MapFrom(src => src.InputTerminal.Iri))
                .ForMember(dest => dest.OutputTerminalIri, opt => opt.MapFrom(src => src.OutputTerminal.Iri))
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

            CreateMap<ParserConnector, ConnectorAm>()
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.Node.Iri))
                .ForMember(dest => dest.NodeDomain, opt => opt.MapFrom(src => src.Node.Domain));

            CreateMap<ParserTerminal, TerminalAm>()
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .IncludeBase<ParserConnector, ConnectorAm>();

            CreateMap<ParserRelation, RelationAm>()
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.Relation))
                .IncludeBase<ParserConnector, ConnectorAm>();

            CreateMap<ParserAttribute, AttributeAm>()
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.Node.Iri))
                .ForMember(dest => dest.NodeDomain, opt => opt.MapFrom(src => src.Node.Domain))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units));

            CreateMap<ParserUnit, UnitAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<ParserGraph, ProjectAm>()
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsSubProject, opt => opt.MapFrom(src => src.IsSubProject))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Nodes, opt => opt.MapFrom(src => src.Nodes))
                .ForMember(dest => dest.Edges, opt => opt.MapFrom(src => src.Edges))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain));
        }

        public string NormaliseId(string id)
        {
            id = Regex.Replace(id, @"http(s)?:\/\/(www)?", "");
            id = id.Replace("#", "");
            id = id.Replace("/", "_");
            return id;
        }
    }
}*/