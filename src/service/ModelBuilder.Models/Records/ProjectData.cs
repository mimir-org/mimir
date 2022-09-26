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
        public List<Transport> Transports { get; init; } = new();
        public List<Interface> Interfaces { get; init; } = new();
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
            var transportAttributes = project.Edges.Where(x => x.Transport != null).Select(x => x.Transport).SelectMany(y => y.Attributes).ToList();
            var interfaceAttributes = project.Edges.Where(x => x.Interface != null).Select(x => x.Interface).SelectMany(y => y.Attributes).ToList();

            var inputTerminalAttributes = project.Edges.Where(x => x.Transport != null).Select(x => x.Transport).Select(y => y.InputTerminal).SelectMany(z => z.Attributes).ToList();
            var outputTerminalAttributes = project.Edges.Where(x => x.Transport != null).Select(x => x.Transport).Select(y => y.OutputTerminal).SelectMany(z => z.Attributes).ToList();

            var allAttributes = nodeAttributes
                .Union(connectorAttributes)
                .Union(transportAttributes)
                .Union(interfaceAttributes)
                .Union(inputTerminalAttributes)
                .Union(outputTerminalAttributes)
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
            var transports = project.Edges.Where(x => x.Transport != null).Select(y => y.Transport).ToList();
            var inputTerminals = transports.Where(y => y.InputTerminal != null).Select(y => y.InputTerminal).ToList();
            var outputTerminals = transports.Where(y => y.OutputTerminal != null).Select(y => y.OutputTerminal).ToList();

            var terminals = nodeTerminals
                .Union(inputTerminals)
                .Union(outputTerminals)
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
        /// Deconstruct and flatten interfaces
        /// </summary>
        /// <param name="project">The project to be deconstructed</param>
        public Task DeconstructInterfaces(Project project)
        {
            if (project.Edges == null || !project.Edges.Any())
                return Task.CompletedTask;

            var interfaces = project.Edges.Where(x => x.Interface != null).Select(y => y.Interface).ToList();

            Interfaces.AddRange(interfaces);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct and flatten transports
        /// </summary>
        /// <param name="project">The project to be deconstructed</param>
        public Task DeconstructTransports(Project project)
        {
            if (project.Edges == null || !project.Edges.Any())
                return Task.CompletedTask;

            var transports = project.Edges.Where(x => x.Transport != null).Select(y => y.Transport).ToList();

            Transports.AddRange(transports);
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