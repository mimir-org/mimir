using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Models.Records
{
    public record ProjectData
    {
        public List<AspectObject> Nodes { get; init; } = new();
        public List<Connection> Connections { get; init; } = new();
        public List<Attribute> Attributes { get; init; } = new();
        public List<ConnectorTerminal> Terminals { get; init; } = new();
        public List<ConnectorRelation> Relations { get; init; } = new();

        /// <summary>
        /// Deconstruct and flatten connections 
        /// </summary>
        /// <param name="project">Project to be deconstructed</param>
        public Task DeconstructAttributes(Project project)
        {
            var nodeAttributes = project.Nodes.Select(x => x.Attributes).SelectMany(y => y).ToList();
            var connectorAttributes = project.Nodes.SelectMany(x => x.Connectors).OfType<ConnectorTerminal>().SelectMany(y => y.Attributes).ToList();

            var allAttributes = nodeAttributes
                .Union(connectorAttributes)
                .ToList();

            Attributes.AddRange(allAttributes);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct and flatten nodes
        /// </summary>
        /// <param name="project">Project to be deconstructed</param>
        public Task DeconstructNodes(Project project)
        {
            if (project?.Nodes == null || !project.Nodes.Any())
                return Task.CompletedTask;

            Nodes.AddRange(project.Nodes);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct terminals
        /// </summary>
        /// <param name="project">The project to be deconstructed</param>
        public Task DeconstructTerminals(Project project)
        {
            if (project == null)
                return Task.CompletedTask;

            var nodeTerminals = project.Nodes.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorTerminal>().ToList();

            var terminals = nodeTerminals
                .ToList();

            Terminals.AddRange(terminals);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct relations
        /// </summary>
        /// <param name="project">The project to be deconstructed</param>
        public Task DeconstructRelations(Project project)
        {
            if (project == null)
                return Task.CompletedTask;

            var nodeRelations = project.Nodes.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorRelation>().ToList();

            Relations.AddRange(nodeRelations);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct and flatten connections
        /// </summary>
        /// <param name="project">The project to be deconstructed</param>
        public Task DeconstructConnections(Project project)
        {
            if (project.Connections == null || !project.Connections.Any())
                return Task.CompletedTask;

            Connections.AddRange(project.Connections);
            return Task.CompletedTask;
        }
    }
}