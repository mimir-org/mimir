using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Client;

#region ConnectorCm

public abstract class ConnectorCm
{
    public string Id { get; set; }
    public string Name { get; set; }
    public ConnectorDirection Direction { get; set; }
    public string Inside { get; set; }
    public string Outside { get; set; }
    public string Project { get; set; }
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
    public string Discriminator { get; set; }
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
    public string Discriminator { get; set; }
}

#endregion ConnectorFulfilledByCm

#region ConnectorHasLocationCm

public class ConnectorHasLocationCm : ConnectorRelationCm
{
    public string Discriminator { get; set; }
}

#endregion ConnectorHasLocationCm

#region ConnectorPartOfCm

public class ConnectorPartOfCm : ConnectorRelationCm
{
    public string Discriminator { get; set; }
}

#endregion ConnectorPartOfCm