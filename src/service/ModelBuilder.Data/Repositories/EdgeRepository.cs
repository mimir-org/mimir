using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Workers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mb.Data.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly ITransportRepository _transportRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;

        public EdgeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository, IConnectorRepository connectorRepository, IOptions<ModelBuilderConfiguration> modelBuilderConfiguration) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
            _connectorRepository = connectorRepository;
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;
        }

        public Task UpdateInsert(ProjectWorker projectWorker, ICollection<Edge> original, Project project, string invokedByDomain)
        {
            if (project?.Edges == null || !project.Edges.Any() || original == null)
                return Task.CompletedTask;

            var newEdges = project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList();

            foreach (var edge in project.Edges)
            {
                ResetEdgeBeforeSave(edge);
                
                if (newEdges.Any(x => x.Id == edge.Id))
                {
                    if (edge.MasterProjectId != project.Id)
                    {
                        Attach(edge, EntityState.Unchanged);
                        projectWorker.Edges.Add(new EdgeWorker { Edge = edge, WorkerStatus = WorkerStatus.Create, IsSubProjectEdge = true });
                        continue;
                    }

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Added);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Added);
                    projectWorker.Edges.Add(new EdgeWorker { Edge = edge, WorkerStatus = WorkerStatus.Create });
                    Attach(edge, EntityState.Added);
                }
                else
                {
                    if (edge.MasterProjectId != project.Id)
                    {
                        Attach(edge, EntityState.Unchanged);
                        continue;
                    }

                    // Parties is not allowed changed our edge
                    if (_modelBuilderConfiguration.Domain == edge.Domain && _modelBuilderConfiguration.Domain != invokedByDomain)
                    {
                        Detach(edge);
                        continue;
                    }

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Modified);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Modified);
                    projectWorker.Edges.Add(new EdgeWorker { Edge = edge, WorkerStatus = WorkerStatus.Update });
                    Attach(edge, EntityState.Modified);
                }
            }

            return Task.CompletedTask;
        }

        public async Task DeleteEdges(ProjectWorker projectWorker, ICollection<Edge> delete, string projectId, string invokedByDomain)
        {
            if (delete == null || projectId == null || !delete.Any())
                return;

            foreach (var edge in delete)
            {
                if (edge.MasterProjectId != null && edge.MasterProjectId != projectId)
                {
                    projectWorker.Edges.Add(new EdgeWorker { Edge = edge, WorkerStatus = WorkerStatus.Delete, IsSubProjectEdge = true });
                    continue;
                }

                // Parties is not allowed delete our edge
                if (_modelBuilderConfiguration.Domain == edge.Domain && _modelBuilderConfiguration.Domain != invokedByDomain)
                {
                    Detach(edge);
                    continue;
                }

                //Attributes - Transport (delete)
                if (edge.Transport?.Attributes != null && edge.Transport.Attributes.Any())
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

                projectWorker.Edges.Add(new EdgeWorker { Edge = edge, WorkerStatus = WorkerStatus.Delete });

            }
        }

        private void ResetEdgeBeforeSave(Edge edge)
        {
            edge.FromConnector = null;
            edge.ToConnector = null;
            edge.FromNode = null;
            edge.ToNode = null;
        }
    }
}