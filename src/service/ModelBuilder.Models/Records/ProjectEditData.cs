using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mimirorg.Common.Extensions;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Models.Records;

public record ProjectEditData
{
    public List<Block> BlockCreate { get; init; } = new();
    public List<Block> BlockUpdate { get; init; } = new();
    public List<Block> BlockDelete { get; init; } = new();

    public List<Connection> ConnectionCreate { get; init; } = new();
    public List<Connection> ConnectionUpdate { get; init; } = new();
    public List<Connection> ConnectionDelete { get; init; } = new();

    public List<Attribute> AttributeCreate { get; init; } = new();
    public List<Attribute> AttributeUpdate { get; init; } = new();
    public List<Attribute> AttributeDelete { get; init; } = new();

    public List<Connector> RelationCreate { get; init; } = new();
    public List<Connector> RelationUpdate { get; init; } = new();
    public List<Connector> RelationDelete { get; init; } = new();

    public List<Connector> Connectors { get; init; } = new();
    

    public List<Connection> ConnectionCreateAndDelete => ConnectionCreate.Union(ConnectionDelete).ToList();
    public List<Block> BlockCreateAndDelete => BlockCreate.Union(BlockDelete).ToList();
    public List<Attribute> AttributeCreateAndDelete => AttributeCreate.Union(AttributeDelete).ToList();
    public List<Connector> RelationCreateAndDelete => RelationCreate.Union(RelationDelete).ToList();    

    public List<Block> BlockUpdateInsert => BlockUpdate.Union(BlockCreate).ToList();    
    public List<Connector> RelationUpdateInsert => RelationUpdate.Union(RelationCreate).ToList();
    public List<Attribute> AttributeUpdateInsert => AttributeUpdate.Union(AttributeCreate).ToList();
    public List<Connection> ConnectionUpdateInsert => ConnectionUpdate.Union(ConnectionCreate).ToList();

    public async Task ResolveEditData(ProjectData original, ProjectData updated)
    {
        var tasks = new List<Task>
        {
            Task.Run(() => ResolveConnections(original, updated)),
            Task.Run(() => ResolveBlocks(original, updated)),
            Task.Run(() => ResolveAttributes(original, updated)),
            //Task.Run(() => ResolveRelations(original, updated)),
            //Task.Run(() => ResolveTerminals(original, updated))
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

    #region blocks

    private async Task ResolveBlocks(ProjectData original, ProjectData updated)
    {
        var tasks = new List<Task>
        {
            Task.Run(() => FindDeletedBlocks(original, updated)),
            Task.Run(() => FindCreatedBlocks(original, updated))
        };
        await Task.WhenAll(tasks);
        var dict = updated.Blocks.ToDictionary(x => x.Id, x => x);
        BlockUpdate.AddRange(original.Blocks.Exclude(BlockCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
    }

    private Task FindDeletedBlocks(ProjectData original, ProjectData updated)
    {
        BlockDelete.AddRange(original.Blocks.Exclude(updated.Blocks, x => x.Id));
        return Task.CompletedTask;
    }

    private Task FindCreatedBlocks(ProjectData original, ProjectData updated)
    {
        BlockCreate.AddRange(updated.Blocks.Exclude(original.Blocks, x => x.Id));
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

    //private async Task ResolveRelations(ProjectData original, ProjectData updated)
    //{
    //    var tasks = new List<Task>
    //    {
    //        Task.Run(() => FindDeletedRelations(original, updated)),
    //        Task.Run(() => FindCreatedRelations(original, updated))
    //    };
    //    await Task.WhenAll(tasks);
    //    var dict = updated.Relations.ToDictionary(x => x.Id, x => x);
    //    RelationUpdate.AddRange(original.Relations.Exclude(RelationCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
    //}

    //private Task FindDeletedRelations(ProjectData original, ProjectData updated)
    //{
    //    RelationDelete.AddRange(original.Relations.Exclude(updated.Relations, x => x.Id));
    //    return Task.CompletedTask;
    //}

    //private Task FindCreatedRelations(ProjectData original, ProjectData updated)
    //{
    //    RelationCreate.AddRange(updated.Relations.Exclude(original.Relations, x => x.Id));
    //    return Task.CompletedTask;
    //}

    //#endregion

    //#region Terminals

    //private async Task ResolveTerminals(ProjectData original, ProjectData updated)
    //{
    //    var tasks = new List<Task>
    //    {
    //        Task.Run(() => FindDeletedTerminals(original, updated)),
    //        Task.Run(() => FindCreatedTerminals(original, updated))
    //    };
    //    await Task.WhenAll(tasks);
    //    var dict = updated.Terminals.ToDictionary(x => x.Id, x => x);
    //    TerminalUpdate.AddRange(original.Terminals.Exclude(TerminalCreateAndDelete, x => x.Id).Where(y => !y.Equals(dict[y.Id])).Select(y => dict[y.Id]));
    //}

    //private Task FindDeletedTerminals(ProjectData original, ProjectData updated)
    //{
    //    TerminalDelete.AddRange(original.Terminals.Exclude(updated.Terminals, x => x.Id));
    //    return Task.CompletedTask;
    //}

    //private Task FindCreatedTerminals(ProjectData original, ProjectData updated)
    //{
    //    TerminalCreate.AddRange(updated.Terminals.Exclude(original.Terminals, x => x.Id));
    //    return Task.CompletedTask;
    //}

    #endregion
}