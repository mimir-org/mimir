﻿using System;
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
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Modules;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Attribute = Mb.Models.Data.Attribute;

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

        public ProjectService(IProjectRepository projectRepository, IMapper mapper,
            IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository,
            ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService,
            IAttributeRepository attributeRepository)
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
                .Include("Edges.Transport")
                .Include("Edges.Transport.Attributes")
                .Include("Edges.Interface")
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .Include("Nodes.Connectors.Attributes")
                .Include("Nodes.Composites")
                .Include("Nodes.Composites.Attributes")
                .AsSplitQuery()
                .OrderByDescending(x => x.Name)
                .FirstOrDefaultAsync();

            if (!ignoreNotFound && project == null)
                throw new ModelBuilderNotFoundException($"Could not find project with id: {id}");

            if (project?.Nodes != null)
            {
                project.Nodes = project.Nodes.OrderBy(x => x.Order).ToList();
                foreach (var node in project.Nodes)
                {
                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            if (!string.IsNullOrEmpty(attribute.UnitString))
                                attribute.Units =
                                    JsonConvert.DeserializeObject<ICollection<Unit>>(attribute.UnitString);

                        }
                    }

                    if (node.Connectors != null)
                    {
                        foreach (var connector in node.Connectors.OfType<Terminal>())
                        {
                            if (connector.Attributes != null)
                            {
                                foreach (var attribute in connector.Attributes)
                                {
                                    if (!string.IsNullOrEmpty(attribute.UnitString))
                                        attribute.Units =
                                            JsonConvert.DeserializeObject<ICollection<Unit>>(attribute.UnitString);
                                }
                            }
                        }
                    }

                    if (node.Composites != null)
                    {
                        foreach (var composite in node.Composites)
                        {
                            if (composite.Attributes != null)
                            {
                                foreach (var attribute in composite.Attributes)
                                {
                                    if (!string.IsNullOrEmpty(attribute.UnitString))
                                        attribute.Units =
                                            JsonConvert.DeserializeObject<ICollection<Unit>>(attribute.UnitString);
                                }
                            }
                        }
                    }

                    if (node.MasterProjectId != id)
                    {
                        var partOfEdge = node.Connectors.OfType<Relation>()
                            .FirstOrDefault(x => x.Type == ConnectorType.Input);

                        if (partOfEdge?.Node != null)
                        {
                            node.PositionY = node.PositionY + partOfEdge.Node.PositionY;
                        }
                    }

                }
            }

            return project;
        }

        /// <summary>
        /// Import project, if exist update project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public async Task<Project> ImportProject(ProjectAm project)
        {
            if (project == null || string.IsNullOrEmpty(project.Id))
                throw new ModelBuilderInvalidOperationException(
                    "You can't import an project that is null or missing id");

            if (_projectRepository.FindBy(x => x.Id == project.Id).Any())
                return await UpdateProject(project.Id, project);

            return await CreateProject(project);
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
                .Include("Edges.Transport")
                .Include("Edges.Transport.Attributes")
                .Include("Edges.Interface")
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .Include("Nodes.Connectors.Attributes")
                .Include("Nodes.Composites")
                .Include("Nodes.Composites.Attributes")
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
            var subDeleteEdges = (await _edgeRepository.DeleteEdges(deleteEdges, project.Id)).ToList();

            // Nodes
            var existingNodes = originalProject.Nodes.ToList();
            var deleteNodes = existingNodes.Where(x => project.Nodes.All(y => y.Id != x.Id)).ToList();
            var subDeleteNodes = (await _nodeRepository.DeleteNodes(deleteNodes, project.Id)).ToList();

            // Map new data
            _mapper.Map(project, originalProject);

            var subNodes = _nodeRepository.UpdateInsert(existingNodes, originalProject).ToList();
            var subEdges = _edgeRepository.UpdateInsert(existingEdges, originalProject).ToList();

            ResolveLevelAndOrder(originalProject);

            _projectRepository.Update(originalProject);
            await _projectRepository.SaveAsync();
            _projectRepository.Detach(originalProject);

            // Resolve
            await ResolveSubProjects(subNodes, subDeleteNodes, subEdges, subDeleteEdges, originalProject.Id);

            // Return project from database
            return await GetProject(id);
        }

        private async Task ResolveSubProjects(ICollection<Node> subNodes, ICollection<Node> subDeleteNodes,
            ICollection<Edge> subEdges, ICollection<Edge> subDeleteEdges, string projectId)
        {
            if (!subNodes.Any() && !subDeleteNodes.Any() && !subEdges.Any() && !subDeleteEdges.Any())
                return;

            var originalProject = await _projectRepository
                .FindBy(x => x.Id == projectId, false)
                .Include(x => x.Edges)
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .Include("Nodes.Connectors.Attributes")
                .AsSplitQuery()
                .OrderByDescending(x => x.Name)
                .FirstOrDefaultAsync();

            foreach (var subNode in subNodes)
            {
                originalProject.Nodes.Add(subNode);
            }

            foreach (var subEdge in subEdges)
            {
                originalProject.Edges.Add(subEdge);
            }

            originalProject.Nodes = originalProject.Nodes.Where(x => subDeleteNodes.All(y => y.Id != x.Id)).ToList();
            originalProject.Edges = originalProject.Edges.Where(x => subDeleteEdges.All(y => y.Id != x.Id)).ToList();

            _projectRepository.Update(originalProject);
            await _projectRepository.SaveAsync();
            _projectRepository.Detach(originalProject);
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
                throw new ModelBuilderInvalidOperationException(
                    "You can't delete a project that is master for other sub projects.");


            var nodesToDelete = existingProject.Nodes.Where(x => x.MasterProjectId == projectId).ToList();
            var edgesToDelete = existingProject.Edges.Where(x => x.MasterProjectId == projectId).ToList();

            await _edgeRepository.DeleteEdges(edgesToDelete, projectId);
            await _nodeRepository.DeleteNodes(nodesToDelete, projectId);
            await _projectRepository.Delete(projectId);
            await _projectRepository.SaveAsync();
        }

        /// <summary>
        /// Create a json byte array based on project id
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        public async Task<(byte[] file, FileFormat format)> CreateFile(string projectId, string parser)
        {
            var project = await GetProject(projectId);

            if (_moduleService.Modules.All(x => !string.Equals(x.Name, parser, StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with key: {parser}");

            var par = _moduleService.Resolve<IModelBuilderParser>(parser);
            var data = await par.SerializeProject(project);
            return (data, par.GetFileFormat());
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

            if (_moduleService.Modules.All(x => !string.Equals(x.Name, parser, StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with key: {parser}");

            var par = _moduleService.Resolve<IModelBuilderParser>(parser);
            var project = await par.DeserializeProjectAm(stream.ToArray());
            return await ImportProject(project);
        }

        /// <summary>
        /// Lock or unlock an attribute
        /// </summary>
        /// <param name="lockUnlockAttributeAm"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockUnlockAttribute(LockUnlockAttributeAm lockUnlockAttributeAm)
        {
            if (lockUnlockAttributeAm?.Id == null)
                return;

            var attribute = await _attributeRepository.GetAsync(lockUnlockAttributeAm.Id);

            if (attribute == null)
                return;

            if (attribute.IsLocked == lockUnlockAttributeAm.IsLocked)
                return;

            var userName = _contextAccessor.GetName();

            if (attribute.IsLocked && attribute.IsLockedBy != userName)
                throw new ModelBuilderUnauthorizedAccessException("Locked by: " + attribute.IsLockedBy);

            attribute.IsLocked = lockUnlockAttributeAm.IsLocked;
            attribute.IsLockedBy = attribute.IsLocked ? userName : null;

            await _attributeRepository.SaveAsync();
        }

        /// <summary>
        /// Locks or unlocks a node (including all attributes on the node) and all children nodes and attributes
        /// </summary>
        /// <param name="lockUnlockNodeAm"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockUnlockNode(LockUnlockNodeAm lockUnlockNodeAm)
        {

            if (lockUnlockNodeAm?.Id == null || lockUnlockNodeAm.ProjectId == null)
                return;

            var userName = _contextAccessor.GetName();

            var allNodesInProject = _nodeRepository.GetAll(false).Where(x => x.MasterProjectId == lockUnlockNodeAm.ProjectId);
            var allAttributesInProject = _attributeRepository.GetAll(false).Where(x => x.Node != null && x.Node.MasterProjectId == lockUnlockNodeAm.ProjectId);
            var allEdgesInProject = _edgeRepository.GetAll(false).Where(x => x.ToNodeId != null && x.ToNode.MasterProjectId == lockUnlockNodeAm.ProjectId);

            var node = allNodesInProject.FirstOrDefault(x => x.Id == lockUnlockNodeAm.Id && x.MasterProjectId == lockUnlockNodeAm.ProjectId);

            if (node?.Id == null)
                return;

            if (node.IsLocked == lockUnlockNodeAm.IsLocked)
                return;

            if (node.IsLocked && userName != node.IsLockedBy)
                throw new ModelBuilderUnauthorizedAccessException("Locked by: " + node.IsLockedBy); ;

            node.IsLocked = lockUnlockNodeAm.IsLocked;
            node.IsLockedBy = node.IsLocked ? userName : null;

            var nodeAttributes = allAttributesInProject.Where(x => x.NodeId == node.Id);
            
            LockUnlockAttributes(nodeAttributes, node, userName);
            LockUnlockNodesAndAttributesRecursive(node, allNodesInProject, allAttributesInProject, allEdgesInProject, userName);

            await _nodeRepository.SaveAsync();
            await _attributeRepository.SaveAsync();
        }

        /// <summary>
        /// Returns a list of all locked nodes id's
        /// If param 'projectId' is null all locked nodes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked node id></returns>
        public IEnumerable<string> GetLockedNodes(string projectId)
        {
            return projectId == null 
                ? _nodeRepository.FindBy(x => x.IsLocked).Select(x => x.Id)
                : _nodeRepository.FindBy(x => x.IsLocked && x.MasterProjectId == projectId).Select(x => x.Id);
        }

        /// <summary>
        /// Returns a list of all locked attributes id's
        /// If param 'projectId' is null all locked attributes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked attribute id></returns>
        public IEnumerable<string> GetLockedAttributes(string projectId)
        {
            return projectId == null
                ? _attributeRepository.FindBy(x => x.IsLocked).Select(x => x.Id)
                : _attributeRepository.FindBy(x => x.IsLocked && x.Node != null && x.Node.MasterProjectId == projectId).Select(x => x.Id);
        }

        /// <summary>
        /// Resolve commit package
        /// </summary>
        /// <param name="package"></param>
        /// <returns></returns>
        public async Task CommitProject(CommitPackage package)
        {
            // TODO: We are missing UX here to define what to do in this workflow. For now, we only send data.

            if (package == null)
                throw new ModelBuilderNullReferenceException("Can't commit a null reference commit package");

            var project = await GetProject(package.ProjectId);
            
            if (_moduleService.Modules.All(x => !string.Equals(x.Name, package.Parser, StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with key: {package.Parser}");

            var senders = _moduleService.Modules.Where(x => x.Instance is IModelBuilderSyncService).ToList();

            if (!senders.Any())
                throw new ModelBuilderModuleException($"There is no sender module");

            var parser = _moduleService.Resolve<IModelBuilderParser>(package.Parser);
            var data = await parser.SerializeProject(project);
            var projectString = System.Text.Encoding.UTF8.GetString(data);

            var export = new ExportData
            {
                Id = project.Id,
                Version = project.Version,
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                Document = projectString
            };

            foreach (var sender in senders)
            {
                if(sender.Instance is IModelBuilderSyncService client)
                {
                    await client.SendData(export);
                }
            }
        }

        #region Private methods

        private void LockUnlockNodesAndAttributesRecursive(
            Node parentNode, 
            IQueryable<Node> allNodesInProject, 
            IQueryable<Attribute> allAttributesInProject, 
            IQueryable<Edge> allEdgesInProject,  
            string userName)
        {
            if (parentNode?.Id == null)
                return;

            var edges = allEdgesInProject.Where(x => x.FromNodeId == parentNode.Id);

            if(!edges.Any())
                return;

            foreach (var edge in edges)
            {
                if (edge?.ToNodeId == null)
                    return;

                var childNode = allNodesInProject.FirstOrDefault(x => x.Id == edge.ToNodeId);

                if (childNode?.Id == null)
                    continue;

                if(childNode.IsLocked == parentNode.IsLocked)
                    continue;

                if(childNode.IsLocked && userName != childNode.IsLockedBy)
                    continue;

                if (childNode.Level > parentNode.Level)
                {
                    childNode.IsLocked = parentNode.IsLocked;
                    childNode.IsLockedBy = childNode.IsLocked ? userName : null;
                    
                    var nodeAttributes = allAttributesInProject.Where(x => x.NodeId == childNode.Id);
                    LockUnlockAttributes(nodeAttributes, childNode, userName);
                }

                LockUnlockNodesAndAttributesRecursive(childNode, allNodesInProject, allAttributesInProject, allEdgesInProject, userName);
            }
        }

        private void LockUnlockAttributes(IQueryable<Attribute> attributes, Node node, string userName)
        {
            if (!attributes.Any())
                return;

            foreach (var nodeAttribute in attributes)
            {
                if (nodeAttribute == null)
                    continue;

                if (nodeAttribute.IsLocked == node.IsLocked)
                    continue;

                if (nodeAttribute.IsLocked && nodeAttribute.IsLockedBy != userName)
                    continue;

                nodeAttribute.IsLocked = node.IsLocked;
                nodeAttribute.IsLockedBy = nodeAttribute.IsLocked ? userName : null;
            }
        }

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
                RemapComposites(newNodeId, node);
                RemapConnectors(newNodeId, node, project);

                foreach (var attribute in node.Attributes)
                {
                    if (attribute.NodeId == node.Id)
                        attribute.NodeId = newNodeId;
                }

                node.Id = newNodeId;
            }

            foreach (var edge in project.Edges)
            {
                if (edge.Transport != null)
                    RemapTransport(edge);

                if (edge.Interface != null)
                    RemapInterface(edge);


                if (_commonRepository.HasValidId(edge.Id))
                    continue;

                edge.Id = _commonRepository.CreateUniqueId();
            }
        }

        private void RemapTransport(EdgeAm edge)
        {
            if(edge.Transport == null)
                return;

            if (!_commonRepository.HasValidId(edge.Transport.Id))
            {
                var newTransportId = _commonRepository.CreateUniqueId();
                
                if (edge.Transport.Attributes != null)
                {
                    foreach (var attribute in edge.Transport.Attributes)
                    {
                        attribute.TransportId = newTransportId;
                    }
                }


                edge.Transport.Id = newTransportId;
                
            }
        }

        private void RemapInterface(EdgeAm edge)
        {
            if (edge.Interface == null)
                return;

            if (!_commonRepository.HasValidId(edge.Interface.Id))
            {
                var newInterfaceId = _commonRepository.CreateUniqueId();
                edge.Interface.Id = newInterfaceId;
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

                    if (edge.Interface != null)
                    {
                        if (edge.Interface.TerminalId == connector.Id)
                            edge.Interface.TerminalId = newConnectorId;
                    }
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

        private void RemapComposites(string newNodeId, NodeAm node)
        {
            if (node?.Composites == null || !node.Composites.Any())
                return;

            foreach (var composite in node.Composites)
            {
                if (!_commonRepository.HasValidId(composite.Id))
                {
                    composite.Id = _commonRepository.CreateUniqueId();
                    foreach (var attribute in composite.Attributes)
                    {
                        attribute.CompositeId = composite.Id;
                    }
                }
                composite.NodeId = newNodeId;
            }
        }

        #endregion
    }
}
