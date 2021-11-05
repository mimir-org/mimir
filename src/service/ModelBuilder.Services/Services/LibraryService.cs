using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Services.Contracts;
using Mb.TypeEditor.Data.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.Services.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly ILibraryRepository _libraryRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public LibraryService(ILibraryRepository libraryRepository, IProjectRepository projectRepository, IMapper mapper)
        {
            _libraryRepository = libraryRepository;
            _projectRepository = projectRepository;
            _mapper = mapper;
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
    }
}