using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IMapper _mapper;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ITransportTypeRepository _transportTypeRepository;
        private readonly IInterfaceTypeRepository _interfaceTypeRepository;
        
        public LibraryService(ILibraryRepository libraryRepository, IMapper mapper, ITransportTypeRepository transportTypeRepository, IInterfaceTypeRepository interfaceTypeRepository)
        {
            _libraryRepository = libraryRepository;
            _mapper = mapper;
            _transportTypeRepository = transportTypeRepository;
            _interfaceTypeRepository = interfaceTypeRepository;
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
        public IEnumerable<LibraryTransportItem> GetTransportTypes()
        {
            var transportTypes = _transportTypeRepository.GetAll()
                .Include(x => x.AttributeTypes)
                .ProjectTo<LibraryTransportItem>(_mapper.ConfigurationProvider)
                .ToList();

            return transportTypes;
        }

        public IEnumerable<LibraryInterfaceItem> GetInterfaceTypes()
        {
            var interfaceTypes = _interfaceTypeRepository.GetAll()
                .ProjectTo<LibraryInterfaceItem>(_mapper.ConfigurationProvider)
                .ToList();

            return interfaceTypes;
        }
    }
}
