namespace Mb.Models.Client;

#region ConnectionCm class

public class ConnectionCm
{
    public string Id { get; set; }
    public string FromConnector { get; set; }
    public string ToConnector { get; set; }
    public string MainProject { get; set; }
    public string Project { get; set; }
}

#endregion ConnectionCm

#region ConnectionTerminalCm

public class ConnectionTerminalCm : ConnectionCm
{
    public string TerminalType { get; set; }
    public string TerminalParentType { get; set; }
    public string Discriminator { get; set; }
}

#endregion ConnectionTerminalCm

#region ConnectionRelationCm

public abstract class ConnectionRelationCm : ConnectionCm
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