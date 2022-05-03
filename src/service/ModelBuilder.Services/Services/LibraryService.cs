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
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<AttributeQualifier>> GetAttributeQualifiers()
        {
            var data = await _libraryRepository.GetAttributeQualifiers();
            return _mapper.Map<List<AttributeQualifier>>(data);
        }

        public async Task<List<AttributeSource>> GetAttributeSources()
        {
            var data = await _libraryRepository.GetAttributeSources();
            return _mapper.Map<List<AttributeSource>>(data);
        }

        public async Task<List<AttributeFormat>> GetAttributeFormats()
        {
            var data = await _libraryRepository.GetAttributeFormats();
            return _mapper.Map<List<AttributeFormat>>(data);
        }

        public async Task<List<AttributeCondition>> GetAttributeConditions()
        {
            var data = await _libraryRepository.GetAttributeConditions();
            return _mapper.Map<List<AttributeCondition>>(data);
        }

        public async Task<List<Purpose>> GetPurposes()
        {
            var data = await _libraryRepository.GetPurposes();
            return _mapper.Map<List<Purpose>>(data);
        }

        public async Task<List<LocationTypeAm>> GetAspectAttributes()
        {
            var data = await _libraryRepository.GetAspectAttributes();
            return _mapper.Map<List<LocationTypeAm>>(data);
        }

        public async Task<List<Unit>> GetUnits()
        {
            var data = await _libraryRepository.GetUnits();
            return _mapper.Map<List<Unit>>(data);
        }

        public async Task<List<AttributeType>> GetAttributeTypes(Aspect aspect)
        {
            var data = await _libraryRepository.GetAttributes();
            if (aspect != Aspect.NotSet)
                data = data.Where(x => (int) x.Aspect == (int) aspect).ToList();

            return _mapper.Map<List<AttributeType>>(data);
        }

        public async Task<List<SimpleType>> GetSimpleTypes()
        {
            var data = await _libraryRepository.GetSimpleTypes();
            return _mapper.Map<List<SimpleType>>(data);
        }

        public async Task<List<PredefinedAttributeAm>> GetPredefinedAttributes()
        {
            var data = await _libraryRepository.GetPredefinedAttributes();
            return _mapper.Map<List<PredefinedAttributeAm>>(data);
        }

        public async Task<List<BlobDataAm>> GetBlobData()
        {
            var data = await _libraryRepository.GetBlobData();
            return _mapper.Map<List<BlobDataAm>>(data);
        }

        public Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<CreateLibraryType> GetAllTypes()
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<LibraryType>> CreateLibraryTypes(ICollection<CreateLibraryType> createLibraryTypes)
        {
            throw new System.NotImplementedException();
        }

        public Task<T> CreateLibraryType<T>(CreateLibraryType createLibraryType) where T : class, new()
        {
            throw new System.NotImplementedException();
        }

        public Task<T> UpdateLibraryType<T>(string id, CreateLibraryType createLibraryType, bool updateMajorVersion, bool updateMinorVersion) where T : class, new()
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteType(string id)
        {
            throw new System.NotImplementedException();
        }

        public Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ICollection<Rds>> GetRds()
        {
            var rds = await _libraryRepository.GetRds();
            return rds.ToList();
        }

        public IEnumerable<TerminalType> GetTerminals()
        {
            throw new System.NotImplementedException();
        }

        public Dictionary<string, List<TerminalType>> GetTerminalsByCategory()
        {
            throw new System.NotImplementedException();
        }
    }
}