using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Models.Const;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;
using Mb.Services.Contracts;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Services.Services
{
    public class RemapService : IRemapService
    {
        private readonly ICommonRepository _commonRepository;

        #region Constructors

        public RemapService(ICommonRepository commonRepository)
        {
            _commonRepository = commonRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Create edit data
        /// </summary>
        /// <param name="original">Original Mimir project</param>
        /// <param name="updated">The updated Mimir project</param>
        /// <returns>Data object with information about what data should be edited</returns>
        public async Task<ProjectEditData> CreateEditData(Project original, Project updated)
        {
            var originalProjectData = new ProjectData();
            var updatedProjectData = new ProjectData();

            var tasks = new List<Task>
            {
                Task.Run(() => DeConstruct(original, originalProjectData)),
                Task.Run(() => DeConstruct(updated, updatedProjectData))
            };

            await Task.WhenAll(tasks);

            // Add Project edit data
            var projectEditData = new ProjectEditData();
            await projectEditData.ResolveEditData(originalProjectData, updatedProjectData);

            return projectEditData;
        }

        /// <summary>
        /// Deconstruct a project to array of elements
        /// </summary>
        /// <param name="project">The project to deconstruct</param>
        /// <param name="data">Project Data object to fill with data</param>
        /// <returns>A task that updates project data</returns>
        public async Task DeConstruct(Project project, ProjectData data)
        {
            if (project == null || (project.Connections == null && project.Nodes == null))
                return;

            var tasks = new List<Task>
            {
                Task.Run(() => data.DeconstructAttributes(project)),
                Task.Run(() => data.DeconstructConnections(project)),
                Task.Run(() => data.DeconstructNodes(project)),
                Task.Run(() => data.DeconstructRelations(project)),
                Task.Run(() => data.DeconstructTerminals(project))
            };

            await Task.WhenAll(tasks);
        }

        /// <summary>
        /// Remap a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The remap function will create new id's on project and all sub objects, if the
        /// id is missing or legal.The function will also create iri for all objects.</remarks>
        public IDictionary<string, string> Remap(ProjectAm project)
        {
            var remap = new Dictionary<string, string>();
            var r = new ReplacementId { FromId = project.Id, FromIri = project.Iri };
            var replacement = _commonRepository.CreateOrUseIdAndIri(r);

            project.Nodes = RemapNodes(replacement, project.Nodes, project.Connections, remap, false).ToList();
            project.Connections = RemapConnections(replacement, project.Connections, remap, false).ToList();

            project.Id = replacement.ToId;
            project.Iri = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Clone a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The clone function will create a new project and sub objects, based on
        /// the predefined object.</remarks>
        public IDictionary<string, string> Clone(ProjectAm project)
        {
            var remap = new Dictionary<string, string>();
            var r = new ReplacementId();
            var replacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            replacement.FromId = project.Id;
            replacement.FromIri = project.Iri;

            // We need to connect parentless connections to root nodes of same aspect
            RemapParentlessConnections(project);

            // We need to remove connections that misses connected node
            var connectionsToDelete = project.GetNotConnectedConnectors().ToList();
            project.Connections = project.Connections.Where(x => connectionsToDelete.All(y => x.Id != y.Id)).ToList();

            // Create deep clone of whole project
            project.Nodes = RemapNodes(replacement, project.Nodes, project.Connections, remap, true).ToList();
            project.Connections = RemapConnections(replacement, project.Connections, remap, true).ToList();

            project.Id = replacement.ToId;
            project.Iri = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Remap a collection of nodes and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="nodes">ICollection&lt;NodeAm&gt; nodes</param>
        /// <param name="connections">ICollection&lt;ConnectionAm&gt; connections</param>
        /// <param name="remap">Dictionary&lt;string, string&gt; remap</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;NodeAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all nodes and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        public IEnumerable<NodeAm> RemapNodes(ReplacementId project, ICollection<NodeAm> nodes, ICollection<ConnectionAm> connections, Dictionary<string, string> remap, bool createCopy)
        {
            if (nodes == null || !nodes.Any())
                yield break;

            foreach (var node in nodes)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = node.Id, FromIri = node.Iri };
                var nodeReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                nodeReplacement.FromId = node.Id;
                nodeReplacement.FromIri = node.Iri;

                if (nodeReplacement.FromId != nodeReplacement.ToId)
                    remap.Add(nodeReplacement.ToId, nodeReplacement.FromId);

                node.Connectors = RemapConnectors(nodeReplacement, node.Connectors, connections, createCopy).ToList();
                var attr = RemapAttributes(nodeReplacement, node.Attributes, createCopy, AttributeParent.Node).ToList();
                node.Attributes = attr.Any() ? attr : null;

                node.Id = nodeReplacement.ToId;
                node.Iri = nodeReplacement.ToIri;
                node.ProjectId = project.ToId;
                node.ProjectIri = project.ToIri;

                var masterProject = ResolveMasterProject(project.FromId, project.FromIri, project.ToId, project.ToIri, node.MasterProjectId, node.MasterProjectIri);
                node.MasterProjectId = masterProject.Id;
                node.MasterProjectIri = masterProject.Iri;

                yield return node;
            }
        }

        /// <summary>
        /// Remap a collection of connections and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="connections">ICollection&lt;ConnectionAm&gt;</param>
        /// <param name="remap">Dictionary&lt;string, string&gt;</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;ConnectionAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all connections and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        public IEnumerable<ConnectionAm> RemapConnections(ReplacementId project, ICollection<ConnectionAm> connections, Dictionary<string, string> remap, bool createCopy)
        {
            if (connections == null || !connections.Any())
                yield break;

            foreach (var connection in connections)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connection.Id, FromIri = connection.Iri };
                var connectionReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                connectionReplacement.FromId = connection.Id;
                connectionReplacement.FromIri = connection.Iri;

                if (connectionReplacement.FromId != connectionReplacement.ToId && !string.IsNullOrWhiteSpace(connectionReplacement.FromId) || connectionReplacement.FromIri != connectionReplacement.ToId && !string.IsNullOrWhiteSpace(connectionReplacement.FromIri))
                    remap.Add(connectionReplacement.ToId, connectionReplacement.FromId);

                connection.Id = connectionReplacement.ToId;
                connection.Iri = connectionReplacement.ToIri;
                connection.ProjectId = project.ToId;
                connection.ProjectIri = project.ToIri;

                var toConnectorReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = connection.ToConnectorId, FromIri = connection.ToConnectorIri });
                var fromConnectorReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = connection.FromConnectorId, FromIri = connection.FromConnectorIri });
                var toNodeReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = connection.ToNodeId, FromIri = connection.ToNodeIri });
                var fromNodeReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = connection.FromNodeId, FromIri = connection.FromNodeIri });

                connection.ToConnectorId = toConnectorReplacement.ToId;
                connection.FromConnectorId = fromConnectorReplacement.ToId;
                connection.ToNodeId = toNodeReplacement.ToId;
                connection.FromNodeId = fromNodeReplacement.ToId;

                connection.ToConnectorIri = toConnectorReplacement.ToIri;
                connection.FromConnectorIri = fromConnectorReplacement.ToIri;
                connection.ToNodeIri = toNodeReplacement.ToIri;
                connection.FromNodeIri = fromNodeReplacement.ToIri;

                var masterProject = ResolveMasterProject(project.FromId, project.FromIri, project.ToId, project.ToIri, connection.MasterProjectId, connection.MasterProjectIri);
                connection.MasterProjectId = masterProject.Id;
                connection.MasterProjectIri = masterProject.Iri;

                yield return connection;
            }
        }

        /// <summary>
        /// Remap all parentless connections to root nodes
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <remarks>If there is some connections that is not connected to a parent, we need to find
        /// a root node in same aspect, and connect the part of relation to that node.</remarks>
        public void RemapParentlessConnections(ProjectAm project)
        {
            var parentLessConnections = project.GetParentlessConnectors().ToList();
            foreach (var connection in parentLessConnections)
            {
                var actualNode = project.Nodes.FirstOrDefault(x => x.Id == connection.ToNodeId);
                if (actualNode == null)
                    continue;

                var rootNode = project.Nodes.FirstOrDefault(x => x.NodeType == NodeType.Root && x.Aspect == actualNode.Aspect);
                if (rootNode == null)
                    continue;

                connection.FromNodeId = rootNode.Id;
                connection.FromConnectorId = rootNode.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Output && x.RelationType == RelationType.PartOf)?.Id;
            }
        }

        public MasterProject ResolveMasterProject(string oldProjectId, string oldProjectIri, string projectId, string projectIri, string masterProjectId, string masterProjectIri)
        {
            if (string.IsNullOrWhiteSpace(masterProjectId) && string.IsNullOrWhiteSpace(masterProjectIri))
                return new MasterProject { Id = projectId, Iri = projectIri };

            if (string.IsNullOrWhiteSpace(projectId) && string.IsNullOrWhiteSpace(projectIri) || string.IsNullOrWhiteSpace(oldProjectId) && string.IsNullOrWhiteSpace(oldProjectIri))
                throw new NullReferenceException($"{nameof(oldProjectId)} or {nameof(oldProjectIri)} and {nameof(projectId)} or {nameof(projectIri)} must have value.");

            var hasChangedId = (oldProjectId != projectId) || (oldProjectIri != projectIri);

            var id = masterProjectId;
            var iri = masterProjectIri;

            var oldProjectIdReplacement = new ReplacementId { FromId = oldProjectId, FromIri = oldProjectIri };
            oldProjectIdReplacement = _commonRepository.CreateOrUseIdAndIri(oldProjectIdReplacement);

            var projectIdReplacement = new ReplacementId { FromId = projectId, FromIri = projectIri };
            projectIdReplacement = _commonRepository.CreateOrUseIdAndIri(projectIdReplacement);

            if (!string.IsNullOrWhiteSpace(id) && hasChangedId)
            {
                if (id.Contains(oldProjectIdReplacement.ToId))
                    id = projectIdReplacement.ToId;
            }

            if (!string.IsNullOrWhiteSpace(iri) && hasChangedId)
            {
                if (iri.Contains(oldProjectIdReplacement.ToIri))
                    iri = projectIdReplacement.ToIri;
            }

            var replacement = new ReplacementId
            {
                FromId = id,
                FromIri = iri
            };

            replacement = _commonRepository.CreateOrUseIdAndIri(replacement);
            return new MasterProject { Id = replacement.ToId, Iri = replacement.ToIri };
        }

        #endregion

        #region Private methods

        // Remap connectors
        private IEnumerable<ConnectorAm> RemapConnectors(ReplacementId replacement, ICollection<ConnectorAm> connectors, ICollection<ConnectionAm> connections, bool createCopy)
        {
            if (connectors == null || !connectors.Any())
                yield break;

            foreach (var connector in connectors)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connector.Id, FromIri = connector.Iri };
                var connectorReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                connectorReplacement.FromId = connector.Id;
                connectorReplacement.FromIri = connector.Iri;
                
                if (string.IsNullOrWhiteSpace(connectorReplacement.FromId))
                {
                    _ = connections?.Where(x => x.FromConnectorIri == connectorReplacement.FromIri).Select(y =>
                    {
                        y.FromConnectorIri = connectorReplacement.ToIri;
                        y.FromConnectorId = connectorReplacement.ToId;
                        y.FromNodeId = replacement.ToId;
                        y.FromNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }
                else
                {
                    _ = connections?.Where(x => x.FromConnectorId == connectorReplacement.FromId).Select(y =>
                    {
                        y.FromConnectorIri = connectorReplacement.ToIri;
                        y.FromConnectorId = connectorReplacement.ToId;
                        y.FromNodeId = replacement.ToId;
                        y.FromNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }

                if (string.IsNullOrWhiteSpace(connectorReplacement.FromId))
                {
                    _ = connections?.Where(x => x.ToConnectorIri == connectorReplacement.FromIri).Select(y =>
                    {
                        y.ToConnectorIri = connectorReplacement.ToIri;
                        y.ToConnectorId = connectorReplacement.ToId;
                        y.ToNodeId = replacement.ToId;
                        y.ToNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }
                else
                {
                    _ = connections?.Where(x => x.ToConnectorId == connectorReplacement.FromId).Select(y =>
                    {
                        y.ToConnectorIri = connectorReplacement.ToIri;
                        y.ToConnectorId = connectorReplacement.ToId;
                        y.ToNodeId = replacement.ToId;
                        y.ToNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }

                if (connector is ConnectorTerminalAm t)
                {
                    var attr = RemapAttributes(connectorReplacement, t.Attributes, createCopy, AttributeParent.Connector).ToList();
                    t.Attributes = attr.Any() ? attr : null;
                }

                connector.Id = connectorReplacement.ToId;
                connector.Iri = connectorReplacement.ToIri;

                if (connector.NodeId == replacement.FromId)
                {
                    connector.NodeId = replacement.ToId;
                    connector.NodeIri = replacement.ToIri;
                }

                if (connector is ConnectorTerminalAm am && !string.IsNullOrWhiteSpace(am.TerminalTypeId) && string.IsNullOrWhiteSpace(am.TerminalTypeIri))
                {
                    am.TerminalTypeIri = GlobalSettings.IriTerminalTypePrefix + am.TerminalTypeId;
                }

                yield return connector;
            }
        }

        // Should there be a id remap
        private static bool ShouldReplace(string id, string fromId, string iri, string fromIri)
        {
            if (string.IsNullOrWhiteSpace(id) && string.IsNullOrWhiteSpace(iri))
                return true;

            if (id == fromId && !string.IsNullOrWhiteSpace(id))
                return true;

            if (iri == fromIri && !string.IsNullOrWhiteSpace(iri))
                return true;

            return false;
        }

        // Remap attributes
        private IEnumerable<AttributeAm> RemapAttributes(ReplacementId replacement, ICollection<AttributeAm> attributes, bool createCopy, AttributeParent parent)
        {
            if (attributes == null || !attributes.Any())
                yield break;

            foreach (var attribute in attributes)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = attribute.Id, FromIri = attribute.Iri };
                var attributeReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                attributeReplacement.FromId = attribute.Id;
                attributeReplacement.FromIri = attribute.Iri;

                if (ShouldReplace(attribute.TerminalId, replacement.FromId, attribute.TerminalIri, replacement.FromIri) && parent == AttributeParent.Connector)
                {
                    attribute.TerminalId = replacement.ToId;
                    attribute.TerminalIri = replacement.ToIri;
                }

                if (ShouldReplace(attribute.NodeId, replacement.FromId, attribute.NodeIri, replacement.FromIri) && parent == AttributeParent.Node)
                {
                    attribute.NodeId = replacement.ToId;
                    attribute.NodeIri = replacement.ToIri;
                }

                attribute.Id = attributeReplacement.ToId;
                attribute.Iri = attributeReplacement.ToIri;

                if (!string.IsNullOrWhiteSpace(attribute.AttributeTypeId) && string.IsNullOrWhiteSpace(attribute.AttributeTypeIri))
                {
                    attribute.AttributeTypeIri = GlobalSettings.IriAttributeTypePrefix + attribute.AttributeTypeId;
                }

                yield return attribute;
            }
        }

        // Remap terminalConnector
        private ConnectorTerminalAm RemapTerminal(ConnectorTerminalAm terminalConnector, bool createCopy)
        {
            if (terminalConnector == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = terminalConnector.Id, FromIri = terminalConnector.Iri };
            var terminalReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            terminalReplacement.FromId = terminalConnector.Id;
            terminalReplacement.FromIri = terminalConnector.Iri;

            var attr = RemapAttributes(terminalReplacement, terminalConnector.Attributes, createCopy, AttributeParent.Connector).ToList();
            terminalConnector.Attributes = attr.Any() ? attr : null;

            terminalConnector.Id = terminalReplacement.ToId;
            terminalConnector.Iri = terminalReplacement.ToIri;

            if (!string.IsNullOrWhiteSpace(terminalConnector.TerminalTypeId) && string.IsNullOrWhiteSpace(terminalConnector.TerminalTypeIri))
            {
                terminalConnector.TerminalTypeIri = GlobalSettings.IriTerminalTypePrefix + terminalConnector.TerminalTypeId;
            }

            return terminalConnector;
        }

        #endregion
    }
}