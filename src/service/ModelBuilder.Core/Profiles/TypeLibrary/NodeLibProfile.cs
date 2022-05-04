using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class NodeLibProfile : Profile
    {
        public NodeLibProfile()
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
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => new Purpose { Id = null, Name = src.PurposeName })) // TODO: Fix id and discipline
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .AfterMap((src, dest, context) =>
                {
                    dest.Connectors = Task.Run(() => CreateConnectors(src.NodeTerminals, context)).Result;
                });
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
                        terminal.Type = (ConnectorType) nodeTypeTerminalType.ConnectorDirection;
                        connectors.Add(terminal);
                    });
                }
            });

            return connectors;
        }
    }
}