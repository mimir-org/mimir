using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using NodeType = Mb.Models.Data.NodeType;

namespace Mb.Core.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly ILibraryTypeRepository _libraryTypeComponentRepository;
        private readonly IMapper _mapper;

        public LibraryRepository(ILibraryTypeRepository libraryTypeComponentRepository, IMapper mapper)
        {
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _mapper = mapper;
        }

        public IEnumerable<LibraryNodeItem> GetAll(string searchString)
        {
            List<NodeType> nodeTypes;

            if (string.IsNullOrEmpty(searchString))
            {
                nodeTypes = _libraryTypeComponentRepository.GetAll()
                    .OfType<NodeType>()
                    .OrderBy(x => x.Name)
                    .Take(30)
                    .Cast<NodeType>()
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.TerminalTypes)
                    .Include("TerminalTypes.TerminalType")
                    .Include("TerminalTypes.TerminalType.TerminalCategory")
                    .Include("TerminalTypes.TerminalType.Attributes")
                    .Include(x => x.Rds)
                    .ThenInclude(y => y.RdsCategory)
                    .AsSplitQuery()
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
                    .Include("TerminalTypes.TerminalType")
                    .Include("TerminalTypes.TerminalType.TerminalCategory")
                    .Include("TerminalTypes.TerminalType.Attributes")
                    .Include(x => x.Rds)
                    .ThenInclude(y => y.RdsCategory)
                    .AsSplitQuery()
                    .ToList();
            }

            foreach (var mappedNode in nodeTypes.Select(libraryTypeComponent => _mapper.Map<LibraryNodeItem>(libraryTypeComponent)))
            {
                yield return mappedNode;
            }
        }
    }
}
