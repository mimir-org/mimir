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
        private readonly INodeService _nodeService;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper, IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository, ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService, IAttributeRepository attributeRepository, INodeService nodeService)
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
            _nodeService = nodeService;
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

            if (project?.Nodes != null)
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
        public async Task<Project> CreateProject(ProjectAm project)
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

            // Cast connectors
            CastConnectors(project);

            // Remap and create new id's
            Remap(project);

            // Create an empty project
            var newProject = new Project
            {
                ProjectOwner = _contextAccessor.GetName(),
                UpdatedBy = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime()
            };

            // Map data
            _mapper.Map(project, newProject);

            await _projectRepository.CreateAsync(newProject);
            await _projectRepository.SaveAsync();

            var updatedProject = await GetProject(newProject.Id);
            return updatedProject;
        }

        /// <summary>
        /// Update a project, if the project does not exist, a ModelBuilderNotFoundException will be thrown.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public async Task<Project> UpdateProject(string id, ProjectAm project)
        {
            var originalProject = await _projectRepository
                .FindBy(x => x.Id == id)
                .Include(x => x.Edges)
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .Include("Nodes.Connectors.Attributes")
                .AsSplitQuery()
                .OrderByDescending(x => x.Name)
                .FirstOrDefaultAsync();

            if (originalProject == null)
                throw new ModelBuilderNotFoundException($"The project with id:{id}, could not be found.");

            // Cast connectors
            CastConnectors(project);

            // Remap and create new id's
            Remap(project);

            // Edges
            var existingEdges = originalProject.Edges.ToList();
            var deleteEdges = existingEdges.Where(x => project.Edges.All(y => y.Id != x.Id)).ToList();
            await _edgeRepository.DeleteEdges(deleteEdges);

            // Nodes
            var existingNodes = originalProject.Nodes.ToList();
            var deleteNodes = existingNodes.Where(x => project.Nodes.All(y => y.Id != x.Id)).ToList();
            await _nodeRepository.DeleteNodes(deleteNodes);

            // Map new data
            _mapper.Map(project, originalProject);

            await _nodeRepository.UpdateInsert(existingNodes, originalProject);
            await _edgeRepository.UpdateInsert(existingEdges, originalProject);

            _projectRepository.Update(originalProject);
            await _projectRepository.SaveAsync();

            var updatedProject = await GetProject(id);
            return updatedProject;
        }

        /// <summary>
        /// Delete a project from given id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task DeleteProject(string projectId)
        {
            var existingProject = await GetProject(projectId);
            if (existingProject == null)
                throw new ModelBuilderNotFoundException($"There is no project with id: {projectId}");

            var masterNodesCount = _nodeRepository.FindBy(x => x.MasterProjectId == projectId).Count();
            var existingProjectNodesCount = existingProject.Nodes.Count;

            if (masterNodesCount > existingProjectNodesCount)
                throw new ModelBuilderInvalidOperationException("You can't delete a project that is master for other sub projects.");


            var nodesToDelete = existingProject.Nodes.Where(x => x.MasterProjectId == projectId).ToList();
            var edgesToDelete = existingProject.Edges.Where(x => x.MasterProjectId == projectId).ToList();

            await _edgeRepository.DeleteEdges(edgesToDelete);
            await _nodeRepository.DeleteNodes(nodesToDelete);
            await _projectRepository.Delete(projectId);
            await _projectRepository.SaveAsync();
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
            var project = await par.DeserializeProjectAm(stream.ToArray());
            return await CreateProject(project);
        }

        #region Private methods

        private Node CreateInitAspectNode(Aspect aspect, string version, string projectId)
        {
            const decimal positionY = 5.0m;
            const string connectorName = "PartOf";

            string name;
            decimal positionX;

            switch (aspect)
            {
                case Aspect.Function:
                    name = "Function";
                    positionX = 150.0m;
                    break;

                case Aspect.Product:
                    name = "Product";
                    positionX = 600.0m;
                    break;

                case Aspect.Location:
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
                PositionX = positionX,
                PositionY = positionY,
                Connectors = new List<Connector>(),
                UpdatedBy = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime(),
                Version = version,
                Rds = string.Empty,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                IsRoot = true,
                MasterProjectId = projectId,
                Aspect = aspect
            };

            var connector = new Relation
            {
                Id = _commonRepository.CreateUniqueId(),
                Name = connectorName,
                Type = ConnectorType.Output,
                NodeId = node.Id,
                RelationType = RelationType.PartOf,
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

            //Templates
            foreach (var templateEdgeToDelete in edgesToDelete.Where(x => x.IsTemplateEdge))
            {
                await _edgeRepository.Delete(templateEdgeToDelete.Id);
                nodesToUpdate.RemoveAll(x=> x.MasterProjectId.Equals(templateEdgeToDelete.MasterProjectId));
                nodesToDelete.RemoveAll(x=> x.MasterProjectId.Equals(templateEdgeToDelete.MasterProjectId));
                edgesToUpdate.RemoveAll(x=> x.MasterProjectId.Equals(templateEdgeToDelete.MasterProjectId));
                edgesToDelete.RemoveAll(x=> x.MasterProjectId.Equals(templateEdgeToDelete.MasterProjectId));
            }

            // Attributes
            var attributesToDelete = GetAttributesToDelete(nodesToDelete, project);
            
            UpdateNodes(nodesToUpdate.Where(x => x.MasterProjectId.Equals(project.Id)).ToList());

            await CreateNodes(nodesToCreate, edgesToCreate, project);

            foreach (var attribute in attributesToDelete)
            {
                await _attributeRepository.Delete(attribute.Id);
            }

            foreach (var node in nodesToDelete.Where(x => x.MasterProjectId.Equals(project.Id)))
                await _nodeRepository.Delete(node.Id);

            foreach (var edge in edgesToUpdate.Where(x => x.MasterProjectId.Equals(project.Id)))
                _edgeRepository.Update(edge);

            foreach (var edge in edgesToCreate)
            {
                edge.Id = _commonRepository.CreateUniqueId();
                if (string.IsNullOrEmpty(edge.MasterProjectId))
                    edge.MasterProjectId = project.Id;

                edge.FromConnector = null;
                edge.ToConnector = null;
                edge.FromNode = null;
                edge.ToNode = null;
                await _edgeRepository.CreateAsync(edge);
            }

            foreach (var edge in edgesToDelete.Where(x => x.MasterProjectId.Equals(project.Id)))
            {
                edge.FromConnector = null;
                edge.ToConnector = null;
                edge.FromNode = null;
                edge.ToNode = null;
                await _edgeRepository.Delete(edge.Id);
            }

            project.UpdatedBy = _contextAccessor.GetName();
            project.Updated = DateTime.Now.ToUniversalTime();


            _projectRepository.Update(project);
            await _attributeRepository.SaveAsync();
            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();
            await _projectRepository.SaveAsync();

            return await GetProject(project.Id);
        }

        private async Task CreateNodes(List<Node> nodesToCreate, List<Edge> edgesToCreate, Project project)
        {
            foreach (var node in nodesToCreate)
            {
                var nodeNewId = _commonRepository.CreateUniqueId();
                if (string.IsNullOrEmpty(node.MasterProjectId))
                    node.MasterProjectId = project.Id;
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

                        edge.FromConnector = null;
                        edge.ToConnector = null;
                    }

                    connector.Id = connectorNewId;
                }

                node.Id = nodeNewId;
                node.UpdatedBy = _contextAccessor.GetName();
                node.Updated = DateTime.Now.ToUniversalTime();
                await _nodeRepository.CreateAsync(node);
            }
        }

        private void UpdateNodes(List<Node> nodesToUpdate)
        {
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
        }

        private List<Attribute> GetAttributesToDelete(List<Node> nodesToDelete, Project project)
        {
            var attributesToDelete = new List<Attribute>();
            foreach (var node in nodesToDelete.Where(x => x.MasterProjectId.Equals(project.Id)))
            {
                attributesToDelete.AddRange(node.Attributes);
                node.Attributes.Clear();
                foreach (var nodeConnector in node.Connectors.OfType<Terminal>())
                {
                    attributesToDelete.AddRange(nodeConnector.Attributes);
                    nodeConnector.Attributes.Clear();
                }
            }

            return attributesToDelete;
        }

        private void ResolveLevelAndOrder(Project project)
        {
            if (project?.Nodes == null || project.Edges == null)
                return;

            var rootNodes = project.Nodes.Where(x => x.IsRoot).ToList();
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
            var pid = _commonRepository.CreateUniqueId();
            var project = new Project
            {
                Id = pid,
                Version = createProject.Version,
                Name = createProject.Name,
                Description = createProject.Description,
                ProjectOwner = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime(),
                UpdatedBy = _contextAccessor.GetName(),
                Nodes = new List<Node>
                {
                    CreateInitAspectNode(Aspect.Function, createProject.Version, pid),
                    CreateInitAspectNode(Aspect.Product, createProject.Version, pid),
                    CreateInitAspectNode(Aspect.Location, createProject.Version, pid)
                }
            };

            return project;
        }

        private void CastConnectors(ProjectAm project)
        {
            foreach (var node in project.Nodes)
            {
                var connectors = new List<ConnectorAm>();
                foreach (var connector in node.Connectors)
                {
                    if (string.IsNullOrEmpty(connector.TerminalCategoryId) && connector.RelationType != RelationType.NotSet)
                    {
                        var relationAm = new RelationAm();
                        _mapper.Map(connector, relationAm);
                        connectors.Add(relationAm);
                    }

                    else
                    {
                        var terminalAm = new TerminalAm();
                        _mapper.Map(connector, terminalAm);
                        connectors.Add(terminalAm);
                    }
                }

                node.Connectors = connectors;
            }
        }

        private void Remap(ProjectAm project)
        {
            foreach (var node in project.Nodes.Where(x => !_commonRepository.HasValidId(x.Id)))
            {
                var newNodeId = _commonRepository.CreateUniqueId();
                RemapConnectors(newNodeId, node, project);

                foreach (var attribute in node.Attributes)
                {
                    if (attribute.NodeId == node.Id)
                        attribute.NodeId = newNodeId;
                }

                node.Id = newNodeId;
            }
        }

        private void RemapConnectors(string newNodeId, NodeAm node, ProjectAm project)
        {
            if (node?.Connectors == null || !node.Connectors.Any())
                return;

            foreach (var connector in node.Connectors)
            {
                var newConnectorId = _commonRepository.CreateUniqueId();

                foreach (var edge in project.Edges)
                {
                    if (edge.FromConnectorId == connector.Id)
                        edge.FromConnectorId = newConnectorId;
                    if (edge.ToConnectorId == connector.Id)
                        edge.ToConnectorId = newConnectorId;
                    if (edge.FromNodeId == node.Id)
                        edge.FromNodeId = newNodeId;
                    if (edge.ToNodeId == node.Id)
                        edge.ToNodeId = newNodeId;
                }

                foreach (var attribute in connector.Attributes)
                {
                    if (attribute.TerminalId == connector.Id)
                        attribute.TerminalId = newConnectorId;
                }

                connector.Id = newConnectorId;
                connector.NodeId = newNodeId;
            }
        }

        #endregion
    }
}
