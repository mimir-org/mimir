using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.EntityFrameworkCore;
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
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.TerminalTypes)
                    .Include(x => x.Rds)
                    .ThenInclude(y => y.RdsCategory)
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
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.TerminalTypes)
                    .Include(x => x.Rds)
                    .ThenInclude(y => y.RdsCategory)
                    .ToList();
            }

            return ConvertToLibNode(nodeTypes);
        }

        private IEnumerable<LibraryNodeItem> ConvertToLibNode(IEnumerable<NodeType> types)
        {
            foreach (var libraryTypeComponent in types)
            {
                var mappedNode = _mapper.Map<LibraryNodeItem>(libraryTypeComponent);
                
                foreach (var connector in mappedNode.Connectors)
                {
                    
                }

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
