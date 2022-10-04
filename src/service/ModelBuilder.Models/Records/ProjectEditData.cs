using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mimirorg.Common.Extensions;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Models.Records
{
    public record ProjectEditData
    {
        public List<Node> NodeCreate { get; init; } = new();
        public List<Node> NodeUpdate { get; init; } = new();
        public List<Node> NodeDelete { get; init; } = new();

        public List<Edge> EdgeCreate { get; init; } = new();
        public List<Edge> EdgeUpdate { get; init; } = new();
        public List<Edge> EdgeDelete { get; init; } = new();

        public List<Attribute> AttributeCreate { get; init; } = new();
        public List<Attribute> AttributeUpdate { get; init; } = new();
        public List<Attribute> AttributeDelete { get; init; } = new();

        public List<Transport> TransportCreate { get; init; } = new();
        public List<Transport> TransportUpdate { get; init; } = new();
        public List<Transport> TransportDelete { get; init; } = new();

        public List<Interface> InterfaceCreate { get; init; } = new();
        public List<Interface> InterfaceUpdate { get; init; } = new();
        public List<Interface> InterfaceDelete { get; init; } = new();

        public List<Relation> RelationCreate { get; init; } = new();
        public List<Relation> RelationUpdate { get; init; } = new();
        public List<Relation> RelationDelete { get; init; } = new();

        public List<Terminal> TerminalCreate { get; init; } = new();
        public List<Terminal> TerminalUpdate { get; init; } = new();
        public List<Terminal> TerminalDelete { get; init; } = new();

        public List<Edge> EdgeCreateAndDelete => EdgeCreate.Union(EdgeDelete).ToList();
        public List<Node> NodeCreateAndDelete => NodeCreate.Union(NodeDelete).ToList();
        public List<Attribute> AttributeCreateAndDelete => AttributeCreate.Union(AttributeDelete).ToList();
        public List<Transport> TransportCreateAndDelete => TransportCreate.Union(TransportDelete).ToList();
        public List<Interface> InterfaceCreateAndDelete => InterfaceCreate.Union(InterfaceDelete).ToList();
        public List<Relation> RelationCreateAndDelete => RelationCreate.Union(RelationDelete).ToList();
        public List<Terminal> TerminalCreateAndDelete => TerminalCreate.Union(TerminalDelete).ToList();

        public List<Node> NodeUpdateInsert => NodeUpdate.Union(NodeCreate).ToList();
        public List<Terminal> TerminalUpdateInsert => TerminalUpdate.Union(TerminalCreate).ToList();
        public List<Relation> RelationUpdateInsert => RelationUpdate.Union(RelationCreate).ToList();
        public List<Transport> TransportUpdateInsert => TransportUpdate.Union(TransportCreate).ToList();
        public List<Interface> InterfaceUpdateInsert => InterfaceUpdate.Union(InterfaceCreate).ToList();
        public List<Attribute> AttributeUpdateInsert => AttributeUpdate.Union(AttributeCreate).ToList();
        public List<Edge> EdgeUpdateInsert => EdgeUpdate.Union(EdgeCreate).ToList();

        public async Task ResolveEditData(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => ResolveEdges(original, updated)),
                Task.Run(() => ResolveNodes(original, updated)),
                Task.Run(() => ResolveAttributes(original, updated)),
                Task.Run(() => ResolveTransports(original, updated)),
                Task.Run(() => ResolveInterfaces(original, updated)),
                Task.Run(() => ResolveRelations(original, updated)),
                Task.Run(() => ResolveTerminals(original, updated))
            };

            await Task.WhenAll(tasks);
        }


        #region Edges

        private async Task ResolveEdges(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedEdges(original, updated)),
                Task.Run(() => FindCreatedEdges(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Edges.ToDictionary(x => x.Id, x => x);
            EdgeUpdate.AddRange(original.Edges.Exclude(EdgeCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedEdges(ProjectData original, ProjectData updated)
        {
            EdgeDelete.AddRange(original.Edges.Exclude(updated.Edges, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedEdges(ProjectData original, ProjectData updated)
        {
            EdgeCreate.AddRange(updated.Edges.Exclude(original.Edges, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion

        #region Nodes

        private async Task ResolveNodes(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedNodes(original, updated)),
                Task.Run(() => FindCreatedNodes(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Nodes.ToDictionary(x => x.Id, x => x);
            NodeUpdate.AddRange(original.Nodes.Exclude(NodeCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedNodes(ProjectData original, ProjectData updated)
        {
            NodeDelete.AddRange(original.Nodes.Exclude(updated.Nodes, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedNodes(ProjectData original, ProjectData updated)
        {
            NodeCreate.AddRange(updated.Nodes.Exclude(original.Nodes, x => x.Id));
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

        #region Transports

        private async Task ResolveTransports(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedTransports(original, updated)),
                Task.Run(() => FindCreatedTransports(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Transports.ToDictionary(x => x.Id, x => x);
            TransportUpdate.AddRange(original.Transports.Exclude(TransportCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedTransports(ProjectData original, ProjectData updated)
        {
            TransportDelete.AddRange(original.Transports.Exclude(updated.Transports, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedTransports(ProjectData original, ProjectData updated)
        {
            TransportCreate.AddRange(updated.Transports.Exclude(original.Transports, x => x.Id));
            return Task.CompletedTask;
        }

        #endregion

        #region Interfaces

        private async Task ResolveInterfaces(ProjectData original, ProjectData updated)
        {
            var tasks = new List<Task>
            {
                Task.Run(() => FindDeletedInterfaces(original, updated)),
                Task.Run(() => FindCreatedInterfaces(original, updated))
            };
            await Task.WhenAll(tasks);
            var dict = updated.Interfaces.ToDictionary(x => x.Id, x => x);
            InterfaceUpdate.AddRange(original.Interfaces.Exclude(InterfaceCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
        }

        private Task FindDeletedInterfaces(ProjectData original, ProjectData updated)
        {
            InterfaceDelete.AddRange(original.Interfaces.Exclude(updated.Interfaces, x => x.Id));
            return Task.CompletedTask;
        }

        private Task FindCreatedInterfaces(ProjectData original, ProjectData updated)
        {
            InterfaceCreate.AddRange(updated.Interfaces.Exclude(original.Interfaces, x => x.Id));
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