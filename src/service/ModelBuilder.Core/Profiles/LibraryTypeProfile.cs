using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using NodeType = Mb.Models.Data.NodeType;

namespace Mb.Core.Profiles
{
    public class LibraryTypeProfile : Profile
    {
        public LibraryTypeProfile(ICommonRepository commonRepository)
        {
            CreateMap<CreateLibraryType, NodeType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.TerminalTypes, opt => opt.MapFrom(src => CreateTerminalTypes(src.TerminalTypes.ToList(), $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()).ToList()))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()));

            CreateMap<CreateLibraryType, TransportType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()));

            CreateMap<CreateLibraryType, InterfaceType>()
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId));

            CreateMap<NodeType, LibraryNodeItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds.Code))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Rds.RdsCategory.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.AttributeTypes))
                .AfterMap((src, dest, context) =>
                {
                    dest.Connectors = CreateConnectors(src.TerminalTypes, context);
                });
                //.ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => CreateConnectors(src.TerminalTypes)));
        }

        private List<Connector> CreateConnectors(ICollection<NodeTypeTerminalType> terminalTypes, ResolutionContext context)
        {
            var connectors = new List<Connector>();
            connectors.Add(CreateRelationConnector(RelationType.PartOf, ConnectorType.Input, "Part of Relationship"));
            connectors.Add(CreateRelationConnector(RelationType.PartOf, ConnectorType.Output, "Part of Relationship"));
            connectors.Add(CreateRelationConnector(RelationType.HasLocation, ConnectorType.Input, "Has Location"));
            connectors.Add(CreateRelationConnector(RelationType.HasLocation, ConnectorType.Output, "Has Location"));
            connectors.Add(CreateRelationConnector(RelationType.FulfilledBy, ConnectorType.Output, "Fulfilled By"));
            connectors.Add(CreateRelationConnector(RelationType.FulfilledBy, ConnectorType.Output, "Fulfilled By"));

            if (terminalTypes == null) 
                return connectors;
            
            foreach (var nodeTypeTerminalType in terminalTypes)
            {
                if(nodeTypeTerminalType.Number <= 0)
                    continue;

                for (var i = 0; i < nodeTypeTerminalType.Number; i++)
                {
                    var terminal = context.Mapper.Map<Terminal>(nodeTypeTerminalType.TerminalType);
                    terminal.Type = nodeTypeTerminalType.ConnectorType;
                    connectors.Add(terminal);
                }
            }

            return connectors;
        }

        private static Connector CreateRelationConnector(RelationType relationType, ConnectorType connectorType, string name)
        {
            return new Relation
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Type = connectorType,
                RelationType = relationType,
                NodeId = null,
                Node = null,
                SemanticReference = null
            };
        }

        private static IEnumerable<NodeTypeTerminalType> CreateTerminalTypes(IReadOnlyCollection<TerminalTypeItem> terminalTypes, string nodeId)
        {
            if (terminalTypes == null || !terminalTypes.Any())
                yield break;

            foreach (var item in terminalTypes)
            {
                yield return new NodeTypeTerminalType
                {
                    Id = item.Key.CreateMd5(),
                    NodeTypeId = nodeId,
                    TerminalTypeId = item.TerminalTypeId,
                    Number = item.Number,
                    ConnectorType = item.ConnectorType
                };
            }
        }

        private static IEnumerable<AttributeType> CreateAttributeTypes(IReadOnlyCollection<string> attributeTypes)
        {
            if (attributeTypes == null || !attributeTypes.Any())
                yield break;

            foreach (var item in attributeTypes)
                yield return new AttributeType
                {
                    Id = item
                };
        }
    }
}
