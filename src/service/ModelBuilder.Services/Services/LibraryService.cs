using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Mimirorg.TypeLibrary.Models.Application;

namespace Mb.Services.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IMapper _mapper;

        public LibraryService(IProjectRepository projectRepository, IMapper mapper, ILibraryRepository libraryRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _libraryRepository = libraryRepository;
        }

        /// <summary>
        /// Get all library items based on searchString
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        public async Task<Library> GetLibTypes(string searchString)
        {
            var objectBlocks = await GetNodeTypes(searchString);
            var transports = await GetTransportTypes(searchString);
            var interfaces = await GetInterfaceTypes(searchString);
            var subProjects = await GetSubProjects(searchString);

            var library = new Library
            {
                ObjectBlocks = objectBlocks.ToList(),
                Transports = transports.ToList(),
                Interfaces = interfaces.ToList(),
                SubProjects = subProjects.ToList()
            };

            return library;
        }

        /// <summary>
        /// Get all node types
        /// </summary>
        /// <returns></returns>
        public async Task<List<LibraryNodeItem>> GetNodeTypes(string searchString)
        {
            var nodes = await _libraryRepository.GetNodeTypes();
            if (!string.IsNullOrWhiteSpace(searchString))
                nodes = nodes.Where(x => x.Name != null && x.Name.ToLower().Contains(searchString.ToLower())).ToList();

            return _mapper.Map<List<LibraryNodeItem>>(nodes);
        }

        /// <summary>
        /// Get all transport types
        /// </summary>
        /// <returns></returns>
        public async Task<List<LibraryTransportItem>> GetTransportTypes(string searchString)
        {
            var transports = await _libraryRepository.GetTransportTypes();
            if (!string.IsNullOrWhiteSpace(searchString))
                transports = transports.Where(x => x.Name != null && x.Name.ToLower().Contains(searchString.ToLower())).ToList();

            return _mapper.Map<List<LibraryTransportItem>>(transports);
        }

        /// <summary>
        /// Get all interface types
        /// </summary>
        /// <returns></returns>
        public async Task<List<LibraryInterfaceItem>> GetInterfaceTypes(string searchString)
        {
            var interfaces = await _libraryRepository.GetInterfaceTypes();
            if (!string.IsNullOrWhiteSpace(searchString))
                interfaces = interfaces.Where(x => x.Name != null && x.Name.ToLower().Contains(searchString.ToLower())).ToList();

            return _mapper.Map<List<LibraryInterfaceItem>>(interfaces);
        }

        /// <summary>
        /// Get all sub projects
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<LibrarySubProjectItem>> GetSubProjects(string searchString = null)
        {
            var projects = await _projectRepository.GetAll()
                .Where(x => x.IsSubProject)
                .OrderBy(x => x.Name)
                .ToArrayAsync();

            if (!string.IsNullOrWhiteSpace(searchString))
                projects = projects.Where(x => x.Name.ToLower().Contains(searchString.ToLower())).ToArray();

            var librarySubProjectItems = new List<LibrarySubProjectItem>();

            Parallel.ForEach(projects, x =>
            {
                librarySubProjectItems.Add(_mapper.Map<LibrarySubProjectItem>(x));
            });

            return librarySubProjectItems;
        }

        /// <summary>
        /// Get attribute qualifiers
        /// </summary>
        /// <returns></returns>
        public async Task<List<AttributeQualifier>> GetAttributeQualifiers()
        {
            var data = await _libraryRepository.GetAttributeQualifiers();
            return _mapper.Map<List<AttributeQualifier>>(data);
        }

        /// <summary>
        /// Get attribute sources
        /// </summary>
        /// <returns></returns>
        public async Task<List<AttributeSource>> GetAttributeSources()
        {
            var data = await _libraryRepository.GetAttributeSources();
            return _mapper.Map<List<AttributeSource>>(data);
        }

        /// <summary>
        /// Get attribute formats
        /// </summary>
        /// <returns></returns>
        public async Task<List<AttributeFormat>> GetAttributeFormats()
        {
            var data = await _libraryRepository.GetAttributeFormats();
            return _mapper.Map<List<AttributeFormat>>(data);
        }

        /// <summary>
        /// Get attribute conditions
        /// </summary>
        /// <returns></returns>
        public async Task<List<AttributeCondition>> GetAttributeConditions()
        {
            var data = await _libraryRepository.GetAttributeConditions();
            return _mapper.Map<List<AttributeCondition>>(data);
        }

        /// <summary>
        /// Get purposes
        /// </summary>
        /// <returns></returns>
        public async Task<List<Purpose>> GetPurposes()
        {
            var data = await _libraryRepository.GetPurposes();
            return _mapper.Map<List<Purpose>>(data);
        }

        /// <summary>
        /// Get aspect attributes
        /// </summary>
        /// <returns></returns>
        public async Task<List<LocationTypeAm>> GetAspectAttributes()
        {
            var data = await _libraryRepository.GetAspectAttributes();
            return _mapper.Map<List<LocationTypeAm>>(data);
        }

        /// <summary>
        /// Get units
        /// </summary>
        /// <returns></returns>
        public async Task<List<Unit>> GetUnits()
        {
            var data = await _libraryRepository.GetUnits();
            return _mapper.Map<List<Unit>>(data);
        }

        /// <summary>
        /// Get attribute types
        /// </summary>
        /// <returns></returns>
        public async Task<List<AttributeType>> GetAttributeTypes(Aspect aspect)
        {
            var data = await _libraryRepository.GetAttributes();
            if (aspect != Aspect.NotSet)
                data = data.Where(x => (int) x.Aspect == (int) aspect).ToList();

            return _mapper.Map<List<AttributeType>>(data);
        }

        /// <summary>
        /// Get simple types
        /// </summary>
        /// <returns></returns>
        public async Task<List<SimpleType>> GetSimpleTypes()
        {
            var data = await _libraryRepository.GetSimpleTypes();
            return _mapper.Map<List<SimpleType>>(data);
        }

        /// <summary>
        /// Get predefined attributes
        /// </summary>
        /// <returns></returns>
        public async Task<List<PredefinedAttributeAm>> GetPredefinedAttributes()
        {
            var data = await _libraryRepository.GetPredefinedAttributes();
            return _mapper.Map<List<PredefinedAttributeAm>>(data);
        }

        /// <summary>
        /// Get predefined attributes
        /// </summary>
        /// <returns></returns>
        public async Task<List<BlobDataAm>> GetSymbols()
        {
            var data = await _libraryRepository.GetSymbols();
            return _mapper.Map<List<BlobDataAm>>(data);
        }

        /// <summary>
        /// Convert object to Create Library Type
        /// </summary>
        /// <param name="id"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderNotFoundException"></exception>
        /// <exception cref="ModelBuilderInvalidOperationException"></exception>
        public async Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter)
        {
            switch (filter)
            {
                case LibraryFilter.Node:
                    var nodes = await _libraryRepository.GetNodeTypes();
                    var node = nodes.FirstOrDefault(x => x.Id == id);

                    if (node == null)
                        throw new ModelBuilderNotFoundException($"There is no type with id: {id} and filter: {filter}");
                    return _mapper.Map<CreateLibraryType>(node);

                case LibraryFilter.Interface:
                    var interfaces = await _libraryRepository.GetInterfaceTypes();
                    var interfaceType = interfaces.FirstOrDefault(x => x.Id == id);

                    if (interfaceType == null)
                        throw new ModelBuilderNotFoundException($"There is no type with id: {id} and filter: {filter}");

                    return _mapper.Map<CreateLibraryType>(interfaceType);

                case LibraryFilter.Transport:
                    var transports = await _libraryRepository.GetTransportTypes();
                    var transportType = transports.FirstOrDefault(x => x.Id == id);

                    if (transportType == null)
                        throw new ModelBuilderNotFoundException($"There is no type with id: {id} and filter: {filter}");

                    return _mapper.Map<CreateLibraryType>(transportType);

                default:
                    throw new ModelBuilderInvalidOperationException("Filter type mismatch");
            }
        }

        /// <summary>
        /// Create NodeType
        /// </summary>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryNodeItem> CreateNodeType(CreateLibraryType createLibraryType)
        {
            var data = _mapper.Map<NodeLibAm>(createLibraryType);
            var createdType = await _libraryRepository.CreateNodeType(data);
            var node = _mapper.Map<LibraryNodeItem>(createdType);
            return node;
        }

        /// <summary>
        /// Create a transport type
        /// </summary>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryTransportItem> CreateTransportType(CreateLibraryType createLibraryType)
        {
            var data = _mapper.Map<TransportLibAm>(createLibraryType);
            var createdType = await _libraryRepository.CreateTransportType(data);
            var transport = _mapper.Map<LibraryTransportItem>(createdType);
            return transport;
        }

        /// <summary>
        /// Create an interface type
        /// </summary>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryInterfaceItem> CreateInterfaceType(CreateLibraryType createLibraryType)
        {
            var data = _mapper.Map<InterfaceLibAm>(createLibraryType);
            var createdType = await _libraryRepository.CreateInterfaceType(data);
            var inter = _mapper.Map<LibraryInterfaceItem>(createdType);
            return inter;
        }

        /// <summary>
        /// Update a node type
        /// </summary>
        /// <param name="id"></param>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryNodeItem> UpdateNodeItem(string id, CreateLibraryType createLibraryType)
        {
            var data = _mapper.Map<NodeLibAm>(createLibraryType);
            var createdType = await _libraryRepository.UpdateNodeType(id, data);
            var node = _mapper.Map<LibraryNodeItem>(createdType);
            return node;
        }

        /// <summary>
        /// Update an transport type
        /// </summary>
        /// <param name="id"></param>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryTransportItem> UpdateTransportItem(string id, CreateLibraryType createLibraryType)
        {
            var data = _mapper.Map<TransportLibAm>(createLibraryType);
            var createdType = await _libraryRepository.UpdateTransportType(id, data);
            var transport = _mapper.Map<LibraryTransportItem>(createdType);
            return transport;
        }

        /// <summary>
        /// Update an interface type
        /// </summary>
        /// <param name="id"></param>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryInterfaceItem> UpdateInterfaceItem(string id, CreateLibraryType createLibraryType)
        {
            var data = _mapper.Map<InterfaceLibAm>(createLibraryType);
            var createdType = await _libraryRepository.UpdateInterfaceType(id, data);
            var inter = _mapper.Map<LibraryInterfaceItem>(createdType);
            return inter;
        }

        /// <summary>
        /// Delete type
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteType(string id)
        {
            var types = await GetLibTypes(null);
            var isTransport = types.Transports.Any(x => x.Id == id);
            var isNode = types.ObjectBlocks.Any(x => x.Id == id);
            var isInterface = types.Interfaces.Any(x => x.Id == id);

            if (isTransport)
                await _libraryRepository.DeleteTransport(id);

            if (isNode)
                await _libraryRepository.DeleteNode(id);

            if (isInterface)
                await _libraryRepository.DeleteInterface(id);
        }

        /// <summary>
        /// Get RDS
        /// </summary>
        /// <returns></returns>
        public async Task<ICollection<Rds>> GetRds()
        {
            var rds = await _libraryRepository.GetRds();
            return _mapper.Map<List<Rds>>(rds);
        }

        /// <summary>
        /// Get Terminals
        /// </summary>
        /// <returns></returns>
        public async Task<List<TerminalType>> GetTerminals()
        {
            var terminals = await _libraryRepository.GetTerminalTypes();
            return _mapper.Map<List<TerminalType>>(terminals);
        }

        /// <summary>
        /// Get Terminals by category
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, List<TerminalType>> GetTerminalsByCategory()
        {
            var terminals = GetTerminals().Result;

            return terminals
                .Where(x => !string.IsNullOrEmpty(x.TerminalCategory))
                .AsEnumerable()
                .GroupBy(x => x.TerminalCategory)
                .ToDictionary(g => g.Key, g => g.ToList());
        }
    }
}