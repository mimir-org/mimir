using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Exceptions;
using Mb.Core.Repositories;
using Mb.Models;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly INodeRepository _nodeRepository;
        private readonly IEdgeRepository _edgeRepository;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper, ILibraryRepository libraryRepository, IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _libraryRepository = libraryRepository;
            _contextAccessor = contextAccessor;
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
        }

        public IEnumerable<ProjectSimple> GetProjectList(string name)
        {
            if (string.IsNullOrEmpty(name))
                return _projectRepository.GetAll()
                    .OrderByDescending(x => x.LastEdited)
                    .Take(10)
                    .ProjectTo<ProjectSimple>(_mapper.ConfigurationProvider)
                    .ToList();
            else
                return _projectRepository.GetAll()
                    .Where(x => x.Name.ToLower().StartsWith(name.ToLower()))
                    .OrderByDescending(x => x.LastEdited)
                    .Take(10)
                    .ProjectTo<ProjectSimple>(_mapper.ConfigurationProvider)
                    .ToList();
        }

        public async Task<Project> GetProject(string id)
        {
            var project = await _projectRepository
                .FindBy(x => x.Id == id)
                .Include(x => x.Edges)
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .AsSplitQuery()
                .FirstOrDefaultAsync();

            if (project == null)
                throw new ModelBuilderNotFoundException();

            return _mapper.Map<Project>(project);
        }

        public async Task<Project> CreateProject(Project project)
        {
            var existingProject = await GetProject(project.Id);

            if (existingProject != null)
                return await UpdateProject(existingProject, project);

            var p = _mapper.Map<Project>(project);
            await _projectRepository.CreateAsync(p);
            await _projectRepository.SaveAsync();
            return _mapper.Map<Project>(p);
        }

        public async Task<Project> CreateNewProject(CreateProject createProjectAm)
        {
            var project = CreateInitProject(createProjectAm.Name, createProjectAm.Description);
            await _projectRepository.CreateAsync(project);
            await _projectRepository.SaveAsync();
            return _mapper.Map<Project>(project);
        }

        public Project CreateInitProject(string name, string description)
        {
            var project = new Project
            {
                Name = name,
                Description = description,
                ProjectOwner = _contextAccessor.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "name")?.Value,
                LastEdited = DateTime.Now,
                Nodes = new List<Node>
                {
                    CreateInitAspectNode(NodeType.AspectFunction),
                    CreateInitAspectNode(NodeType.AspectProduct),
                    CreateInitAspectNode(NodeType.AspectLocation)
                }
            };

            return project;
        }

        public IEnumerable<LibNode> GetLibNodes(string searchString)
        {
            return _mapper.Map<IEnumerable<LibNode>>(_libraryRepository.GetAll(searchString));
        }

        private Node CreateInitAspectNode(NodeType nodeType)
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
                Name = name,
                Label = name,
                Icon = icon,
                Type = nodeType,
                PositionX = positionX,
                PositionY = positionY,
                Connectors = new List<Connector>()
            };

            var connector = new Connector
            {
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
            var p = _mapper.Map<Project>(project);

            // Nodes
            var nodesToUpdate = p.Nodes.Where(x => existingProject.Nodes.Any(y => y.Id == x.Id)).Select(y => { y.Projects = new List<Project> { p }; return y; }).ToList();
            var nodesToCreate = p.Nodes.Where(x => existingProject.Nodes.All(y => y.Id != x.Id)).Select(y => { y.Projects = new List<Project> { p }; return y; }).ToList();
            var nodesToDelete = existingProject.Nodes.Where(x => p.Nodes.All(y => y.Id != x.Id)).ToList();
            p.Nodes.Clear();

            // Edges
            var edgesToUpdate = p.Edges.Where(x => existingProject.Edges.Any(y => y.Id == x.Id)).Select(y => { y.Projects = new List<Project> { p }; return y; }).ToList();
            var edgesToCreate = p.Edges.Where(x => existingProject.Edges.All(y => y.Id != x.Id)).Select(y => { y.Projects = new List<Project> { p }; return y; }).ToList();
            var edgesToDelete = existingProject.Edges.Where(x => p.Edges.All(y => y.Id != x.Id)).ToList();
            p.Edges.Clear();

            foreach (var node in nodesToUpdate)
                _nodeRepository.Update(node);

            foreach (var node in nodesToCreate)
                await _nodeRepository.CreateAsync(node);

            foreach (var node in nodesToDelete)
                await _nodeRepository.Delete(node.Id);

            foreach (var edge in edgesToUpdate)
                _edgeRepository.Update(edge);

            foreach (var edge in edgesToCreate)
                await _edgeRepository.CreateAsync(edge);

            foreach (var edge in edgesToDelete)
                await _edgeRepository.Delete(edge.Id);

            _projectRepository.Update(p);
            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();
            await _projectRepository.SaveAsync();

            return await GetProject(p.Id);
        }
    }
}
