using System.Collections.Generic;

namespace Mb.Models.Client;

#region ConnectionCm class

public abstract class ConnectionResponse
{
    public string Id { get; set; }
    public string FromConnector { get; set; }
    public string ToConnector { get; set; }
    public string MainProject { get; set; }
    public string Project { get; set; }
    public ICollection<HandleResponse> Handles { get; set; }
}

#endregion ConnectionCm

#region ConnectionTerminalCm

public class ConnectionTerminalCm : ConnectionResponse
{
    public string TerminalType { get; set; }
    public string TerminalParentType { get; set; }
    public string Discriminator { get; set; }
}

#endregion ConnectionTerminalCm

#region ConnectionRelationCm

public class ConnectionRelationCm : ConnectionResponse
{
}

#endregion ConnectionRelationCm

#region ConnectionFulfilledByCm

public class ConnectionFulfilledByCm : ConnectionRelationCm
{
    public string Discriminator { get; set; }
}

#endregion ConnectionFulfilledByCm

#region ConnectionHasLocationCm

public class ConnectionHasLocationCm : ConnectionRelationCm
{
    public string Discriminator { get; set; }
}

#endregion ConnectionHasLocationCm

#region ConnectionPartOfCm

public class ConnectionPartOfCm : ConnectionRelationCm
{
    public string Discriminator { get; set; }
}

#endregion ConnectionPartOfCm