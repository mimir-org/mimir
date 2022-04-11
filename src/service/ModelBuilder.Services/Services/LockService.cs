using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SqlBulkTools;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Services.Services
{
    public class LockService : ILockService
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly INodeRepository _nodeRepository;
        private readonly IEdgeRepository _edgeRepository;
        private readonly ITransportRepository _transportRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly ICooperateService _cooperateService;
        private readonly ISimpleRepository _simpleRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly DatabaseConfiguration _databaseConfiguration;

        public LockService(INodeRepository nodeRepository, IEdgeRepository edgeRepository, IConnectorRepository connectorRepository,
            IAttributeRepository attributeRepository, ICooperateService cooperateService, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository, ISimpleRepository simpleRepository, IHttpContextAccessor contextAccessor, IOptions<DatabaseConfiguration> databaseConfiguration)
        {
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _cooperateService = cooperateService;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
            _simpleRepository = simpleRepository;
            _contextAccessor = contextAccessor;
            _databaseConfiguration = databaseConfiguration?.Value;
        }

        /// <summary>
        /// Returns a list of all locked attributes id's
        /// If param 'projectId' is null all locked attributes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked attribute id></returns>
        public IEnumerable<string> GetLockedAttributes(string projectId)
        {
            return string.IsNullOrWhiteSpace(projectId)
                ? _attributeRepository.FindBy(x => x.IsLocked).Select(x => x.Id)
                : _attributeRepository.FindBy(x => x.IsLocked && x.Node.MasterProjectId == projectId).Select(x => x.Id);
        }

        /// <summary>
        /// Returns a list of all locked edges id's
        /// If param 'projectId' is null all locked edges in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked edges id></returns>
        public IEnumerable<string> GetLockedEdges(string projectId)
        {
            return string.IsNullOrWhiteSpace(projectId)
                ? _edgeRepository.FindBy(x => x.IsLocked).Select(y => y.Id)
                : _edgeRepository.FindBy(x => x.IsLocked && x.MasterProjectId == projectId).Select(y => y.Id);
        }

        /// <summary>
        /// Returns a list of all locked nodes id's
        /// If param 'projectId' is null all locked nodes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked node id></returns>
        public IEnumerable<string> GetLockedNodes(string projectId)
        {
            return string.IsNullOrWhiteSpace(projectId)
                ? _nodeRepository.FindBy(x => x.IsLocked).Select(x => x.Id)
                : _nodeRepository.FindBy(x => x.IsLocked && x.MasterProjectId == projectId).Select(x => x.Id);
        }

        /// <summary>
        /// Lock or unlock an attribute
        /// </summary>
        /// <param name="lockAttributeAm"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockAttribute(LockAttributeAm lockAttributeAm)
        {
            if (lockAttributeAm?.Id == null || lockAttributeAm.ProjectId == null)
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Attribute: Id or projectId can't be null or empty.");

            var userName = _contextAccessor.GetName();
            var dateTimeNow = DateTime.Now.ToUniversalTime();
            var allAttributes = _attributeRepository.GetAll();
            var allSimple = _simpleRepository.GetAll();
            var lockObject = new LockObject();

            var tempLockObject = GetAttributeUpdated(lockAttributeAm, userName, dateTimeNow, allAttributes, allSimple);
            lockObject.Attributes.AddRange(tempLockObject.Attributes);
            lockObject.LockAttributeAms.AddRange(tempLockObject.LockAttributeAms);

            //Save to database
            using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
            {
                await using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
                {
                    _attributeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockObject.Attributes);
                }

                trans.Complete();
            }

            await _cooperateService.SendLockAttributeUpdates(lockObject.LockAttributeAms, WorkerStatus.Update, lockAttributeAm.ProjectId);
        }

        /// <summary>
        /// Lock or unlock an attribute
        /// </summary>
        /// <param name="lockEdgeAm"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockEdge(LockEdgeAm lockEdgeAm)
        {
            if (lockEdgeAm?.Id == null || lockEdgeAm.ProjectId == null)
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Edge: Id or projectId can't be null or empty.");

            var userName = _contextAccessor.GetName();
            var dateTimeNow = DateTime.Now.ToUniversalTime();
            var allAttributes = _attributeRepository.GetAll();
            var allEdges = _edgeRepository.GetAll().Where(x => x.ProjectId == lockEdgeAm.ProjectId);
            var allConnectors = _connectorRepository.GetAll();
            var allTransports = _transportRepository.GetAll();
            var allInterfaces = _interfaceRepository.GetAll();
            var allSimple = _simpleRepository.GetAll();
            var lockObject = new LockObject();

            var tempLockObject = GetEdgeUpdated(lockEdgeAm, userName, dateTimeNow, allAttributes, allEdges, allConnectors, allTransports, allInterfaces, allSimple);
            lockObject.Edge.AddRange(tempLockObject.Edge);
            lockObject.LockEdgeAms.AddRange(tempLockObject.LockEdgeAms);

            //Save edges and attributes to database
            using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
            {
                await using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
                {
                    _edgeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockObject.Edge);
                    _attributeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockObject.Attributes);
                }

                trans.Complete();
            }

            await _cooperateService.SendLockEdgeUpdates(lockObject.LockEdgeAms, WorkerStatus.Update, lockEdgeAm.ProjectId);
            await _cooperateService.SendLockAttributeUpdates(lockObject.LockAttributeAms, WorkerStatus.Update, lockEdgeAm.ProjectId);
        }

        /// <summary>
        /// Locks or unlocks a node (including all attributes on the node) and all children nodes and attributes
        /// </summary>
        /// <param name="lockNodeAm"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockNode(LockNodeAm lockNodeAm)
        {
            if (lockNodeAm?.Id == null || lockNodeAm.ProjectId == null)
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Node: Id or projectId can't be null or empty.");

            var allNodes = _nodeRepository.GetAll().Where(x => x.ProjectId == lockNodeAm.ProjectId);
            var node = allNodes.FirstOrDefault(x => x.Id == lockNodeAm.Id);

            if (node == null)
                throw new ModelBuilderNotFoundException($"Error locking/unlocking Node: Node with id {lockNodeAm.Id} not found.");

            var userName = _contextAccessor.GetName();
            var dateTimeNow = DateTime.Now.ToUniversalTime();
            var allEdges = _edgeRepository.GetAll().Where(x => x.ProjectId == lockNodeAm.ProjectId);
            var allAttributes = _attributeRepository.GetAll();
            var allConnectors = _connectorRepository.GetAll();
            var allTransports = _transportRepository.GetAll();
            var allInterfaces = _interfaceRepository.GetAll();
            var allSimple = _simpleRepository.GetAll();
            var lockObject = new LockObject();

            LockNodesRecursive(node, lockNodeAm, userName, dateTimeNow, allNodes, allConnectors, allAttributes, allEdges, allTransports, allInterfaces, allSimple, lockObject);

            //Save nodes, edges and attributes to database
            using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
            {
                await using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
                {
                    _nodeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockObject.Node);
                    _edgeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockObject.Edge);
                    _attributeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockObject.Attributes);
                }

                trans.Complete();
            }

            await _cooperateService.SendLockNodeUpdates(lockObject.LockNodeAms, WorkerStatus.Update, lockNodeAm.ProjectId);
            await _cooperateService.SendLockEdgeUpdates(lockObject.LockEdgeAms, WorkerStatus.Update, lockNodeAm.ProjectId);
            await _cooperateService.SendLockAttributeUpdates(lockObject.LockAttributeAms, WorkerStatus.Update, lockNodeAm.ProjectId);
        }

        #region Private

        private LockObject GetAttributeUpdated(LockAttributeAm lockAttributeAm, string userName, DateTime dateTimeNow,
            IQueryable<Attribute> allAttributes, IQueryable<Simple> allSimple)
        {
            var lockObject = new LockObject();

            var attribute = allAttributes.FirstOrDefault(x => x.Id == lockAttributeAm.Id);

            if (attribute == null)
                throw new ModelBuilderNotFoundException($"Attribute with id {lockAttributeAm.Id} not found");

            if (attribute.IsLocked == lockAttributeAm.IsLocked)
                return lockObject;

            lockAttributeAm.IsLockedStatusBy = userName;
            lockAttributeAm.IsLockedStatusDate = dateTimeNow;
            lockAttributeAm.NodeId = attribute.NodeId;
            lockAttributeAm.TransportId = attribute.TransportId;
            lockAttributeAm.InterfaceId = attribute.InterfaceId;
            lockAttributeAm.CompositeId = attribute.SimpleId;
            lockAttributeAm.TerminalId = attribute.TerminalId;

            if (!string.IsNullOrWhiteSpace(lockAttributeAm.CompositeId) && string.IsNullOrWhiteSpace(lockAttributeAm.NodeId))
            {
                var simple = allSimple.FirstOrDefault(x => x.Id == lockAttributeAm.CompositeId);

                if (simple != null)
                    lockAttributeAm.NodeId = simple.NodeId;
            }

            attribute.IsLocked = lockAttributeAm.IsLocked;
            attribute.IsLockedStatusBy = lockAttributeAm.IsLockedStatusBy;
            attribute.IsLockedStatusDate = lockAttributeAm.IsLockedStatusDate;

            lockObject.Attributes.Add(attribute);
            lockObject.LockAttributeAms.Add(lockAttributeAm);

            return lockObject;
        }

        private LockObject GetEdgeUpdated(LockEdgeAm lockEdgeAm, string userName, DateTime dateTimeNow,
            IQueryable<Attribute> allAttributes, IQueryable<Edge> allEdges, IQueryable<Connector> allConnectors,
            IQueryable<Transport> allTransports, IQueryable<Interface> allInterfaces, IQueryable<Simple> allSimple)
        {
            var lockObject = new LockObject();

            var edge = allEdges.FirstOrDefault(x => x.Id == lockEdgeAm.Id);

            if (edge == null)
                throw new ModelBuilderNotFoundException($"Edge with id {lockEdgeAm.Id} not found");

            if (edge.IsLocked == lockEdgeAm.IsLocked)
                return lockObject;

            lockEdgeAm.IsLockedStatusBy = userName;
            lockEdgeAm.IsLockedStatusDate = dateTimeNow;

            edge.IsLocked = lockEdgeAm.IsLocked;
            edge.IsLockedStatusBy = lockEdgeAm.IsLockedStatusBy;
            edge.IsLockedStatusDate = lockEdgeAm.IsLockedStatusDate;

            lockObject.Edge.Add(edge);
            lockObject.LockEdgeAms.Add(lockEdgeAm);

            //Find all attributes for the edge
            var edgeConnectors = allConnectors.Where(x => x.Id == edge.FromConnectorId || x.Id == edge.ToConnectorId);

            Transport transportObject = null;
            if (!string.IsNullOrEmpty(edge.TransportId))
                transportObject = allTransports.FirstOrDefault(x => x.Id == edge.TransportId);

            Interface interfaceObject = null;
            if (!string.IsNullOrWhiteSpace(edge.InterfaceId))
                interfaceObject = allInterfaces.FirstOrDefault(x => x.Id == edge.InterfaceId);

            IQueryable<Attribute> edgeAttributes;

            if (transportObject == null && interfaceObject == null)
            {
                edgeAttributes = allAttributes.Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId)).AsSplitQuery();
            }

            else if (transportObject != null && interfaceObject == null)
            {
                edgeAttributes = allAttributes
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                                x.TerminalId == transportObject.InputTerminalId ||
                                x.TerminalId == transportObject.OutputTerminalId).AsSplitQuery();
            }

            else if (transportObject == null)
            {
                edgeAttributes = allAttributes
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                                x.TerminalId == interfaceObject.InputTerminalId ||
                                x.TerminalId == interfaceObject.OutputTerminalId).AsSplitQuery();
            }

            else
            {
                edgeAttributes = allAttributes
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                                x.TerminalId == transportObject.InputTerminalId ||
                                x.TerminalId == transportObject.OutputTerminalId ||
                                x.TerminalId == interfaceObject.InputTerminalId ||
                                x.TerminalId == interfaceObject.OutputTerminalId).AsSplitQuery();
            }

            foreach (var attribute in edgeAttributes)
            {
                var lockAttributeAm = new LockAttributeAm {Id = attribute.Id, IsLocked = lockEdgeAm.IsLocked, IsLockedStatusBy = userName, IsLockedStatusDate = dateTimeNow};
                var tempLockObject = GetAttributeUpdated(lockAttributeAm, userName, dateTimeNow, allAttributes, allSimple);
                lockObject.LockAttributeAms.AddRange(tempLockObject.LockAttributeAms);
                lockObject.Attributes.AddRange(tempLockObject.Attributes);
            }

            return lockObject;
        }

        private void LockNodesRecursive(Node node, LockNodeAm lockNodeAm, string userName, DateTime dateTimeNow,
            IQueryable<Node> allNodes, IQueryable<Connector> allConnectors, IQueryable<Attribute> allAttributes,
            IQueryable<Edge> allEdges, IQueryable<Transport> allTransports, IQueryable<Interface> allInterfaces,
            IQueryable<Simple> allSimple, LockObject lockObject)
        {
            if (node == null)
                return;

            lockNodeAm.Id = node.Id;
            lockNodeAm.IsLockedStatusBy = userName;
            lockNodeAm.IsLockedStatusDate = dateTimeNow;

            //Node lock/unlock
            if (node.IsLocked != lockNodeAm.IsLocked)
            {
                node.IsLocked = lockNodeAm.IsLocked;
                node.IsLockedStatusBy = lockNodeAm.IsLockedStatusBy;
                node.IsLockedStatusDate = lockNodeAm.IsLockedStatusDate;

                lockObject.Node.Add(node);
                lockObject.LockNodeAms.Add(lockNodeAm);

                //Find all node attributes
                var nodeConnectors = allConnectors.Where(x => x.NodeId == node.Id);
                var attributes = allAttributes.Where(x => nodeConnectors.Any(y => y.Id == x.TerminalId || x.NodeId != null && x.NodeId == node.Id));

                //Node attributes lock/unlock
                foreach (var attribute in attributes)
                {
                    var lockAttributeAm = new LockAttributeAm {Id = attribute.Id, IsLocked = lockNodeAm.IsLocked};
                    var tempLockObject = GetAttributeUpdated(lockAttributeAm, userName, dateTimeNow, allAttributes, allSimple);
                    lockObject.Attributes.AddRange(tempLockObject.Attributes);
                    lockObject.LockAttributeAms.AddRange(tempLockObject.LockAttributeAms);
                }
            }

            var edgesInProject = allEdges.Where(x => x.FromNodeId == node.Id);

            //Edge lock/unlock (including all edge attributes)
            foreach (var edge in edgesInProject)
            {
                var lockEdgeAm = new LockEdgeAm
                {
                    Id = edge.Id,
                    IsLocked = lockNodeAm.IsLocked,
                    IsLockedStatusBy = userName,
                    IsLockedStatusDate = dateTimeNow,
                    ProjectId = lockNodeAm.ProjectId
                };

                var tempLockObject = GetEdgeUpdated(lockEdgeAm, userName, dateTimeNow, allAttributes, allEdges, allConnectors, allTransports, allInterfaces, allSimple);
                lockObject.Edge.AddRange(tempLockObject.Edge);
                lockObject.LockEdgeAms.AddRange(tempLockObject.LockEdgeAms);
                lockObject.Attributes.AddRange(tempLockObject.Attributes);
                lockObject.LockAttributeAms.AddRange(tempLockObject.LockAttributeAms);

                var childNode = allNodes.FirstOrDefault(x => x.Id == edge.ToNodeId);

                if (childNode != null && childNode.Level <= node.Level)
                    continue;

                LockNodesRecursive(childNode, lockNodeAm, userName, dateTimeNow, allNodes, allConnectors, allAttributes, allEdges, allTransports, allInterfaces, allSimple, lockObject);
            }
        }

        #endregion Private
    }

    public class LockObject
    {
        public List<Attribute> Attributes = new List<Attribute>();
        public List<LockAttributeAm> LockAttributeAms = new List<LockAttributeAm>();

        public List<Edge> Edge = new List<Edge>();
        public List<LockEdgeAm> LockEdgeAms = new List<LockEdgeAm>();

        public List<Node> Node = new List<Node>();
        public List<LockNodeAm> LockNodeAms = new List<LockNodeAm>();
    }
}