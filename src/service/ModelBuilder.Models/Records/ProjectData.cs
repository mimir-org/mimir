using Mb.Models.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mb.Models.Records;

public record ProjectData
{
    public List<Block> Blocks { get; init; } = new();
    public List<Connection> Connections { get; init; } = new();
    public List<Attribute> Attributes { get; init; } = new();
    public List<Connector> Connectors { get; init; } = new();
    //public List<ConnectorRelationDm> Relations { get; init; } = new();

    /// <summary>
    /// Deconstruct and flatten connections 
    /// </summary>
    /// <param name="project">Project to be deconstructed</param>
    public Task DeconstructAttributes(Project project)
    {
        var blockAttributes = project.Blocks.Select(x => x.Attributes).SelectMany(y => y).ToList();
        var connectorAttributes = project.Blocks.SelectMany(x => x.Connectors).SelectMany(y => y.Attributes).ToList();

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
    public Task DeconstructBlocks(Project project)
    {
        if (project?.Blocks == null || !project.Blocks.Any())
            return Task.CompletedTask;

        Blocks.AddRange(project.Blocks);
        return Task.CompletedTask;
    }

    ///// <summary>
    ///// Deconstruct terminals
    ///// </summary>
    ///// <param name="project">The project to be deconstructed</param>
    //public Task DeconstructTerminals(Project project)
    //{
    //    if (project == null)
    //        return Task.CompletedTask;

    //    var blockTerminals = project.Blocks.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).Where(x=>x.TypeConnector == Enums.RelationType.Terminal).ToList();

    //    var terminals = blockTerminals
    //        .ToList();

    //    Terminals.AddRange(terminals);
    //    return Task.CompletedTask;
    //}

    ///// <summary>
    ///// Deconstruct relations
    ///// </summary>
    ///// <param name="project">The project to be deconstructed</param>
    //public Task DeconstructRelations(Project project)
    //{
    //    if (project == null)
    //        return Task.CompletedTask;

    //    var blockRelations = project.Blocks.Where(x => x.Connectors != null).SelectMany(x => x.Connectors).OfType<ConnectorRelationDm>().ToList();

    //    Relations.AddRange(blockRelations);
    //    return Task.CompletedTask;
    //}

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