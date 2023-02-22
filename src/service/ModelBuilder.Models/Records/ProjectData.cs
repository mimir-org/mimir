using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Models.Records
{
    public record ProjectData
    {
        public List<Node> Nodes { get; init; } = new();
        public List<Edge> Edges { get; init; } = new();
        public List<Attribute> Attributes { get; init; } = new();
        public List<Terminal> Terminals { get; init; } = new();
        public List<Relation> Relations { get; init; } = new();

        /// <summary>
        /// Deconstruct and flatten edges 
        /// </summary>
        /// <param name="project">Project to be deconstructed</param>
        public Task DeconstructAttributes(Project project)
        {
            var nodeAttributes = project.Nodes.Select(x => x.Attributes).SelectMany(y => y).ToList();
            var connectorAttributes = project.Nodes.SelectMany(x => x.Connectors).OfType<Terminal>().SelectMany(y => y.Attributes).ToList();

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

            var nodeTerminals = project.Nodes.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<Terminal>().ToList();

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

            var nodeRelations = project.Nodes.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<Relation>().ToList();

            Relations.AddRange(nodeRelations);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct and flatten edges
        /// </summary>
        /// <param name="project">The project to be deconstructed</param>
        public Task DeconstructEdges(Project project)
        {
            if (project.Edges == null || !project.Edges.Any())
                return Task.CompletedTask;

            Edges.AddRange(project.Edges);
            return Task.CompletedTask;
        }
    }
}