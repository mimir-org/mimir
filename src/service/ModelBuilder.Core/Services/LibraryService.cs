using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IMapper _mapper;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly ILibraryTypeRepository _libraryTypeRepository;
        
        public LibraryService(ILibraryRepository libraryRepository, IMapper mapper, ICommonRepository commonRepository, ILibraryTypeRepository libraryTypeRepository)
        {
            _libraryRepository = libraryRepository;
            _mapper = mapper;
            _commonRepository = commonRepository;
            _libraryTypeRepository = libraryTypeRepository;
        }

        /// <summary>
        /// Get all library items based on searchString
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        public IEnumerable<LibraryNodeItem> GetLibNodes(string searchString)
        {
            return _libraryRepository.GetAll(searchString).ToList();
        }

        /// <summary>
        /// Get all transport types
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TransportType> GetTransportTypes()
        {
            return _libraryTypeRepository.GetAll()
                .OfType<TransportType>()
                .Include(x => x.TerminalType)
                .Include(x => x.AttributeTypes)
                .ToList();
        }
    }
}
