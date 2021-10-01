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

            if (delete == null || projectId == null || !delete.Any())
                return subEdges;

            foreach (var edge in delete)
            {
                if (edge.MasterProjectId != null && edge.MasterProjectId != projectId)
                {
                    subEdges.Add(edge);
                    continue;
                }

                //Attributes - Transport (delete)
                if(edge.Transport?.Attributes != null && edge.Transport.Attributes.Any())
                    _attributeRepository.Attach(edge.Transport.Attributes, EntityState.Deleted);

                //Attributes - Interface (delete)
                if (edge.Interface?.Attributes != null && edge.Interface.Attributes.Any())
                    _attributeRepository.Attach(edge.Interface.Attributes, EntityState.Deleted);

                //Attributes - Terminal transport (delete)
                if (edge.Transport?.InputTerminalId != null && edge.Transport?.OutputTerminalId != null)
                {
                    var terminalTransportAttributes = _attributeRepository.FindBy(x =>
                        x.TerminalId == edge.Transport.InputTerminalId ||
                        x.TerminalId == edge.Transport.OutputTerminalId).ToList();

                    if(terminalTransportAttributes.Any())
                        _attributeRepository.Attach(terminalTransportAttributes, EntityState.Deleted);
                }

                //Attributes - Terminal Interface (delete)
                if (edge.Interface?.InputTerminalId != null && edge.Interface?.OutputTerminalId != null)
                {
                    var terminalInterfaceAttributes = _attributeRepository.FindBy(x =>
                        x.TerminalId == edge.Interface.InputTerminalId ||
                        x.TerminalId == edge.Interface.OutputTerminalId).ToList();

                    if(terminalInterfaceAttributes.Any())
                        _attributeRepository.Attach(terminalInterfaceAttributes, EntityState.Deleted);
                }

                //Transport - (delete)
                if(edge.Transport != null)
                    _transportRepository.Attach(edge.Transport, EntityState.Deleted);

                //Interface - (delete)
                if (edge.Interface != null)
                    _interfaceRepository.Attach(edge.Interface, EntityState.Deleted);

                //Edge - (delete)
                Attach(edge, EntityState.Deleted);

                //Terminal - Transport output (delete) 
                if (edge.Transport?.InputTerminalId != null)
                    await _connectorRepository.Delete(edge.Transport.InputTerminalId);

                //Terminal - Transport input (delete)
                if (edge.Transport?.OutputTerminalId != null)
                    await _connectorRepository.Delete(edge.Transport.OutputTerminalId);

                //Terminal - Interface input (delete)
                if (edge.Interface?.InputTerminalId != null)
                    await _connectorRepository.Delete(edge.Interface.InputTerminalId);

                //Terminal - Interface output (delete)
                if (edge.Interface?.OutputTerminalId != null)
                    await _connectorRepository.Delete(edge.Interface.OutputTerminalId);
            }

            return subEdges;
        }
    }
}