using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Services.Contracts;
using Mb.TypeEditor.Data.Contracts;

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
        public Library GetLibTypes(string searchString)
        {
            var library = new Library
            {
                ObjectBlocks = _libraryRepository.GetNodeTypes(searchString).ToList(),
                Transports = _libraryRepository.GetTransportTypes(searchString).ToList(),
                Interfaces = _libraryRepository.GetInterfaceTypes(searchString).ToList(),
                SubProjects = GetSubProjects(searchString).ToList()
            };

            return library;
        }

        /// <summary>
        /// Get all node types
        /// </summary>
        /// <returns></returns>
        public IEnumerable<LibraryNodeItem> GetNodeTypes()
        {
            return _libraryRepository.GetNodeTypes().ToList();
        }

        /// <summary>
        /// Get all transport types
        /// </summary>
        /// <returns></returns>
        public IEnumerable<LibraryTransportItem> GetTransportTypes()
        {
            return _libraryRepository.GetTransportTypes().ToList();
        }

        /// <summary>
        /// Get all interface types
        /// </summary>
        /// <returns></returns>
        public IEnumerable<LibraryInterfaceItem> GetInterfaceTypes()
        {
            return _libraryRepository.GetInterfaceTypes().ToList();
        }

        /// <summary>
        /// Get all sub projects
        /// </summary>
        /// <returns></returns>
        public IEnumerable<LibrarySubProjectItem> GetSubProjects(string searchString = null)
        {
            if (string.IsNullOrWhiteSpace(searchString))
            {
                return _projectRepository.GetAll()
                    .Where(x => x.IsSubProject)
                    .ProjectTo<LibrarySubProjectItem>(_mapper.ConfigurationProvider)
                    .OrderBy(x => x.Name)
                    .ToList();
            }

            return _projectRepository.GetAll()
                .Where(x => x.IsSubProject && x.Name.ToLower().Contains(searchString.ToLower()))
                .ProjectTo<LibrarySubProjectItem>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Name)
                .ToList();
        }
    }
}
