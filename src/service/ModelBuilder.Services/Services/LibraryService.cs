using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Common;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ICooperateService _cooperateService;
        private readonly IMapper _mapper;
        private readonly IServiceProvider _services;

        public LibraryService(IProjectRepository projectRepository, IMapper mapper, ILibraryRepository libraryRepository, ICooperateService cooperateService, IServiceProvider services)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _libraryRepository = libraryRepository;
            _cooperateService = cooperateService;
            _services = services;
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
            var projectsQuery = _projectRepository.GetAll().Where(x => x.IsSubProject);
            if (!string.IsNullOrWhiteSpace(searchString))
                projectsQuery = projectsQuery.Where(x => x.Name.ToLower().Contains(searchString.ToLower()));

            var projectIds = await projectsQuery.Select(x => x.Id).ToListAsync();

            var projectDictionary = new Dictionary<string, LibrarySubProject>();
            var tasks = new List<Task>();


            foreach (var id in projectIds)
            {
                tasks.Add(Task.Run(() => ResolveProjectItem(id, projectDictionary)));
            }

            await Task.WhenAll(tasks);
            return projectDictionary.Values.ToList();
        }

        private async Task ResolveProjectItem(string projectId, IDictionary<string, LibrarySubProject> projectDictionary)
        {
            using var scope = _services.CreateScope();
            var pr = scope.ServiceProvider.GetRequiredService<IProjectRepository>();
            var project = await pr.GetAsyncComplete(projectId, null);

            if (project == null)
                return;

            var item = _mapper.Map<LibrarySubProject>(project);
            var defaultVersion = _mapper.Map<LibrarySubProjectVersion>(project);
            item.Versions.Add(defaultVersion);

            // TODO: Resolve data from version table

            projectDictionary.Add(projectId, item);
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