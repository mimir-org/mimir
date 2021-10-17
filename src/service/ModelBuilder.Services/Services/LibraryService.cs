using System.Collections.Generic;
using System.Linq;
using Mb.Models.Application;
using Mb.Services.Contracts;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.Services.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly ILibraryRepository _libraryRepository;

        public LibraryService(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
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
                Interfaces = _libraryRepository.GetInterfaceTypes(searchString).ToList()
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
    }
}
