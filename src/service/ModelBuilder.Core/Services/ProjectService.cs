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
using Attribute = Mb.Models.Data.Attribute;
using NodeType = Mb.Models.Enums.NodeType;
using Terminal = Mb.Models.Data.Terminal;

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
        private readonly IAttributeRepository _attributeRepository;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper, IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository, ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService, IAttributeRepository attributeRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _commonRepository = commonRepository;
            _connectorRepository = connectorRepository;
            _moduleService = moduleService;
            _attributeRepository = attributeRepository;
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
                .Include("Edges.FromNode")
                .Include("Edges.ToNode")
                .Include("Edges.FromConnector")
                .Include("Edges.ToConnector")
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .Include("Nodes.Connectors.Attributes")
                .AsSplitQuery()
                .OrderByDescending(x => x.Name)
                .FirstOrDefaultAsync();

            if (!ignoreNotFound && project == null)
                throw new ModelBuilderNotFoundException($"Could not find project with id: {id}");

            if (project.Nodes != null)
            {
                project.Nodes = project.Nodes.OrderBy(x => x.Order).ToList();
            }

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

            if (_edgeRepository.GetAll().AsEnumerable().Any(x => project.Edges.Any(y => y.Id == x.Id)))
                throw new ModelBuilderDuplicateException("One or more edges already exist");

            if (_nodeRepository.GetAll().AsEnumerable().Any(x => project.Nodes.Any(y => y.Id == x.Id)))
                throw new ModelBuilderDuplicateException("One or more nodes already exist");

            var allConnectors = project.Nodes.AsEnumerable().SelectMany(x => x.Connectors).ToList();
            if (_connectorRepository.GetAll().AsEnumerable().Any(x => allConnectors.Any(y => y.Id == x.Id)))
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

            switch (nodeType)
            {
                case NodeType.AspectFunction:
                    name = "Function";
                    positionX = 150.0m;
                    break;

                case NodeType.AspectProduct:
                    name = "Product";
                    positionX = 600.0m;
                    break;

                case NodeType.AspectLocation:
                    name = "Location";
                    positionX = 1050.0m;
                    break;

                default:
                    name = "";
                    positionX = 0.0m;
                    break;
            }


            var node = new Node
            {
                Id = _commonRepository.CreateUniqueId(),
                Name = name,
                Label = name,
                Type = nodeType,
                PositionX = positionX,
                PositionY = positionY,
                Connectors = new List<Connector>(),
                UpdatedBy = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime(),
                Version = version,
                Rds = string.Empty,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF"
            };

            var connector = new Relation
            {
                Id = _commonRepository.CreateUniqueId(),
                Name = connectorName,
                Type = ConnectorType.Output,
                NodeId = node.Id,
                RelationType = RelationType.PartOf,
                //MediaColor = _commonRepository.GetTerminalColor(Terminal.NotSet, new TerminalCategory(), RelationType.PartOf, nodeType).Color, // TODO: Fix this
                //TransportColor = _commonRepository.GetTerminalColor(Terminal.NotSet, new TerminalCategory(), RelationType.PartOf, nodeType).Color // TODO: Fix this
            };

            node.Connectors.Add(connector);
            return node;
        }

        private async Task<Project> UpdateProject(Project existingProject, Project project)
        {
            ResolveLevelAndOrder(project);

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

            // Attributes
            var attributesToDelete = new List<Attribute>();
            foreach (var node in nodesToDelete)
            {
                attributesToDelete.AddRange(node.Attributes);
                node.Attributes.Clear();
                foreach (var nodeConnector in node.Connectors.OfType<Terminal>())
                {
                    attributesToDelete.AddRange(nodeConnector.Attributes);
                    nodeConnector.Attributes.Clear();
                }
            }

            foreach (var node in nodesToUpdate)
            {
                node.UpdatedBy = _contextAccessor.GetName();
                node.Updated = DateTime.Now.ToUniversalTime();
                if (node.Attributes != null)
                {
                    foreach (var nodeAttribute in node.Attributes)
                    {
                        _attributeRepository.Update(nodeAttribute);
                    }
                }

                if (node.Connectors != null)
                {
                    foreach (var connector in node.Connectors.OfType<Terminal>().Where(x => x.Attributes != null))
                    {
                        foreach (var attribute in connector.Attributes)
                        {
                            _attributeRepository.Update(attribute);
                        }
                    }
                }

                _nodeRepository.Update(node);
            }

            foreach (var node in nodesToCreate)
            {
                var nodeNewId = _commonRepository.CreateUniqueId();

                if (node.Attributes != null)
                {
                    foreach (var nodeAttribute in node.Attributes)
                    {
                        nodeAttribute.Id = _commonRepository.CreateUniqueId();
                    }
                }

                foreach (var connector in node.Connectors.OfType<Terminal>())
                {
                    var connectorNewId = _commonRepository.CreateUniqueId();

                    if (connector.Attributes != null)
                    {
                        foreach (var connectorAttribute in connector.Attributes)
                        {
                            connectorAttribute.Id = _commonRepository.CreateUniqueId();
                        }
                    }

                    foreach (var edge in edgesToCreate)
                    {
                        if (edge.FromNodeId == node.Id)
                            edge.FromNodeId = nodeNewId;
                        if (edge.ToNodeId == node.Id)
                            edge.ToNodeId = nodeNewId;

                        if (edge.FromConnectorId == connector.Id)
                            edge.FromConnectorId = connectorNewId;
                        if (edge.ToConnectorId == connector.Id)
                            edge.ToConnectorId = connectorNewId;
                    }

                    connector.Id = connectorNewId;
                }

                node.Id = nodeNewId;
                node.UpdatedBy = _contextAccessor.GetName();
                node.Updated = DateTime.Now.ToUniversalTime();
                await _nodeRepository.CreateAsync(node);
            }

            foreach (var attribute in attributesToDelete)
            {
                await _attributeRepository.Delete(attribute.Id);
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
            await _attributeRepository.SaveAsync();
            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();
            await _projectRepository.SaveAsync();

            return await GetProject(project.Id);
        }

        private void ResolveLevelAndOrder(Project project)
        {
            if (project?.Nodes == null || project.Edges == null)
                return;

            var rootNodes = project.Nodes.Where(x => x.Type == NodeType.AspectFunction || x.Type == NodeType.AspectLocation || x.Type == NodeType.AspectProduct).ToList();
            _ = rootNodes.Aggregate(0, (current, node) => ResolveNodeLevelAndOrder(node, project, 0, current) + 1);
        }

        private int ResolveNodeLevelAndOrder(Node node, Project project, int level, int order)
        {
            if (node == null)
                return order;

            node.Level = level;
            node.Order = order;
            var connector = node.Connectors.OfType<Relation>().FirstOrDefault(x => x.Type == ConnectorType.Output && x.RelationType == RelationType.PartOf);

            if (connector == null)
                return order;

            var edges = project.Edges.Where(x => x.FromConnectorId == connector.Id).ToList();
            var children = project.Nodes.Where(x => edges.Any(y => y.ToNodeId == x.Id)).ToList();
            return children.Aggregate(order, (current, child) => ResolveNodeLevelAndOrder(child, project, level + 1, current + 1));
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
