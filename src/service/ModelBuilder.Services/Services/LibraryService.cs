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
            var objectBlocks = await _libraryRepository.GetNodeTypes(searchString);
            var transports = await _libraryRepository.GetTransportTypes(searchString);
            var interfaces = await _libraryRepository.GetInterfaceTypes(searchString);
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
        public async Task<IEnumerable<LibraryNodeItem>> GetNodeTypes()
        {
            return await _libraryRepository.GetNodeTypes();
        }

        /// <summary>
        /// Get all transport types
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<LibraryTransportItem>> GetTransportTypes()
        {
            return await _libraryRepository.GetTransportTypes();
        }

        /// <summary>
        /// Get all interface types
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes()
        {
            return await _libraryRepository.GetInterfaceTypes();

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

        public IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<PredefinedAttributeAm> GetPredefinedAttributes()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<BlobDataAm> GetBlobData()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<EnumBase> GetAllOfType(EnumType enumType)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<LocationTypeAm> GetAllLocationTypes()
        {
            throw new System.NotImplementedException();
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

        public Task<T> UpdateLibraryType<T>(string id, CreateLibraryType createLibraryType, bool updateMajorVersion,
            bool updateMinorVersion) where T : class, new()
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

        public Task<SimpleType> CreateSimpleType(SimpleTypeAm simpleType)
        {
            throw new System.NotImplementedException();
        }

        public Task CreateSimpleTypes(ICollection<SimpleTypeAm> simpleTypes)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<SimpleType> GetSimpleTypes()
        {
            throw new System.NotImplementedException();
        }

        public void ClearAllChangeTracker()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Rds> GetRds()
        {
            throw new System.NotImplementedException();
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