using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using System.Collections.Generic;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Client;

#region ConnectorCm

public abstract class ConnectorCm
{
    public string Id { get; set; }
    public string Domain => Id.ResolveDomain();
    public string Name { get; set; }
    public ConnectorDirection Direction { get; set; }
    public string Inside { get; set; }
    public string Outside { get; set; }
    public string AspectObject { get; set; }
}

#endregion ConnectorCm

#region ConnectorTerminalCm

public class ConnectorTerminalCm : ConnectorCm
{
    public string TerminalType { get; set; }
    public string TerminalParentType { get; set; }
    public string ReferenceType { get; set; }
    public string Color { get; set; }
    public ICollection<AttributeCm> Attributes { get; set; }
}

#endregion ConnectorTerminalCm

#region ConnectorRelationCm

public abstract class ConnectorRelationCm : ConnectorCm
{
}

#endregion ConnectorRelationCm class

#region ConnectorFulfilledByCm class

public class ConnectorFulfilledByCm : ConnectorRelationCm
{
}

#endregion ConnectorFulfilledByCm

#region ConnectorHasLocationCm

public class ConnectorHasLocationCm : ConnectorRelationCm
{
}

#endregion ConnectorHasLocationCm

#region ConnectorPartOfCm

public class ConnectorPartOfCm : ConnectorRelationCm
{
}

#endregion ConnectorPartOfCm