using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;

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

        public IEnumerable<LibNode> GetAll(string searchString)
        {
            var libraryTypeComponents = string.IsNullOrEmpty(searchString) ? 
                _libraryTypeComponentRepository.GetAll().OrderBy(x => x.Name).Take(30).ToList() : 
                _libraryTypeComponentRepository.GetAll().OrderBy(x => x.Name).Where(x => x.Name.ToLower().Contains(searchString.ToLower())).Take(30).ToList();

            return ConvertToLibNode(libraryTypeComponents);
        }

        private IEnumerable<LibNode> ConvertToLibNode(IEnumerable<LibraryType> types)
        {
            foreach (var libraryTypeComponent in types)
            {
                //libraryTypeComponent.CreateFromJsonData(); // TODO: Fix this
                var mappedNode = _mapper.Map<LibNode>(libraryTypeComponent);
                
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
