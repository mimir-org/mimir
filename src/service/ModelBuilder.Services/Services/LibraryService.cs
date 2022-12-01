using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Common;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ICooperateService _cooperateService;
        private readonly IMapper _mapper;

        public LibraryService(IProjectRepository projectRepository, IMapper mapper, ILibraryRepository libraryRepository, ICooperateService cooperateService)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _libraryRepository = libraryRepository;
            _cooperateService = cooperateService;
        }

        /// <summary>
        /// Get all node types
        /// </summary>
        /// <returns></returns>
        public async Task<List<NodeLibCm>> GetNodeTypes(string searchString)
        {
            var nodes = await _libraryRepository.GetNodeTypes();
            if (!string.IsNullOrWhiteSpace(searchString))
                nodes = nodes.Where(x => x.Name != null && x.Name.ToLower().Contains(searchString.ToLower())).ToList();

            return nodes;
        }

        /// <summary>
        /// Get all transport types
        /// </summary>
        /// <returns></returns>
        public async Task<List<TransportLibCm>> GetTransportTypes(string searchString)
        {
            var transports = await _libraryRepository.GetTransportTypes();
            if (!string.IsNullOrWhiteSpace(searchString))
                transports = transports.Where(x => x.Name != null && x.Name.ToLower().Contains(searchString.ToLower())).ToList();

            return transports;
        }

        /// <summary>
        /// Get all interface types
        /// </summary>
        /// <returns></returns>
        public async Task<List<InterfaceLibCm>> GetInterfaceTypes(string searchString)
        {
            var interfaces = await _libraryRepository.GetInterfaceTypes();
            if (!string.IsNullOrWhiteSpace(searchString))
                interfaces = interfaces.Where(x => x.Name != null && x.Name.ToLower().Contains(searchString.ToLower())).ToList();

            return interfaces;
        }

        /// <summary>
        /// Get all terminal types
        /// </summary>
        /// <returns>A collection of all registered terminals</returns>
        public async Task<List<TerminalLibCm>> GetTerminalTypes()
        {
            var terminals = await _libraryRepository.GetTerminalTypes();
            return terminals;
        }

        /// <summary>
        /// Get all quantity datums 
        /// </summary>
        /// <returns></returns>
        public async Task<List<QuantityDatumCm>> GetQuantityDatums()
        {
            var datums = await _libraryRepository.GetQuantityDatums();
            return datums;
        }

        /// <summary>
        /// Get all attribute types
        /// </summary>
        /// <returns>A collection of attribute types</returns>
        public async Task<List<AttributeLibCm>> GetAttributeTypes()
        {
            var attributes = await _libraryRepository.GetAttributeTypes();
            return attributes;
        }

        /// <summary>
        /// Get all sub projects
        /// </summary>
        /// <returns></returns>
        public async Task<List<LibrarySubProjectItem>> GetSubProjects(string searchString = null)
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

        /// <summary>
        /// Get all node types and send types to connected clients
        /// </summary>
        /// <returns></returns>
        public async Task SendClientNodeTypes()
        {
            var nodeTypes = await GetNodeTypes(null);
            await _cooperateService.SendNodeLibs(nodeTypes);
        }
    }
}