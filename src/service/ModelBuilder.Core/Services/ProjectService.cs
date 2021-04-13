using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Enums;
using Mb.Core.Exceptions;
using Mb.Core.Models;
using Mb.Core.Repositories;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
        }

        public IEnumerable<ProjectSimpleAm> GetProjectList()
        {
            return _projectRepository.GetAll().ProjectTo<ProjectSimpleAm>(_mapper.ConfigurationProvider).ToList();
        }

        public async Task<ProjectAm> GetProject(string id)
        {
            var project = await _projectRepository.FindBy(x => x.Id == id).Include(x => x.Nodes).FirstOrDefaultAsync();

            if (project == null)
                throw new ModelBuilderNotFoundException();

            return _mapper.Map<ProjectAm>(project);
        }

        public async Task<ProjectAm> CreateProject(ProjectAm project)
        {
            var existingProject = await _projectRepository.FindBy(x => x.Id == project.Id).Include(x => x.Nodes).FirstOrDefaultAsync();

            if (existingProject != null)
                return await UpdateProject(project);

            var p = _mapper.Map<Project>(project);
            await _projectRepository.CreateAsync(p);
            await _projectRepository.SaveAsync();
            return _mapper.Map<ProjectAm>(p);
        }

        public async Task<ProjectAm> CreateNewProject(string name, string description)
        {
            var project = CreateInitProject(name, description);
            await _projectRepository.CreateAsync(project);
            await _projectRepository.SaveAsync();
            return _mapper.Map<ProjectAm>(project);
        }

        public async Task<ProjectAm> UpdateProject(ProjectAm project)
        {
            var p = _mapper.Map<Project>(project);
            _projectRepository.Update(p);
            await _projectRepository.SaveAsync();
            return _mapper.Map<ProjectAm>(project);
        }

        public Project CreateInitProject(string name, string description)
        {
            var project = new Project
            {
                Name = name,
                Description = description,
                Nodes = new List<Node>
                {
                    CreateInitAspectNode(NodeType.AspectFunction),
                    CreateInitAspectNode(NodeType.AspectProduct),
                    CreateInitAspectNode(NodeType.AspectLocation)
                }
            };

            return project;
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

                case NodeType.AspectLocation:
                    name = "Location";
                    positionX = 600.0m;
                    icon = IconType.LocationIcon;
                    break;

                case NodeType.AspectProduct:
                    name = "Product";
                    positionX = 1050.0m;
                    icon = IconType.ProductIcon;
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
                Type = ConnectorType.PartofOutput,
                NodeId = node.Id
            };

            node.Connectors.Add(connector);
            return node;
        }
    }
}
