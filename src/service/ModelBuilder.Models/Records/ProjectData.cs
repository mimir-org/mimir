using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Models.Records
{
    public record ProjectData
    {
        public List<AspectObject> AspectObjects { get; init; } = new();
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
            var aspectObjectAttributes = project.AspectObjects.Select(x => x.Attributes).SelectMany(y => y).ToList();
            var connectorAttributes = project.AspectObjects.SelectMany(x => x.Connectors).OfType<ConnectorTerminal>().SelectMany(y => y.Attributes).ToList();

            var allAttributes = aspectObjectAttributes
                .Union(connectorAttributes)
                .ToList();

            Attributes.AddRange(allAttributes);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct and flatten aspectObjects
        /// </summary>
        /// <param name="project">Project to be deconstructed</param>
        public Task DeconstructAspectObjects(Project project)
        {
            if (project?.AspectObjects == null || !project.AspectObjects.Any())
                return Task.CompletedTask;

            AspectObjects.AddRange(project.AspectObjects);
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

            var aspectObjectTerminals = project.AspectObjects.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorTerminal>().ToList();

            var terminals = aspectObjectTerminals
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

            var aspectObjectRelations = project.AspectObjects.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorRelation>().ToList();

            Relations.AddRange(aspectObjectRelations);
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