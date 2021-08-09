using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Mb.Core.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly ITransportRepository _transportRepository;
        private readonly IInterfaceRepository _interfaceRepository;

        public EdgeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
        }

        public IEnumerable<Edge> UpdateInsert(ICollection<Edge> original, Project project)
        {
            if (project?.Edges == null || !project.Edges.Any())
                yield break;

            var updates = original != null
                ? project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Edge>();

            foreach (var edge in project.Edges)
            {
                if (updates.Any(x => x.Id == edge.Id))
                {
                    if (edge.MasterProjectId != project.Id)
                    {
                        Attach(edge, EntityState.Unchanged);
                        yield return edge;
                        continue;
                    }

                    if (edge.Transport != null)
                    {
                        if (edge.Transport?.Attributes != null)
                        {
                            foreach (var attribute in edge.Transport.Attributes)
                            {
                                attribute.UnitString = attribute.Units != null
                                    ? JsonConvert.SerializeObject(attribute.Units)
                                    : null;
                                _attributeRepository.Attach(attribute, EntityState.Added);
                            }
                        }
                        _transportRepository.Attach(edge.Transport, EntityState.Added);
                    }

                    if (edge.Interface != null)
                    {
                        _interfaceRepository.Attach(edge.Interface, EntityState.Added);
                    }

                    Attach(edge, EntityState.Added);
                }
                else
                {
                    if (edge.MasterProjectId != project.Id)
                        continue;

                    if (edge.Transport != null)
                    {
                        if (edge.Transport?.Attributes != null)
                        {
                            foreach (var attribute in edge.Transport.Attributes)
                            {
                                attribute.UnitString = attribute.Units != null
                                    ? JsonConvert.SerializeObject(attribute.Units)
                                    : null;
                                _attributeRepository.Attach(attribute, EntityState.Modified);
                            }
                        }
                        _transportRepository.Attach(edge.Transport, EntityState.Modified);
                    }

                    if (edge.Interface != null)
                    {
                        _interfaceRepository.Attach(edge.Interface, EntityState.Modified);
                    }

                    Attach(edge, EntityState.Modified);
                }
            }
        }

        public async Task<IEnumerable<Edge>> DeleteEdges(ICollection<Edge> delete, string projectId)
        {
            var subEdges = new List<Edge>();

            foreach (var edge in delete)
            {
                if (edge.MasterProjectId != projectId)
                {
                    subEdges.Add(edge);
                    continue;
                }

                if (edge.Transport?.Attributes != null)
                    _attributeRepository.Attach(edge.Transport.Attributes, EntityState.Deleted);

                if (edge.Transport != null)
                    await _transportRepository.Delete(edge.Transport.Id);

                if (edge.Interface != null)
                    await _interfaceRepository.Delete(edge.Interface.Id);

                await Delete(edge.Id);
            }

            return subEdges;
        }
    }
}
