using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;
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

        public LockService(INodeRepository nodeRepository, IEdgeRepository edgeRepository, IConnectorRepository connectorRepository, 
            IAttributeRepository attributeRepository, ICooperateService cooperateService, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository, ISimpleRepository simpleRepository)
        {
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _cooperateService = cooperateService;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
            _simpleRepository = simpleRepository;
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
        /// <param name="save"></param>
        /// <param name="userName"></param>
        /// <param name="dateTimeNow"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockAttribute(LockAttributeAm lockAttributeAm, bool save, string userName, DateTime dateTimeNow)
        {
            if (string.IsNullOrWhiteSpace(lockAttributeAm?.Id))
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Attribute: Id or projectId can't be null or empty.");

            var attribute = await _attributeRepository.GetAsync(lockAttributeAm.Id);

            if (attribute == null || attribute.IsLocked == lockAttributeAm.IsLocked)
                return;

            attribute.IsLocked = lockAttributeAm.IsLocked;
            attribute.IsLockedStatusBy = userName;
            attribute.IsLockedStatusDate = dateTimeNow;

            lockAttributeAm.IsLockedStatusBy = attribute.IsLockedStatusBy;
            lockAttributeAm.IsLockedStatusDate = attribute.IsLockedStatusDate;
            lockAttributeAm.NodeId = attribute.NodeId;
            lockAttributeAm.TransportId = attribute.TransportId;
            lockAttributeAm.InterfaceId = attribute.InterfaceId;
            lockAttributeAm.CompositeId = attribute.SimpleId;
            lockAttributeAm.TerminalId = attribute.TerminalId;

            if (!string.IsNullOrWhiteSpace(lockAttributeAm.CompositeId) && string.IsNullOrWhiteSpace(lockAttributeAm.NodeId))
            {
                var simple = _simpleRepository.FindBy(x => x.Id == lockAttributeAm.CompositeId)?.First();

                if (simple != null)
                    lockAttributeAm.NodeId = simple.NodeId;
            }

            if (save)
            {
                await _attributeRepository.SaveAsync();

                //WebSocket - send attribute to client
                await _cooperateService.SendLockAttributeUpdates(
                    new List<(LockAttributeAm am, WorkerStatus workerStatus)>
                        { (lockAttributeAm, WorkerStatus.Update) }, lockAttributeAm.ProjectId);
            }
        }

        /// <summary>
        /// Lock or unlock an attribute
        /// </summary>
        /// <param name="lockEdgeAm"></param>
        /// <param name="save"></param>
        /// <param name="userName"></param>
        /// <param name="dateTimeNow"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockEdge(LockEdgeAm lockEdgeAm, bool save, string userName, DateTime dateTimeNow)
        {
            if (string.IsNullOrWhiteSpace(lockEdgeAm?.Id) || string.IsNullOrWhiteSpace(lockEdgeAm.ProjectId))
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Edge: Id or projectId can't be null or empty.");

            var edge = await _edgeRepository.GetAsync(lockEdgeAm.Id);

            if (edge == null)
                return;

            //Edge lock/unlockt
            if (edge.IsLocked != lockEdgeAm.IsLocked)
            {
                edge.IsLocked = lockEdgeAm.IsLocked;
                edge.IsLockedStatusBy = userName;
                edge.IsLockedStatusDate = dateTimeNow;

                lockEdgeAm.IsLockedStatusBy = edge.IsLockedStatusBy;
                lockEdgeAm.IsLockedStatusDate = edge.IsLockedStatusDate;

                if (save)
                    await _edgeRepository.SaveAsync();
            }

            //WebSocket - send edge to client
            await _cooperateService.SendLockEdgeUpdates(
                new List<(LockEdgeAm am, WorkerStatus workerStatus)> 
                    { (lockEdgeAm, WorkerStatus.Update) }, lockEdgeAm.ProjectId);

            //Find all edge attributes
            var edgeConnectors = _connectorRepository.GetAll(false).Where(x => x.Id == edge.FromConnectorId || x.Id == edge.ToConnectorId);
            
            Transport transportObject = null;
            if(!string.IsNullOrEmpty(edge.TransportId))
                transportObject = _transportRepository.FindBy(x => x.Id == edge.TransportId)?.FirstOrDefault();

            Interface interfaceObject = null;
            if(!string.IsNullOrWhiteSpace(edge.InterfaceId))
                interfaceObject = _interfaceRepository.FindBy(x => x.Id == edge.InterfaceId)?.FirstOrDefault();

            IQueryable<Attribute> edgeAttributes;

            if (transportObject == null && interfaceObject == null)
            {
                edgeAttributes = _attributeRepository.GetAll(false)
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId)).AsSplitQuery();
            }

            else if (transportObject != null && interfaceObject == null)
            {
                edgeAttributes = _attributeRepository.GetAll(false)
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                                x.TerminalId == transportObject.InputTerminalId ||
                                x.TerminalId == transportObject.OutputTerminalId).AsSplitQuery();
            }

            else if (transportObject == null)
            {
                edgeAttributes = _attributeRepository.GetAll(false)
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                                x.TerminalId == interfaceObject.InputTerminalId ||
                                x.TerminalId == interfaceObject.OutputTerminalId).AsSplitQuery();
            }

            else
            {
                edgeAttributes = _attributeRepository.GetAll(false)
                    .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                                x.TerminalId == transportObject.InputTerminalId ||
                                x.TerminalId == transportObject.OutputTerminalId ||
                                x.TerminalId == interfaceObject.InputTerminalId ||
                                x.TerminalId == interfaceObject.OutputTerminalId).AsSplitQuery();
            }

            //Edge attributes lock/unlock
            foreach (var attribute in edgeAttributes)
            {
                var lockAttribute = new LockAttributeAm { Id = attribute.Id, IsLocked = lockEdgeAm.IsLocked};
                await LockAttribute(lockAttribute, false, userName, dateTimeNow);
            }

            if(save)
                await _attributeRepository.SaveAsync();
        }

        /// <summary>
        /// Locks or unlocks a node (including all attributes on the node) and all children nodes and attributes
        /// </summary>
        /// <param name="lockNodeAm"></param>
        /// <param name="userName"></param>
        /// <param name="dateTimeNow"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockNode(LockNodeAm lockNodeAm, string userName, DateTime dateTimeNow)
        {
            if (lockNodeAm?.Id == null || lockNodeAm.ProjectId == null)
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Node: Id or projectId can't be null or empty.");

            var allEdgesInProject = _edgeRepository.GetAll(false).Where(x => x.ProjectId == lockNodeAm.ProjectId);
            
            if(!allEdgesInProject.Any())
                return;

            var allNodesInProject = _nodeRepository.GetAll(false).Where(x => x.ProjectId == lockNodeAm.ProjectId);
            var node = allNodesInProject.FirstOrDefault(x => x.Id == lockNodeAm.Id);

            if(node == null)
                return;

            var allConnectors = _connectorRepository.GetAll(false);
            var allAttributes = _attributeRepository.GetAll(false);

            LockNodesRecursive(node, lockNodeAm, userName, dateTimeNow, allNodesInProject, allConnectors, allAttributes, allEdgesInProject);

            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();
            await _attributeRepository.SaveAsync();
        }

        #region Private

        
        private async void LockNodesRecursive(Node node, LockNodeAm lockNodeAm, string userName, DateTime dateTimeNow,
            IQueryable<Node> allNodesInProject, IQueryable<Connector> allConnectors, IQueryable<Attribute> allAttributes, IQueryable<Edge> allEdgesInProject)
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

                //WebSocket - send to client
                await _cooperateService.SendLockNodeUpdates(
                    new List<(LockNodeAm am, WorkerStatus workerStatus)>
                    { (lockNodeAm, WorkerStatus.Update) }, lockNodeAm.ProjectId);

                //Find all node attributes
                var nodeConnectors = allConnectors.Where(x => x.NodeId == node.Id);
                var attributes = allAttributes.Where(x => nodeConnectors.Any(y => y.Id == x.TerminalId || x.NodeId != null && x.NodeId == node.Id));

                //Node attributes lock/unlock
                foreach (var attribute in attributes)
                {
                    var lockAttribute = new LockAttributeAm { Id = attribute.Id, IsLocked = lockNodeAm.IsLocked };
                    await LockAttribute(lockAttribute, false, userName, dateTimeNow);
                }
            }

            var edgesInProject = allEdgesInProject.Where(x => x.FromNodeId == node.Id);

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

                await LockEdge(lockEdgeAm, false, userName, dateTimeNow);

                var childNode = allNodesInProject.FirstOrDefault(x => x.Id == edge.ToNodeId);

                if (childNode != null && childNode.Level <= node.Level)
                    continue;
                
                LockNodesRecursive(childNode, lockNodeAm, userName, dateTimeNow, allNodesInProject, allConnectors, allAttributes, allEdgesInProject);
            }
        }

        #endregion Private
    }
}