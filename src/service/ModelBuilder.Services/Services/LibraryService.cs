using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Common;
using Mb.Models.Compare;
using Mb.Services.Contracts;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ICooperateService _cooperateService;

        public LibraryService(IProjectRepository projectRepository, ILibraryRepository libraryRepository, ICooperateService cooperateService)
        {
            _projectRepository = projectRepository;
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
        public async Task<List<LibrarySubProject>> GetSubProjects(string searchString = null)
        {
            var projectVersions = await _projectRepository.GetProjectVersions(true);
            var groups = projectVersions.ToLookup(x => x.Id);
            var keys = groups.Select(t => t.Key);
            var versions = new List<LibrarySubProject>();

            foreach (var key in keys)
            {
                var items = groups[key].OrderByDescending(x => x, new VersionDataComparer()).Take(5).ToList();
                if (!items.Any())
                    continue;

                var version = new LibrarySubProject
                {
                    Id = items[0].Id,
                    Name = items[0].Name,
                    Version = items[0].Version,
                    Description = items[0].Description,
                    Versions = new List<LibrarySubProjectVersion>()
                };

                // Add the latest project to the list
                version.Versions.Add(new LibrarySubProjectVersion
                {
                    Id = items[0].Id,
                    Name = items[0].Name,
                    Version = items[0].Version
                });

                foreach (var item in items)
                {
                    version.Versions.Add(new LibrarySubProjectVersion
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Version = item.Ver
                    });
                }
                versions.Add(version);
            }

            return versions.OrderBy(x => x.Name).ToList();
        }

        /// <summary>
        /// Get all node types and send types to connected clients
        /// </summary>
        /// <returns></returns>
        public async Task SendRefreshLibData()
        {
            await _cooperateService.SendRefreshLibData();
        }
    }
}