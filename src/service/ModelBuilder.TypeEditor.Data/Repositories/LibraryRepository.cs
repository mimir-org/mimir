using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.TypeEditor.Data.Repositories
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
                    .Include(x => x.Purpose)
                    .AsSplitQuery()
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
                    .Include(x => x.Purpose)
                    .AsSplitQuery()
                    .ToList();
            }

            return _mapper.Map<List<LibraryNodeItem>>(allNodeTypes);
        }

        public IEnumerable<LibraryInterfaceItem> GetInterfaceTypes(string searchString = null)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                var result1 = _interfaceTypeRepository.GetAll()
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.Purpose)
                    .OrderBy(x => x.Name)
                    .AsSplitQuery()
                    .ToList();

                return _mapper.Map<List<LibraryInterfaceItem>>(result1);
            }

            var result2 = _interfaceTypeRepository.GetAll()
                .Where(x => x.Name.ToLower().Contains(searchString.ToLower()))
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .Include(x => x.Purpose)
                .OrderBy(x => x.Name)
                .AsSplitQuery()
                .ToList();

            return _mapper.Map<List<LibraryInterfaceItem>>(result2);
        }

        public IEnumerable<LibraryTransportItem> GetTransportTypes(string searchString = null)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                var result1 = _transportTypeRepository.GetAll()
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.Purpose)
                    .OrderBy(x => x.Name)
                    .AsSplitQuery()
                    .ToList();

                return _mapper.Map<List<LibraryTransportItem>>(result1);
            }

            var result2 = _transportTypeRepository.GetAll()
                .Where(x => x.Name.ToLower().Contains(searchString.ToLower()))
                .Include(x => x.AttributeTypes)
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .Include(x => x.Purpose)
                .OrderBy(x => x.Name)
                .AsSplitQuery()
                .ToList();

            return _mapper.Map<List<LibraryTransportItem>>(result2);
        }

        public async Task<T> GetLibraryItem<T>(string id) where T : class, new()
        {
            if (typeof(LibraryNodeItem).IsAssignableFrom(typeof(T)))
            {
                var nodeType = await _nodeTypeRepository.FindBy(x => x.Id == id)
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
                    .Include(x => x.Purpose)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                return _mapper.Map<T>(nodeType);
            }

            if (typeof(LibraryInterfaceItem).IsAssignableFrom(typeof(T)))
            {
                var interfaceType = await _interfaceTypeRepository.FindBy(x => x.Id == id)
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.Purpose)
                    .OrderBy(x => x.Name)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                return _mapper.Map<T>(interfaceType);
            }

            if (typeof(LibraryTransportItem).IsAssignableFrom(typeof(T)))
            {
                var transportType = await _transportTypeRepository.FindBy(x => x.Id == id)
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.Purpose)
                    .OrderBy(x => x.Name)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                return _mapper.Map<T>(transportType);
            }

            return null;
        }
    }
}
