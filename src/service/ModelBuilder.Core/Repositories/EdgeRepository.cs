using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly ITransportRepository _transportRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly IConnectorRepository _connectorRepository;

        public EdgeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository, IConnectorRepository connectorRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
            _connectorRepository = connectorRepository;
        }

        public IEnumerable<Edge> UpdateInsert(ICollection<Edge> original, Project project)
        {
            if (project?.Edges == null || !project.Edges.Any() || original == null)
                yield break;

            var newEdges = project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList();

            foreach (var edge in project.Edges)
            {
                if (newEdges.Any(x => x.Id == edge.Id))
                {
                    if (edge.MasterProjectId != project.Id)
                    {
                        Attach(edge, EntityState.Unchanged);
                        yield return edge;
                        continue;
                    }

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Added);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Added);
                    Attach(edge, EntityState.Added);
                }
                else
                {
                    if (edge.MasterProjectId != project.Id)
                        continue;

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Modified);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Modified);
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
                {
                    foreach (var transportAttribute in edge.Transport.Attributes)
                    {
                        await _attributeRepository.Delete(transportAttribute.Id);
                    }
                }


                if (edge.Interface?.Attributes != null)
                {
                    foreach (var interfaceAttribute in edge.Interface.Attributes)
                    {
                        await _attributeRepository.Delete(interfaceAttribute.Id);
                    }
                }

                if (edge.Transport != null)
                {
                    
                    await _transportRepository.Delete(edge.Transport.Id);
                    
                    var transportAttributes = _attributeRepository.FindBy(x =>
                        x.TerminalId == edge.Transport.InputTerminalId ||
                        x.TerminalId == edge.Transport.OutputTerminalId);

                    foreach (var transportAttribute in transportAttributes)
                    {
                        await _attributeRepository.Delete(transportAttribute.Id);
                    }

                    //await _connectorRepository.Delete(edge.Transport?.InputTerminalId);
                    //await _connectorRepository.Delete(edge.Transport?.OutputTerminalId);
                }

                if (edge.Interface != null)
                {
                    await _interfaceRepository.Delete(edge.Interface.Id);

                    var interfaceAttributes = _attributeRepository.FindBy(x =>
                        x.TerminalId == edge.Transport.InputTerminalId ||
                        x.TerminalId == edge.Transport.OutputTerminalId);

                    foreach (var interfaceAttribute in interfaceAttributes)
                    {
                        await _attributeRepository.Delete(interfaceAttribute.Id);
                    }

                    //await _connectorRepository.Delete(edge.Interface?.InputTerminalId);
                    //await _connectorRepository.Delete(edge.Interface?.OutputTerminalId);
                }

                await Delete(edge.Id);
            }

            return subEdges;
        }
    }
}
