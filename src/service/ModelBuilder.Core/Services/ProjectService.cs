using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Modules;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly INodeRepository _nodeRepository;
        private readonly IEdgeRepository _edgeRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IModuleService _moduleService;
        
        public ProjectService(IProjectRepository projectRepository, IMapper mapper, IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository, ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _commonRepository = commonRepository;
            _connectorRepository = connectorRepository;
            _moduleService = moduleService;
        }

        /// <summary>
        /// Get a list of simple projects sorted by last edited
        /// from start index and a max number that will be returned
        /// </summary>
        /// <param name="name"></param>
        /// <param name="from"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        public IEnumerable<ProjectSimple> GetProjectList(string name, int from, int number)
        {
            if (string.IsNullOrEmpty(name))
                return _projectRepository.GetAll()
                    .OrderByDescending(x => x.Updated)
                    .Skip(from)
                    .Take(number)
                    .ProjectTo<ProjectSimple>(_mapper.ConfigurationProvider)
                    .ToList();
            
            return _projectRepository.GetAll()
                .Where(x => x.Name.ToLower().StartsWith(name.ToLower()))
                .OrderByDescending(x => x.Updated)
                .Skip(from)
                .Take(number)
                .ProjectTo<ProjectSimple>(_mapper.ConfigurationProvider)
                .ToList();
        }

        /// <summary>
        /// Get a project by id. The project will include all edges, nodes,
        /// attributes and connectors.
        /// The method wil throw a ModelBuilderNotFoundException if not exist
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ignoreNotFound"></param>
        /// <returns></returns>
        public async Task<Project> GetProject(string id, bool ignoreNotFound = false)
        {
            var project = await _projectRepository
                .FindBy(x => x.Id == id)
                .Include(x => x.Edges)
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .AsSplitQuery()
                .OrderByDescending(x => x.Name)
                .FirstOrDefaultAsync();

            if (!ignoreNotFound && project == null)
                throw new ModelBuilderNotFoundException($"Could not find project with id: {id}");

            return project;
        }

        /// <summary>
        /// Create a new empty project. The project wil include the aspect root nodes.
        /// </summary>
        /// <param name="createProject"></param>
        /// <returns></returns>
        public async Task<Project> CreateProject(CreateProject createProject)
        {
            var project = CreateInitProject(createProject);
            await _projectRepository.CreateAsync(project);
            await _projectRepository.SaveAsync();
            return project;
        }

        /// <summary>
        /// Create a new project based on an existing project. If project, node, edge or connector already exist,
        /// a ModelBuilderDuplicateException will be thrown.
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public async Task<Project> CreateProject(Project project)
        {
            var existingProject = await GetProject(project.Id, true);

            if (existingProject != null)
                throw new ModelBuilderDuplicateException($"Project already exist - id: {project.Id}");

            if(_edgeRepository.GetAll().AsEnumerable().Any(x => project.Edges.Any(y => y.Id == x.Id)))
                throw new ModelBuilderDuplicateException("One or more edges already exist");

            if (_nodeRepository.GetAll().AsEnumerable().Any(x => project.Nodes.Any(y => y.Id == x.Id)))
                throw new ModelBuilderDuplicateException("One or more nodes already exist");

            var allConnectors = project.Nodes.AsEnumerable().SelectMany(x => x.Connectors).ToList();
            if(_connectorRepository.GetAll().AsEnumerable().Any(x => allConnectors.Any(y => y.Id == x.Id)))
                throw new ModelBuilderDuplicateException("One or more connectors already exist");

            await _projectRepository.CreateAsync(project);
            await _projectRepository.SaveAsync();
            return project;
        }

        /// <summary>
        /// Update a project, if the project does not exist, a ModelBuilderNotFoundException will be thrown.
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public async Task<Project> UpdateProject(Project project)
        {
            var existingProject = await GetProject(project.Id);
            return await UpdateProject(existingProject, project);
        }

        /// <summary>
        /// Delete a project from given id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task DeleteProject(string projectId)
        {
            var existingProject = await GetProject(projectId);
            
            var nodesToDelete = existingProject.Nodes.Select(x => x.Id).ToList();
            var edgesToDelete = existingProject.Edges.Select(x => x.Id).ToList();

            foreach (var nodeId in nodesToDelete)
            {
                await _nodeRepository.Delete(nodeId);
            }

            foreach (var edgeId in edgesToDelete)
            {
                await _edgeRepository.Delete(edgeId);
            }

            await _projectRepository.Delete(projectId);
            await _projectRepository.SaveAsync();
            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();

        }

        /// <summary>
        /// Create a json byte array based on project id
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        public async Task<byte[]> CreateFile(string projectId, string parser)
        {
            var project = await GetProject(projectId);
            
            if (!_moduleService.ParserModules.ContainsKey(parser))
                parser = "Default";

            var par = _moduleService.Resolve<IModelBuilderParser>(parser);
            return await par.SerializeProject(project);
        }

        /// <summary>
        /// Create a project from file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        public async Task<Project> CreateFromFile(IFormFile file, CancellationToken cancellationToken, string parser)
        {
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream, cancellationToken);

            if (!_moduleService.ParserModules.ContainsKey(parser))
                parser = "Default";

            var par = _moduleService.Resolve<IModelBuilderParser>(parser);
            var project = await par.DeserializeProject(stream.ToArray());
            return await CreateProject(project);
        }

        #region Private methods

        private Node CreateInitAspectNode(NodeType nodeType, string version)
        {
            const decimal positionY = 5.0m;
            const string connectorName = "PartOf";

            string name;
            decimal positionX;
            IconType icon;

            switch (nodeType)
            {
                case NodeType.AspectFunction:
                    name = "Function";
                    positionX = 150.0m;
                    icon = IconType.FunctionIcon;
                    break;

                case NodeType.AspectProduct:
                    name = "Product";
                    positionX = 600.0m;
                    icon = IconType.ProductIcon;
                    break;

                case NodeType.AspectLocation:
                    name = "Location";
                    positionX = 1050.0m;
                    icon = IconType.LocationIcon;
                    break;

                default:
                    name = "";
                    positionX = 0.0m;
                    icon = IconType.FunctionIcon;
                    break;
            }


            var node = new Node
            {
                Id = _commonRepository.CreateUniqueId(),
                Name = name,
                Label = name,
                Icon = icon,
                Type = nodeType,
                PositionX = positionX,
                PositionY = positionY,
                Connectors = new List<Connector>(),
                UpdatedBy = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime(),
                Version = version
            };

            var connector = new Connector
            {
                Id = _commonRepository.CreateUniqueId(),
                Name = connectorName,
                Type = ConnectorType.Output,
                NodeId = node.Id,
                RelationType = RelationType.PartOf,
                TerminalType = TerminalType.NotSet,
                TerminalCategory = TerminalCategory.NotSet
            };

            node.Connectors.Add(connector);
            return node;
        }

        private async Task<Project> UpdateProject(Project existingProject, Project project)
        {
            // Nodes
            var nodesToUpdate = project.Nodes.Where(x => existingProject.Nodes.Any(y => y.Id == x.Id)).Select(y => { y.Projects = new List<Project> { project }; return y; }).ToList();
            var nodesToCreate = project.Nodes.Where(x => existingProject.Nodes.All(y => y.Id != x.Id)).Select(y => { y.Projects = new List<Project> { project }; return y; }).ToList();
            var nodesToDelete = existingProject.Nodes.Where(x => project.Nodes.All(y => y.Id != x.Id)).ToList();
            project.Nodes.Clear();

            // Edges
            var edgesToUpdate = project.Edges.Where(x => existingProject.Edges.Any(y => y.Id == x.Id)).Select(y => { y.Projects = new List<Project> { project }; return y; }).ToList();
            var edgesToCreate = project.Edges.Where(x => existingProject.Edges.All(y => y.Id != x.Id)).Select(y => { y.Projects = new List<Project> { project }; return y; }).ToList();
            var edgesToDelete = existingProject.Edges.Where(x => project.Edges.All(y => y.Id != x.Id)).ToList();
            project.Edges.Clear();

            foreach (var node in nodesToUpdate)
            {
                node.UpdatedBy = _contextAccessor.GetName();
                node.Updated = DateTime.Now.ToUniversalTime();
                _nodeRepository.Update(node);
            }

            foreach (var node in nodesToCreate)
            {
                var nodeNewId = _commonRepository.CreateUniqueId();
                
                foreach (var connector in node.Connectors)
                {
                    var connectorNewId = _commonRepository.CreateUniqueId();

                    foreach (var edge in edgesToCreate)
                    {
                        if (edge.FromNode == node.Id)
                            edge.FromNode = nodeNewId;
                        if (edge.ToNode == node.Id)
                            edge.ToNode = nodeNewId;

                        if (edge.FromConnector == connector.Id)
                            edge.FromConnector = connectorNewId;
                        if (edge.ToConnector == connector.Id)
                            edge.ToConnector = connectorNewId;
                    }

                    connector.Id = connectorNewId;
                }

                node.Id = nodeNewId;
                node.UpdatedBy = _contextAccessor.GetName();
                node.Updated = DateTime.Now.ToUniversalTime();
                await _nodeRepository.CreateAsync(node);
            }

            foreach (var node in nodesToDelete)
                await _nodeRepository.Delete(node.Id);

            foreach (var edge in edgesToUpdate)
                _edgeRepository.Update(edge);

            foreach (var edge in edgesToCreate)
            {
                edge.Id = _commonRepository.CreateUniqueId();
                await _edgeRepository.CreateAsync(edge);
            }

            foreach (var edge in edgesToDelete)
                await _edgeRepository.Delete(edge.Id);

            project.UpdatedBy = _contextAccessor.GetName();
            project.Updated = DateTime.Now.ToUniversalTime();
            

            _projectRepository.Update(project);
            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();
            await _projectRepository.SaveAsync();

            return await GetProject(project.Id);
        }

        private Project CreateInitProject(CreateProject createProject)
        {
            var project = new Project
            {
                Id = _commonRepository.CreateUniqueId(),
                Version = createProject.Version,
                Name = createProject.Name,
                Description = createProject.Description,
                ProjectOwner = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime(),
                UpdatedBy = _contextAccessor.GetName(),
                Nodes = new List<Node>
                {
                    CreateInitAspectNode(NodeType.AspectFunction, createProject.Version),
                    CreateInitAspectNode(NodeType.AspectProduct, createProject.Version),
                    CreateInitAspectNode(NodeType.AspectLocation, createProject.Version)
                }
            };

            return project;
        }

        #endregion
    }
}
