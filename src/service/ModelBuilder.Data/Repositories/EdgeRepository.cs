using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;
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
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;

        public EdgeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository, IConnectorRepository connectorRepository, IOptions<ModelBuilderConfiguration> modelBuilderConfiguration, IHttpContextAccessor contextAccessor) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
            _connectorRepository = connectorRepository;
            _contextAccessor = contextAccessor;
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;
        }

        public IEnumerable<Edge> UpdateInsert(ICollection<Edge> original, Project project, string invokedByDomain)
        {
            if (project?.Edges == null || !project.Edges.Any() || original == null)
                yield break;

            var newEdges = project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList();

            foreach (var edge in project.Edges)
            {
                ResetEdgeBeforeSave(edge);
                
                if (newEdges.Any(x => x.Id == edge.Id))
                {
                    if (edge.MasterProjectId != project.Id)
                    {
                        Attach(edge, EntityState.Unchanged);
                        yield return edge;
                        continue;
                    }

                    SetEdgeProperties(edge, true);

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Added);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Added);

                    Attach(edge, EntityState.Added);
                }
                else
                {
                    if (edge.MasterProjectId != project.Id)
                        continue;

                    // Parties is not allowed changed our edge
                    if (_modelBuilderConfiguration.Domain == edge.Domain && _modelBuilderConfiguration.Domain != invokedByDomain)
                    {
                        Detach(edge);
                        continue;
                    }

                    SetEdgeProperties(edge, false);

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Modified);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Modified);

                    Attach(edge, EntityState.Modified);
                }
            }
        }
        
        public async Task<IEnumerable<Edge>> DeleteEdges(ICollection<Edge> delete, string projectId, string invokedByDomain)
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
            }

            return subEdges;
        }

        private void ResetEdgeBeforeSave(Edge edge)
        {
            edge.FromConnector = null;
            edge.ToConnector = null;
            edge.FromNode = null;
            edge.ToNode = null;
        }

        private void SetEdgeProperties(Edge edge, bool isNewEdge)
        {
            var dateTimeNow = DateTime.Now.ToUniversalTime();
            var contextAccessorName = _contextAccessor.GetName();

            if (!string.IsNullOrWhiteSpace(edge?.Transport?.UpdatedBy))
                edge.Transport.UpdatedBy = contextAccessorName;

            if (edge?.Transport?.Updated != null)
                edge.Transport.Updated = dateTimeNow;

            if (string.IsNullOrWhiteSpace(edge?.Transport?.StatusId))
            {
                if(edge?.Transport != null)
                    edge.Transport.StatusId = ObjectType.NotSet.ToString();
            }

            if (!string.IsNullOrWhiteSpace(edge?.Interface?.UpdatedBy))
                edge.Interface.UpdatedBy = contextAccessorName;

            if (edge?.Interface?.Updated != null)
                edge.Interface.Updated = dateTimeNow;

            if (string.IsNullOrWhiteSpace(edge?.Interface?.StatusId))
            {
                if (edge?.Interface != null)
                    edge.Interface.StatusId = ObjectType.NotSet.ToString();
            }

            if (!isNewEdge)
                return;

            //TODO: Versioning

            const string version = "1.0";

            if(!string.IsNullOrWhiteSpace(edge?.Transport?.Version))
                edge.Transport.Version = version;

            if (!string.IsNullOrWhiteSpace(edge?.Transport?.CreatedBy))
                edge.Transport.CreatedBy = contextAccessorName;

            if (edge?.Transport?.Created != null)
                edge.Transport.Created = dateTimeNow;

            if (!string.IsNullOrWhiteSpace(edge?.Interface?.Version))
                edge.Interface.Version = version;

            if (!string.IsNullOrWhiteSpace(edge?.Interface?.CreatedBy))
                edge.Interface.CreatedBy = contextAccessorName;

            if (edge?.Interface?.Created != null)
                edge.Interface.Created = dateTimeNow;
        }
    }
}