using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using NodeType = Mb.Models.Data.NodeType;

namespace Mb.Core.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly ILibraryTypeRepository _libraryTypeComponentRepository;
        private readonly IMapper _mapper;
        private readonly ICommonRepository _generateIdRepository;

        public LibraryRepository(ILibraryTypeRepository libraryTypeComponentRepository, IMapper mapper, ICommonRepository generateIdRepository)
        {
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _mapper = mapper;
            _generateIdRepository = generateIdRepository;
        }

        public IEnumerable<LibraryNodeItem> GetAll(string searchString)
        {
            var nodeTypes = new List<NodeType>();

            if (string.IsNullOrEmpty(searchString))
            {
                nodeTypes =_libraryTypeComponentRepository.GetAll()
                    .OfType<NodeType>()
                    .OrderBy(x => x.Name)
                    .Take(30)
                    .Cast<NodeType>()
                    .ToList();
            }
            else
            {
                nodeTypes = _libraryTypeComponentRepository.GetAll()
                    .OfType<NodeType>()
                    .OrderBy(x => x.Name)
                    .Where(x => x.Name.ToLower().Contains(searchString.ToLower()))
                    .Take(30)
                    .Cast<NodeType>()
                    .ToList();
            }

            return ConvertToLibNode(nodeTypes);
        }

        private IEnumerable<LibraryNodeItem> ConvertToLibNode(IEnumerable<NodeType> types)
        {
            foreach (var libraryTypeComponent in types)
            {
                //libraryTypeComponent.CreateFromJsonData(); // TODO: Fix this
                var mappedNode = _mapper.Map<LibraryNodeItem>(libraryTypeComponent);
                
                foreach (var connector in mappedNode.Connectors)
                {
                    connector.Id = _generateIdRepository.CreateUniqueId();
                }

                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.PartOf, ConnectorType.Input, "Part of Relationship"));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.PartOf, ConnectorType.Output, "Part of Relationship"));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.HasLocation, ConnectorType.Input, "Has Location"));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.HasLocation, ConnectorType.Output, "Has Location"));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.FulfilledBy, ConnectorType.Output, "Fulfilled By"));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.FulfilledBy, ConnectorType.Output, "Fulfilled By"));

                yield return mappedNode;
            }
        }

        private Connector CreateRelationConnector(RelationType relationType, ConnectorType connectorType, string name)
        {
            return new Relation
            {
                Id = _generateIdRepository.CreateUniqueId(),
                Name = name,
                Type = connectorType,
                RelationType = relationType,
                NodeId = null,
                Node = null,
                SemanticReference = null
            };
        }
    }
}
