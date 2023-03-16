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
        public async Task<ProjectEditData> CreateEditData(ProjectDm original, ProjectDm updated)
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
        public async Task DeConstruct(ProjectDm project, ProjectData data)
        {
            if (project == null || (project.Connections == null && project.AspectObjects == null))
                return;

            var tasks = new List<Task>
            {
                Task.Run(() => data.DeconstructAttributes(project)),
                Task.Run(() => data.DeconstructConnections(project)),
                Task.Run(() => data.DeconstructAspectObjects(project)),
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
        public IDictionary<string, string> Remap(ProjectUpdateAm project)
        {
            var remap = new Dictionary<string, string>();
            var r = new ReplacementId { FromId = project.Id, FromIri = project.Id };
            var replacement = _commonRepository.CreateOrUseIdAndIri(r);

            project.AspectObjects = RemapAspectObjects(replacement, project.AspectObjects, project.Connections, remap, false).ToList();
            project.Connections = RemapConnections(replacement, project.Connections, remap, false).ToList();

            project.Id = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Clone a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The clone function will create a new project and sub objects, based on
        /// the predefined object.</remarks>
        public IDictionary<string, string> Clone(ProjectUpdateAm project)
        {
            var remap = new Dictionary<string, string>();
            var r = new ReplacementId();
            var replacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            replacement.FromId = project.Id;
            replacement.FromIri = project.Id;

            // We need to connect parentless connections to root aspectObjects of same aspect
            RemapParentlessConnections(project);

            // We need to remove connections that misses connected aspectObject
            var connectionsToDelete = project.GetNotConnectedConnectors().ToList();
            project.Connections = project.Connections.Where(x => connectionsToDelete.All(y => x.Id != y.Id)).ToList();

            // Create deep clone of whole project
            project.AspectObjects = RemapAspectObjects(replacement, project.AspectObjects, project.Connections, remap, true).ToList();
            project.Connections = RemapConnections(replacement, project.Connections, remap, true).ToList();

            project.Id = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Remap a collection of aspectObjects and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="aspectObjects">ICollection&lt;AspectObjectAm&gt; aspectObjects</param>
        /// <param name="connections">ICollection&lt;ConnectionAm&gt; connections</param>
        /// <param name="remap">Dictionary&lt;string, string&gt; remap</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;AspectObjectAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all aspectObjects and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        public IEnumerable<AspectObjectAm> RemapAspectObjects(ReplacementId project, ICollection<AspectObjectAm> aspectObjects, ICollection<ConnectionAm> connections, Dictionary<string, string> remap, bool createCopy)
        {
            if (aspectObjects == null || !aspectObjects.Any())
                yield break;

            foreach (var aspectObject in aspectObjects)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = aspectObject.Id, FromIri = aspectObject.Id };
                var aspectObjectReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                aspectObjectReplacement.FromId = aspectObject.Id;
                aspectObjectReplacement.FromIri = aspectObject.Id;

                if (aspectObjectReplacement.FromId != aspectObjectReplacement.ToId)
                    remap.Add(aspectObjectReplacement.ToId, aspectObjectReplacement.FromId);

                aspectObject.Connectors = RemapConnectors(aspectObjectReplacement, aspectObject.Connectors, connections, createCopy).ToList();
                var attr = RemapAttributes(aspectObjectReplacement, aspectObject.Attributes, createCopy, AttributeParent.AspectObject).ToList();
                aspectObject.Attributes = attr.Any() ? attr : null;

                aspectObject.Id = aspectObjectReplacement.ToId;
                aspectObject.Id = aspectObjectReplacement.ToIri;
                aspectObject.Project = project.ToId;
                aspectObject.Project = project.ToIri;

                var masterProject = ResolveMasterProject(project.FromId, project.FromIri, project.ToId, project.ToIri, aspectObject.MainProject, aspectObject.MainProject);
                aspectObject.MainProject = masterProject.Id;
                aspectObject.MainProject = masterProject.Iri;

                yield return aspectObject;
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
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connection.Id, FromIri = connection.Id };
                var connectionReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                connectionReplacement.FromId = connection.Id;
                connectionReplacement.FromIri = connection.Id;

                if (connectionReplacement.FromId != connectionReplacement.ToId && !string.IsNullOrWhiteSpace(connectionReplacement.FromId) || connectionReplacement.FromIri != connectionReplacement.ToId && !string.IsNullOrWhiteSpace(connectionReplacement.FromIri))
                    remap.Add(connectionReplacement.ToId, connectionReplacement.FromId);

                connection.Id = connectionReplacement.ToIri;
                connection.Project = project.ToId;
                connection.Project = project.ToIri;

                var toConnectorReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = connection.ToConnector, FromIri = connection.ToConnector });
                var fromConnectorReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = connection.FromConnector, FromIri = connection.FromConnector });

                connection.ToConnector = toConnectorReplacement.ToId;
                connection.FromConnector = fromConnectorReplacement.ToId;

                connection.ToConnector = toConnectorReplacement.ToIri;
                connection.FromConnector = fromConnectorReplacement.ToIri;

                var masterProject = ResolveMasterProject(project.FromId, project.FromIri, project.ToId, project.ToIri, connection.MainProject, connection.MainProject);
                connection.MainProject = masterProject.Iri;

                yield return connection;
            }
        }

        /// <summary>
        /// Remap all parentless connections to root aspectObjects
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <remarks>If there is some connections that is not connected to a parent, we need to find
        /// a root aspectObject in same aspect, and connect the part of relation to that aspectObject.</remarks>
        public void RemapParentlessConnections(ProjectUpdateAm project)
        {
            var parentLessConnections = project.GetParentlessConnectors().ToList();
            foreach (var connection in parentLessConnections)
            {
                //TODO Rewrite
                //var actualAspectObject = project.AspectObjects.FirstOrDefault(x => x.Id == connection.ToAspectObjectId);
                //if (actualAspectObject == null)
                //    continue;

                //var rootAspectObject = project.AspectObjects.FirstOrDefault(x => x.AspectObjectType == AspectObjectType.Root && x.Aspect == actualAspectObject.Aspect);
                //if (rootAspectObject == null)
                //    continue;

                //connection.FromAspectObjectId = rootAspectObject.Id;
                //connection.FromConnector = rootAspectObject.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Output && x.RelationType == RelationType.PartOf)?.Id;
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
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connector.Id, FromIri = connector.Id };
                var connectorReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                connectorReplacement.FromId = connector.Id;
                connectorReplacement.FromIri = connector.Id;
                
                if (string.IsNullOrWhiteSpace(connectorReplacement.FromId))
                {
                    _ = connections?.Where(x => x.FromConnector == connectorReplacement.FromIri).Select(y =>
                    {
                        y.FromConnector = connectorReplacement.ToId;
                        return y;
                    }).ToList();
                }
                else
                {
                    _ = connections?.Where(x => x.FromConnector == connectorReplacement.FromId).Select(y =>
                    {
                        y.FromConnector = connectorReplacement.ToId;
                        return y;
                    }).ToList();
                }

                if (string.IsNullOrWhiteSpace(connectorReplacement.FromId))
                {
                    _ = connections?.Where(x => x.ToConnector == connectorReplacement.FromIri).Select(y =>
                    {
                        y.ToConnector = connectorReplacement.ToId;
                        return y;
                    }).ToList();
                }
                else
                {
                    _ = connections?.Where(x => x.ToConnector == connectorReplacement.FromId).Select(y =>
                    {
                        y.ToConnector = connectorReplacement.ToId;
                        return y;
                    }).ToList();
                }

                if (connector is ConnectorTerminalAm t)
                {
                    var attr = RemapAttributes(connectorReplacement, t.Attributes, createCopy, AttributeParent.Connector).ToList();
                    t.Attributes = attr.Any() ? attr : null;
                }

                connector.Id = connectorReplacement.ToId;
                connector.Id = connectorReplacement.ToIri;

                if (connector.AspectObject == replacement.FromId)
                {
                    connector.AspectObject = replacement.ToId;
                    connector.AspectObject = replacement.ToIri;
                }

                if (connector is ConnectorTerminalAm am && !string.IsNullOrWhiteSpace(am.TerminalType) && string.IsNullOrWhiteSpace(am.TerminalType))
                {
                    am.TerminalType = GlobalSettings.IriTerminalTypePrefix + am.TerminalType;
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
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = attribute.Id, FromIri = attribute.Id };
                var attributeReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                attributeReplacement.FromId = attribute.Id;
                attributeReplacement.FromIri = attribute.Id;

                if (ShouldReplace(attribute.ConnectorTerminal, replacement.FromId, attribute.ConnectorTerminal, replacement.FromIri) && parent == AttributeParent.Connector)
                {
                    attribute.ConnectorTerminal = replacement.ToId;
                }

                if (ShouldReplace(attribute.AspectObject, replacement.FromId, attribute.AspectObject, replacement.FromIri) && parent == AttributeParent.AspectObject)
                {
                    attribute.AspectObject = replacement.ToId;
                }

                attribute.Id = attributeReplacement.ToId;

                if (!string.IsNullOrWhiteSpace(attribute.AttributeType))
                {
                    attribute.AttributeType = GlobalSettings.IriAttributeTypePrefix + attribute.AttributeType;
                }

                yield return attribute;
            }
        }

        // Remap connectorTerminal
        private ConnectorTerminalAm RemapTerminal(ConnectorTerminalAm connectorTerminal, bool createCopy)
        {
            if (connectorTerminal == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connectorTerminal.Id, FromIri = connectorTerminal.Id };
            var terminalReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            terminalReplacement.FromId = connectorTerminal.Id;
            terminalReplacement.FromIri = connectorTerminal.Id;

            var attr = RemapAttributes(terminalReplacement, connectorTerminal.Attributes, createCopy, AttributeParent.Connector).ToList();
            connectorTerminal.Attributes = attr.Any() ? attr : null;

            connectorTerminal.Id = terminalReplacement.ToId;
            connectorTerminal.Id = terminalReplacement.ToIri;

            if (!string.IsNullOrWhiteSpace(connectorTerminal.TerminalType) && string.IsNullOrWhiteSpace(connectorTerminal.TerminalType))
            {
                connectorTerminal.TerminalType = GlobalSettings.IriTerminalTypePrefix + connectorTerminal.TerminalType;
            }

            return connectorTerminal;
        }

        #endregion
    }
}