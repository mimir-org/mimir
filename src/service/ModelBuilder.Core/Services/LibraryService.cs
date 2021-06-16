using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

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
        public IEnumerable<NodeType> GetLibNodes(string searchString)
        {
            var allNodeTypes = _libraryTypeRepository.GetAll()
                .OfType<NodeType>()
                .Cast<NodeType>()
                .Include(x => x.AttributeTypes)
                .Include(x => x.TerminalTypes)
                .Include(x => x.Rds)
                .ToList();
            return allNodeTypes;

            //var data = _mapper.Map<IEnumerable<LibNode>>(_libraryRepository.GetAll(searchString)).ToList();
            
        }
    }
}
