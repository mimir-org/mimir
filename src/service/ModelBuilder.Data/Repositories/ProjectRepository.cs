using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Repositories
{
    public class ProjectRepository : GenericRepository<ModelBuilderDbContext, Project>, IProjectRepository
    {
        private readonly IMapper _mapper;

        public ProjectRepository(ModelBuilderDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<Project> GetAsyncComplete(string id, string iri)
        {
            var project = await
                FindBy(x => x.Id == id || x.Iri == iri)
                .Include(x => x.Edges)
                .Include("Edges.FromNode")
                .Include("Edges.ToNode")
                .Include("Edges.FromConnector")
                .Include("Edges.ToConnector")
                .Include("Edges.Transport")
                .Include("Edges.Transport.Attributes")
                .Include("Edges.Transport.InputTerminal")
                .Include("Edges.Transport.InputTerminal.Attributes")
                .Include("Edges.Transport.OutputTerminal")
                .Include("Edges.Transport.OutputTerminal.Attributes")
                .Include("Edges.Interface")
                .Include("Edges.Interface.Attributes")
                .Include("Edges.Interface.InputTerminal")
                .Include("Edges.Interface.InputTerminal.Attributes")
                .Include("Edges.Interface.OutputTerminal")
                .Include("Edges.Interface.OutputTerminal.Attributes")
                .Include(x => x.Nodes)
                .Include("Nodes.Attributes")
                .Include("Nodes.Connectors")
                .Include("Nodes.Connectors.Attributes")
                .Include("Nodes.Simples")
                .Include("Nodes.Simples.Attributes")
                .AsSplitQuery()
                .OrderByDescending(x => x.Name)
                .FirstOrDefaultAsync();

            return project;
        }

        public IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number)
        {
            if (string.IsNullOrEmpty(name))
                return GetAll()
                    .OrderByDescending(x => x.Updated)
                    .Skip(from)
                    .Take(number)
                    .ProjectTo<ProjectItemCm>(_mapper.ConfigurationProvider)
                    .ToList();

            return GetAll()
                .Where(x => x.Name.ToLower().StartsWith(name.ToLower()))
                .OrderByDescending(x => x.Updated)
                .Skip(from)
                .Take(number)
                .ProjectTo<ProjectItemCm>(_mapper.ConfigurationProvider)
                .ToList();
        }
    }
}