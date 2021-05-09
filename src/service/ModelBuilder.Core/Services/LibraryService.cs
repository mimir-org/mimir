using System.Collections.Generic;
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

        public LibraryService(ILibraryRepository libraryRepository, IMapper mapper)
        {
            _libraryRepository = libraryRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all library items based on searchString
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        public IEnumerable<LibNode> GetLibNodes(string searchString)
        {
            return _mapper.Map<IEnumerable<LibNode>>(_libraryRepository.GetAll(searchString));
        }
    }
}
