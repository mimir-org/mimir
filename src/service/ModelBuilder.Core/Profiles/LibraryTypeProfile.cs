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
                .ForMember(dest => dest.LocationType, opt => opt.MapFrom(src => src.LocationType))
                .ForMember(dest => dest.SymbolId, opt => opt.MapFrom(src => src.SymbolId))
                .ForMember(dest => dest.TerminalTypes, opt => opt.MapFrom(src => CreateTerminalTypes(src.TerminalTypes.ToList(), $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()).ToList()))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()))
                .AfterMap((_, dest, _) =>
                {
                    dest.ResolvePredefinedAttributeData();
                });

            CreateMap<CreateLibraryType, TransportType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()));

            CreateMap<CreateLibraryType, InterfaceType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId));

            CreateMap<NodeType, CreateLibraryType>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.ObjectType, opt => opt.MapFrom(src => ObjectType.ObjectBlock))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypes, opt => opt.MapFrom(src => src.TerminalTypes))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => src.AttributeTypes.Select(x => x.Id)))
                .ForMember(dest => dest.LocationType, opt => opt.MapFrom(src => src.LocationType))
                .ForMember(dest => dest.SymbolId, opt => opt.MapFrom(src => src.SymbolId))
                .ForMember(dest => dest.PredefinedAttributes, opt => opt.MapFrom(src => src.PredefinedAttributes))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.Ignore())
                .BeforeMap((src, _, _) =>
                {
                    src.ResolvePredefinedAttributes();
                });

            CreateMap<TransportType, CreateLibraryType>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.ObjectType, opt => opt.MapFrom(src => ObjectType.ObjectBlock))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypes, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => src.AttributeTypes.Select(x => x.Id)))
                .ForMember(dest => dest.LocationType, opt => opt.Ignore())
                .ForMember(dest => dest.SymbolId, opt => opt.Ignore())
                .ForMember(dest => dest.PredefinedAttributes, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId));

            CreateMap<InterfaceType, CreateLibraryType>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.ObjectType, opt => opt.MapFrom(src => ObjectType.ObjectBlock))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypes, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeTypes, opt => opt.Ignore())
                .ForMember(dest => dest.LocationType, opt => opt.Ignore())
                .ForMember(dest => dest.SymbolId, opt => opt.Ignore())
                .ForMember(dest => dest.PredefinedAttributes, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId));

            CreateMap<NodeTypeTerminalType, TerminalTypeItem>()
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Number))
                .ForMember(dest => dest.ConnectorType, opt => opt.MapFrom(src => src.ConnectorType));

            CreateMap<NodeType, LibraryNodeItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds.Code))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Rds.RdsCategory.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.AttributeTypes))
                .ForMember(dest => dest.SymbolId, opt => opt.MapFrom(src => src.SymbolId))
                .AfterMap((src, dest, context) =>
                {
                    dest.Connectors = CreateConnectors(src.TerminalTypes, context);
                });

            CreateMap<TransportType, LibraryTransportItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds.Code))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Rds.RdsCategory.Name))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.TerminalId, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.AttributeTypes));
            
            CreateMap<InterfaceType, LibraryInterfaceItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds.Code))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Rds.RdsCategory.Name))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.TerminalId, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId));
        }

        private List<Connector> CreateConnectors(ICollection<NodeTypeTerminalType> terminalTypes, ResolutionContext context)
        {
            var connectors = new List<Connector>
            {
                CreateRelationConnector(RelationType.PartOf, ConnectorType.Input, "Part of Relationship"),
                CreateRelationConnector(RelationType.PartOf, ConnectorType.Output, "Part of Relationship"),
                CreateRelationConnector(RelationType.HasLocation, ConnectorType.Input, "Has Location"),
                CreateRelationConnector(RelationType.HasLocation, ConnectorType.Output, "Has Location"),
                CreateRelationConnector(RelationType.FulfilledBy, ConnectorType.Output, "Fulfilled By"),
                CreateRelationConnector(RelationType.FulfilledBy, ConnectorType.Output, "Fulfilled By")
            };

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

            var sortedTerminalTypes = new List<TerminalTypeItem>();

            foreach (var item in terminalTypes)
            {
                var existingSortedTerminalType = sortedTerminalTypes.FirstOrDefault(x => x.TerminalTypeId == item.TerminalTypeId && x.ConnectorType == item.ConnectorType);
                if (existingSortedTerminalType == null)
                {
                    sortedTerminalTypes.Add(item);
                }
                else
                {
                    existingSortedTerminalType.Number += item.Number;
                }
            }

            foreach (var item in sortedTerminalTypes)
            {
                var key = $"{item.Key}-{nodeId}"; 
                yield return new NodeTypeTerminalType
                {
                    Id = key.CreateMd5(),
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
