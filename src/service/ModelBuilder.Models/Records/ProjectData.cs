using Mb.Models.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mb.Models.Records;

public record ProjectData
{
    public List<BlockDm> Blocks { get; init; } = new();
    public List<ConnectionDm> Connections { get; init; } = new();
    public List<AttributeDm> Attributes { get; init; } = new();
    public List<ConnectorTerminalDm> Terminals { get; init; } = new();
    public List<ConnectorRelationDm> Relations { get; init; } = new();

    /// <summary>
    /// Deconstruct and flatten connections 
    /// </summary>
    /// <param name="project">Project to be deconstructed</param>
    public Task DeconstructAttributes(ProjectDm project)
    {
        var blockAttributes = project.Blocks.Select(x => x.Attributes).SelectMany(y => y).ToList();
        var connectorAttributes = project.Blocks.SelectMany(x => x.Connectors).OfType<ConnectorTerminalDm>().SelectMany(y => y.Attributes).ToList();

        var allAttributes = blockAttributes
            .Union(connectorAttributes)
            .ToList();

        Attributes.AddRange(allAttributes);
        return Task.CompletedTask;
    }

    /// <summary>
    /// Deconstruct and flatten blocks
    /// </summary>
    /// <param name="project">Project to be deconstructed</param>
    public Task Deconstructblocks(ProjectDm project)
    {
        if (project?.Blocks == null || !project.Blocks.Any())
            return Task.CompletedTask;

        Blocks.AddRange(project.Blocks);
        return Task.CompletedTask;
    }

    /// <summary>
    /// Deconstruct terminals
    /// </summary>
    /// <param name="project">The project to be deconstructed</param>
    public Task DeconstructTerminals(ProjectDm project)
    {
        if (project == null)
            return Task.CompletedTask;

        var blockTerminals = project.Blocks.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorTerminalDm>().ToList();

        var terminals = blockTerminals
            .ToList();

        Terminals.AddRange(terminals);
        return Task.CompletedTask;
    }

    /// <summary>
    /// Deconstruct relations
    /// </summary>
    /// <param name="project">The project to be deconstructed</param>
    public Task DeconstructRelations(ProjectDm project)
    {
        if (project == null)
            return Task.CompletedTask;

        var blockRelations = project.Blocks.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorRelationDm>().ToList();

        Relations.AddRange(blockRelations);
        return Task.CompletedTask;
    }

    /// <summary>
    /// Deconstruct and flatten connections
    /// </summary>
    /// <param name="project">The project to be deconstructed</param>
    public Task DeconstructConnections(ProjectDm project)
    {
        if (project.Connections == null || !project.Connections.Any())
            return Task.CompletedTask;

        Connections.AddRange(project.Connections);
        return Task.CompletedTask;
    }
}