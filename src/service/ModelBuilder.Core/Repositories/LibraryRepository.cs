using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly ITransportTypeRepository _transportTypeRepository;
        private readonly IInterfaceTypeRepository _interfaceTypeRepository;
        private readonly INodeTypeRepository _nodeTypeRepository;
        private readonly IMapper _mapper;

        public LibraryRepository(IMapper mapper, ITransportTypeRepository transportTypeRepository, IInterfaceTypeRepository interfaceTypeRepository, INodeTypeRepository nodeTypeRepository)
        {
            _mapper = mapper;
            _transportTypeRepository = transportTypeRepository;
            _interfaceTypeRepository = interfaceTypeRepository;
            _nodeTypeRepository = nodeTypeRepository;
        }

        public IEnumerable<LibraryNodeItem> GetNodeTypes(string searchString = null)
        {
            List<NodeType> allNodeTypes;

            if (string.IsNullOrEmpty(searchString))
            {
                allNodeTypes = _nodeTypeRepository.GetAll()
                    .Include(x => x.AttributeTypes)
                    .Include("AttributeTypes.Units")
                    .Include(x => x.TerminalTypes)
                    .Include("TerminalTypes.TerminalType")
                    .Include("TerminalTypes.TerminalType.TerminalCategory")
                    .Include("TerminalTypes.TerminalType.Attributes")
                    .Include("TerminalTypes.TerminalType.Attributes.Units")
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.CompositeTypes)
                    .Include("CompositeTypes.AttributeTypes")
                    .Include("CompositeTypes.AttributeTypes.Units")
                    .ToList();
            }
            else
            {
                allNodeTypes = _nodeTypeRepository.GetAll()
                    .Where(x => x.Name.ToLower().Contains(searchString.ToLower()))
                    .Include(x => x.AttributeTypes)
                    .Include("AttributeTypes.Units")
                    .Include(x => x.TerminalTypes)
                    .Include("TerminalTypes.TerminalType")
                    .Include("TerminalTypes.TerminalType.TerminalCategory")
                    .Include("TerminalTypes.TerminalType.Attributes")
                    .Include("TerminalTypes.TerminalType.Attributes.Units")
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.CompositeTypes)
                    .Include("CompositeTypes.AttributeTypes")
                    .Include("CompositeTypes.AttributeTypes.Units")
                    .ToList();
            }

            foreach (var nodeType in allNodeTypes)
            {
                yield return _mapper.Map<LibraryNodeItem>(nodeType);
            }
        }

        public IEnumerable<LibraryInterfaceItem> GetInterfaceTypes(string searchString = null)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                return _interfaceTypeRepository.GetAll()
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .ProjectTo<LibraryInterfaceItem>(_mapper.ConfigurationProvider)
                    .OrderBy(x => x.Name)
                    .ToList();
            }

            return _interfaceTypeRepository.GetAll()
                .Where(x => x.Name.ToLower().Contains(searchString.ToLower()))
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .ProjectTo<LibraryInterfaceItem>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Name)
                .ToList();
        }

        public IEnumerable<LibraryTransportItem> GetTransportTypes(string searchString = null)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                return _transportTypeRepository.GetAll()
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .ProjectTo<LibraryTransportItem>(_mapper.ConfigurationProvider)
                    .OrderBy(x => x.Name)
                    .ToList();
            }

            return _transportTypeRepository.GetAll()
                .Where(x => x.Name.ToLower().Contains(searchString.ToLower()))
                .Include(x => x.AttributeTypes)
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .ProjectTo<LibraryTransportItem>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Name)
                .ToList();
        }
    }
}
