using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Core.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IMapper _mapper;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ICommonRepository _commonRepository;

        public LibraryService(ILibraryRepository libraryRepository, IMapper mapper, ICommonRepository commonRepository)
        {
            _libraryRepository = libraryRepository;
            _mapper = mapper;
            _commonRepository = commonRepository;
        }

        /// <summary>
        /// Get all library items based on searchString
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        public IEnumerable<LibNode> GetLibNodes(string searchString)
        {
            var data = _mapper.Map<IEnumerable<LibNode>>(_libraryRepository.GetAll(searchString)).ToList();
            foreach (var node in data)
            {
                if (node.Connectors != null)
                {
                    // TODO: Fix this
                    //foreach (var connector in node.Connectors)
                    //{
                    //    connector.MediaColor = _commonRepository.GetTerminalColor(connector.Terminal,
                    //        connector.TerminalCategory, connector.RelationType, node.Type)?.Color;
                    //    connector.TransportColor = _commonRepository.GetTerminalColor(Terminal.NotSet,
                    //        connector.TerminalCategory, connector.RelationType, node.Type)?.Color;
                    //}
                }

                yield return node;
            }
        }
    }
}
