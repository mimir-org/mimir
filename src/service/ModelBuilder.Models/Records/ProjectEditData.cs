using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mimirorg.Common.Extensions;
using AttributeDm = Mb.Models.Data.AttributeDm;

namespace Mb.Models.Records
{
    public record ProjectEditData
    {
        public List<AspectObjectDm> AspectObjectCreate { get; init; } = new();
        public List<AspectObjectDm> AspectObjectUpdate { get; init; } = new();
        public List<AspectObjectDm> AspectObjectDelete { get; init; } = new();

        public List<ConnectionDm> ConnectionCreate { get; init; } = new();
        public List<ConnectionDm> ConnectionUpdate { get; init; } = new();
        public List<ConnectionDm> ConnectionDelete { get; init; } = new();

        public List<AttributeDm> AttributeCreate { get; init; } = new();
        public List<AttributeDm> AttributeUpdate { get; init; } = new();
        public List<AttributeDm> AttributeDelete { get; init; } = new();

        public List<ConnectorRelationDm> RelationCreate { get; init; } = new();
        public List<ConnectorRelationDm> RelationUpdate { get; init; } = new();
        public List<ConnectorRelationDm> RelationDelete { get; init; } = new();

        public List<ConnectorTerminalDm> TerminalCreate { get; init; } = new();
        public List<ConnectorTerminalDm> TerminalUpdate { get; init; } = new();
        public List<ConnectorTerminalDm> TerminalDelete { get; init; } = new();

        public List<ConnectionDm> ConnectionCreateAndDelete => ConnectionCreate.Union(ConnectionDelete).ToList();
        public List<AspectObjectDm> AspectObjectCreateAndDelete => AspectObjectCreate.Union(AspectObjectDelete).ToList();
        public List<AttributeDm> AttributeCreateAndDelete => AttributeCreate.Union(AttributeDelete).ToList();
        public List<ConnectorRelationDm> RelationCreateAndDelete => RelationCreate.Union(RelationDelete).ToList();
        public List<ConnectorTerminalDm> TerminalCreateAndDelete => TerminalCreate.Union(TerminalDelete).ToList();

        public List<AspectObjectDm> AspectObjectUpdateInsert => AspectObjectUpdate.Union(AspectObjectCreate).ToList();
        public List<ConnectorTerminalDm> TerminalUpdateInsert => TerminalUpdate.Union(TerminalCreate).ToList();
        public List<ConnectorRelationDm> RelationUpdateInsert => RelationUpdate.Union(RelationCreate).ToList();
        public List<AttributeDm> AttributeUpdateInsert => AttributeUpdate.Union(AttributeCreate).ToList();
        public List<ConnectionDm> ConnectionUpdateInsert => ConnectionUpdate.Union(ConnectionCreate).ToList();

        public async Task ResolveEditData(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => ResolveConnections(original, updated)),
                Task.Run(() => ResolveAspectObjects(original, updated)),
                Task.Run(() => ResolveAttributes(original, updated)),
                Task.Run(() => ResolveRelations(original, updated)),
                Task.Run(() => ResolveTerminals(original, updated))
            };

            await Task.WhenAll(tasks);
        }


        #region Connections

        private async Task ResolveConnections(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedConnections(original, updated)),
                Task.Run(() => FindCreatedConnections(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Connections.ToDictionary(x => x.Id, x => x);
            ConnectionUpdate.AddRange(original.Connections.Exclude(ConnectionCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedConnections(ProjectData original, ProjectData updated)
        {
            ConnectionDelete.AddRange(original.Connections.Exclude(updated.Connections, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedConnections(ProjectData original, ProjectData updated)
        {
            ConnectionCreate.AddRange(updated.Connections.Exclude(original.Connections, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion

        #region AspectObjects

        private async Task ResolveAspectObjects(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedAspectObjects(original, updated)),
                Task.Run(() => FindCreatedAspectObjects(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.AspectObjects.ToDictionary(x => x.Id, x => x);
            AspectObjectUpdate.AddRange(original.AspectObjects.Exclude(AspectObjectCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedAspectObjects(ProjectData original, ProjectData updated)
        {
            AspectObjectDelete.AddRange(original.AspectObjects.Exclude(updated.AspectObjects, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedAspectObjects(ProjectData original, ProjectData updated)
        {
            AspectObjectCreate.AddRange(updated.AspectObjects.Exclude(original.AspectObjects, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion

        #region Attributes

        private async Task ResolveAttributes(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedAttributes(original, updated)),
                Task.Run(() => FindCreatedAttributes(original, updated))
            };

            await Task.WhenAll(tasks);

            var dict = updated.Attributes.ToDictionary(x => x.Id, x => x);
            AttributeUpdate.AddRange(original.Attributes.Exclude(AttributeCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedAttributes(ProjectData original, ProjectData updated)
        {
            AttributeDelete.AddRange(original.Attributes.Exclude(updated.Attributes, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedAttributes(ProjectData original, ProjectData updated)
        {
            AttributeCreate.AddRange(updated.Attributes.Exclude(original.Attributes, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion

        #region Relations

        private async Task ResolveRelations(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedRelations(original, updated)),
                Task.Run(() => FindCreatedRelations(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Relations.ToDictionary(x => x.Id, x => x);
            RelationUpdate.AddRange(original.Relations.Exclude(RelationCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedRelations(ProjectData original, ProjectData updated)
        {
            RelationDelete.AddRange(original.Relations.Exclude(updated.Relations, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedRelations(ProjectData original, ProjectData updated)
        {
            RelationCreate.AddRange(updated.Relations.Exclude(original.Relations, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion

        #region Terminals

        private async Task ResolveTerminals(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedTerminals(original, updated)),
                Task.Run(() => FindCreatedTerminals(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Terminals.ToDictionary(x => x.Id, x => x);
            TerminalUpdate.AddRange(original.Terminals.Exclude(TerminalCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedTerminals(ProjectData original, ProjectData updated)
        {
            TerminalDelete.AddRange(original.Terminals.Exclude(updated.Terminals, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedTerminals(ProjectData original, ProjectData updated)
        {
            TerminalCreate.AddRange(updated.Terminals.Exclude(original.Terminals, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion
    }
}