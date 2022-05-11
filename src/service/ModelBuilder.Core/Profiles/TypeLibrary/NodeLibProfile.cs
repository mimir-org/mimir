using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mimirorg.TypeLibrary.Models.Application;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class NodeLibProfile : Profile
    {
        public NodeLibProfile(ICommonRepository commonRepository)
        {
            CreateMap<NodeLibCm, LibraryNodeItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsCode))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.StatusId, opt => opt.Ignore())
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.SymbolId, opt => opt.MapFrom(src => src.Symbol))
                .ForMember(dest => dest.Simples, opt => opt.MapFrom(src => src.Simples))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => new Purpose { Id = src.PurposeName, Name = src.PurposeName }))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .AfterMap((src, dest, context) =>
                {
                    dest.Connectors = Task.Run(() => CreateConnectors(src.NodeTerminals, context)).Result;
                });

            CreateMap<NodeLibCm, CreateLibraryType>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => commonRepository.GetDomain()))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.ObjectType, opt => opt.MapFrom(src => ObjectType.ObjectBlock))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => !string.IsNullOrWhiteSpace(src.RdsCode) && !string.IsNullOrWhiteSpace(src.Name) ? $"{src.RdsCode.Trim()}#{src.RdsName.Trim()}" : null))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.PurposeName))
                .ForMember(dest => dest.TerminalTypes, opt => opt.MapFrom(src => src.NodeTerminals))
                .ForMember(dest => dest.SymbolId, opt => opt.MapFrom(src => src.Symbol))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => src.Attributes != null ? src.Attributes.Select(x => x.Id).ToList() : new List<string>()))
                .ForMember(dest => dest.PredefinedAttributes, opt => opt.MapFrom(src => src.SelectedAttributePredefined))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.Ignore())
                .ForMember(dest => dest.SimpleTypes, opt => opt.MapFrom(src => src.Simples != null ? src.Simples.Select(x => x.Id).ToList() : new List<string>()))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));

            CreateMap<TransportLibCm, CreateLibraryType>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => commonRepository.GetDomain()))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.ObjectType, opt => opt.MapFrom(src => ObjectType.Transport))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => !string.IsNullOrWhiteSpace(src.RdsCode) && !string.IsNullOrWhiteSpace(src.Name) ? $"{src.RdsCode.Trim()}#{src.RdsName.Trim()}" : null))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.PurposeName))
                .ForMember(dest => dest.TerminalTypes, opt => opt.Ignore())
                .ForMember(dest => dest.SymbolId, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => src.Attributes != null ? src.Attributes.Select(x => x.Id).ToList() : new List<string>()))
                .ForMember(dest => dest.PredefinedAttributes, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(x => x.TerminalId))
                .ForMember(dest => dest.SimpleTypes, opt => opt.Ignore())
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));

            CreateMap<InterfaceLibCm, CreateLibraryType>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => commonRepository.GetDomain()))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.ObjectType, opt => opt.MapFrom(src => ObjectType.Interface))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => !string.IsNullOrWhiteSpace(src.RdsCode) && !string.IsNullOrWhiteSpace(src.Name) ? $"{src.RdsCode.Trim()}#{src.RdsName.Trim()}" : null))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.PurposeName))
                .ForMember(dest => dest.TerminalTypes, opt => opt.Ignore())
                .ForMember(dest => dest.SymbolId, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => src.Attributes != null ? src.Attributes.Select(x => x.Id).ToList() : new List<string>()))
                .ForMember(dest => dest.PredefinedAttributes, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(x => x.TerminalId))
                .ForMember(dest => dest.SimpleTypes, opt => opt.Ignore())
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));

            CreateMap<CreateLibraryType, NodeLibAm>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.RdsName, opt => opt.MapFrom(src => SplitRds(src, true)))
                .ForMember(dest => dest.RdsCode, opt => opt.MapFrom(src => SplitRds(src, false)))
                .ForMember(dest => dest.PurposeName, opt => opt.MapFrom(src => src.Purpose))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.CompanyId, opt => opt.Ignore()) // TODO: We need to resolve company id
                .ForMember(dest => dest.SimpleIdList, opt => opt.MapFrom(src => src.SimpleTypes))
                .ForMember(dest => dest.AttributeIdList, opt => opt.MapFrom(src => src.AttributeTypes))
                .ForMember(dest => dest.NodeTerminals, opt => opt.MapFrom(src => src.TerminalTypes))
                .ForMember(dest => dest.SelectedAttributePredefined, opt => opt.MapFrom(src => src.PredefinedAttributes))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.SymbolId))
                .ForMember(dest => dest.AttributeAspectIri, opt => opt.MapFrom(src => src.LocationType))
                .ForMember(dest => dest.Version, opt => opt.Ignore())
                .ForMember(dest => dest.ParentId, opt => opt.Ignore());
        }

        private string SplitRds(CreateLibraryType createLibraryType, bool isName)
        {
            if (createLibraryType?.RdsId == null)
                return null;

            var split = createLibraryType.RdsId.Split("#");
            if (split.Length != 2)
                return null;

            return isName ? split[1] : split[0];
        }

        private async Task<List<Connector>> CreateConnectors(ICollection<NodeTerminalLibCm> nodeTypeTerminalTypes, ResolutionContext context)
        {
            //Run these in 6 parallel threads
            var partOfInput = RelationType.PartOf.CreateRelationConnector(ConnectorType.Input);
            var partOfOutput = RelationType.PartOf.CreateRelationConnector(ConnectorType.Output);
            var hasLocationInput = RelationType.HasLocation.CreateRelationConnector(ConnectorType.Input);
            var hasLocationOutput = RelationType.HasLocation.CreateRelationConnector(ConnectorType.Output);
            var fulfilledByInput = RelationType.FulfilledBy.CreateRelationConnector(ConnectorType.Input);
            var fulfilledByOutput = RelationType.FulfilledBy.CreateRelationConnector(ConnectorType.Output);

            //Wait for all threads to finish
            await Task.WhenAll(partOfInput, partOfOutput, hasLocationInput, hasLocationOutput, fulfilledByInput,
                fulfilledByOutput);

            var connectors = new List<Connector>
            {
                await partOfInput,
                await partOfOutput,
                await hasLocationInput,
                await hasLocationOutput,
                await fulfilledByInput,
                await fulfilledByOutput
            };

            if (nodeTypeTerminalTypes == null)
                return connectors;

            Parallel.ForEach(nodeTypeTerminalTypes, nodeTypeTerminalType =>
            {
                if (nodeTypeTerminalType.Number > 0)
                {
                    Parallel.For(0, nodeTypeTerminalType.Number, _ =>
                    {
                        var terminal = context.Mapper.Map<Terminal>(nodeTypeTerminalType.Terminal);
                        terminal.Type = (ConnectorType) (int) nodeTypeTerminalType.ConnectorDirection;
                        connectors.Add(terminal);
                    });
                }
            });

            return connectors;
        }
    }
}