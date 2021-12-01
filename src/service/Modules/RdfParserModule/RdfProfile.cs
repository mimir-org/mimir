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
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
             .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
             .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
             .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
             .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
             .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => "4590637F39B6BA6F39C74293BE9138DF"))
             .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => NormaliseId(src.MasterProjectIri)))
             .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Terminals))
             .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
             .ForMember(dest => dest.IsRoot, opt => opt.MapFrom(src => src.IsRoot))
             .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
             .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

            CreateMap<ParserEdge, EdgeAm>()
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => NormaliseId(src.FromConnector.Iri)))
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => NormaliseId(src.ToConnector.Iri)))
                .ForMember(dest => dest.FromNodeId, opt => opt.MapFrom(src => NormaliseId(src.FromNode.Iri)))
                .ForMember(dest => dest.ToNodeId, opt => opt.MapFrom(src => NormaliseId(src.ToNode.Iri)))
                .ForMember(dest => dest.Transport, opt => opt.MapFrom(src => src.Transport))
                .ForMember(dest => dest.Interface, opt => opt.MapFrom(src => src.Interface))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => NormaliseId(src.MasterProjectIri)));

            CreateMap<ParserTransport, TransportAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.InputTerminalId, opt => opt.MapFrom(src => NormaliseId(src.InputTerminal.Iri)))
                .ForMember(dest => dest.OutputTerminalId, opt => opt.MapFrom(src => NormaliseId(src.OutputTerminal.Iri)))
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

            CreateMap<ParserConnector, ConnectorAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => NormaliseId(src.Node.Iri)));

            CreateMap<ParserTerminal, TerminalAm>()
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .IncludeBase<ParserConnector, ConnectorAm>();

            CreateMap<ParserRelation, RelationAm>()
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.Relation))
                .IncludeBase<ParserConnector, ConnectorAm>();

            CreateMap<ParserAttribute, AttributeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => NormaliseId(src.NodeIri)))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units));

            CreateMap<ParserUnit, UnitAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<ParserGraph, ProjectAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseId(src.Iri)))
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
            // https://rdf.equinor.com/sor/mimir/ID6163cdb8-dc57-47cb-aaf1-be8c4d29ba77

            id = Regex.Replace(id, @"https:\/\/rdf.equinor.com\/sor\/mimir\/ID(aibel.com_)?", "import.mk_");
            //id = Regex.Replace(id, @"http(s)?:\/\/(www)?", "");
            id = id.Replace("#", "_");
            id = id.Replace("/", "_");
            return id;
        }
    }
}
