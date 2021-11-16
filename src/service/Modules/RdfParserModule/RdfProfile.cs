using System.Collections.Generic;
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
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => "4590637F39B6BA6F39C74293BE9138DF"))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => NormaliseID(src.MasterProjectId)))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Terminals))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.IsRoot, opt => opt.MapFrom(src => src.IsRoot))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => new List<AttributeAm>()));

            CreateMap<ParserEdge, EdgeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseID(src.Id)))
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => NormaliseID(src.FromConnectorId)))
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => NormaliseID(src.ToConnectorId)))
                .ForMember(dest => dest.FromNodeId, opt => opt.MapFrom(src => NormaliseID(src.FromNodeId)))
                .ForMember(dest => dest.ToNodeId, opt => opt.MapFrom(src => NormaliseID(src.ToNodeId)))
                .ForMember(dest => dest.Transport, opt => opt.MapFrom(src => src.Transport))
                .ForMember(dest => dest.Interface, opt => opt.MapFrom(src => src.Interface))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => NormaliseID(src.MasterProjectId)));

            CreateMap<ParserTransport, TransportAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseID(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.InputTerminalId, opt => opt.MapFrom(src => NormaliseID(src.InputTerminalId)))
                .ForMember(dest => dest.OutputTerminalId, opt => opt.MapFrom(src => NormaliseID(src.OutputTerminalId)))
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => new List<AttributeAm>()));

            CreateMap<ParserConnector, ConnectorAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseID(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Visible, opt => opt.MapFrom(src => src.Visible))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => NormaliseID(src.Node.Id)));

            CreateMap<ParserTerminal, TerminalAm>()
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .IncludeBase<ParserConnector, ConnectorAm>();

            CreateMap<ParserRelation, RelationAm>()
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.Relation))
                .IncludeBase<ParserConnector, ConnectorAm>(); ;

            CreateMap<ParserGraph, ProjectAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => NormaliseID(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsSubProject, opt => opt.MapFrom(src => src.IsSubProject))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Nodes, opt => opt.MapFrom(src => src.Nodes))
                .ForMember(dest => dest.Edges, opt => opt.MapFrom(src => src.Edges));

        }

        public string NormaliseID(string id)
        {
            id = Regex.Replace(id, @"http(s)?:\/\/(www)?", "");
            id = id.Replace("#", "");
            id = id.Replace("/", "_");
            return id;
        }
    }
}
