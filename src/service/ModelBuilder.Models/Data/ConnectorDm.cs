using Mimirorg.TypeLibrary.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data;

#region ConnectorDm

[Serializable]
public class ConnectorDm : IEquatable<ConnectorDm>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ConnectorDirection Direction { get; set; }
    public string Inside { get; set; }
    public string Outside { get; set; }
    public Guid Block { get; set; }

    public bool Equals(ConnectorDm other)
    {
        if (other is null)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        return Id == other.Id &&
               Name == other.Name &&
               Direction == other.Direction &&
               Block == other.Block;
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectorDm) obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, Name, (int) Direction, Block);
    }
}

#endregion ConnectorDm

#region ConnectorTerminalDm

public class ConnectorTerminalDm : ConnectorDm, IEquatable<ConnectorTerminalDm>
{
    public string TerminalType { get; set; }
    public string TerminalParentType { get; set; }
    public string ReferenceType { get; set; }
    public string Color { get; set; }

    [NotMapped]
    public ICollection<AttributeDm> Attributes { get; set; }

    [NotMapped]
    public string Discriminator { get; set; }

    public bool Equals(ConnectorTerminalDm other)
    {
        if (other is null)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        return base.Equals(other) &&
               ReferenceType == other.ReferenceType &&
               Color == other.Color &&
               TerminalType == other.TerminalType &&
               TerminalParentType == other.TerminalParentType;
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectorTerminalDm) obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(base.GetHashCode(), Color, TerminalType, ReferenceType);
    }
}

#endregion ConnectorTerminalDm

#region ConnectorRelationDm

public abstract class ConnectorRelationDm : ConnectorDm, IEquatable<ConnectorRelationDm>
{
    public bool Equals(ConnectorRelationDm other)
    {
        if (other is null)
            return false;

        return ReferenceEquals(this, other) || base.Equals(other);
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectorRelationDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }
}

#endregion ConnectorRelationDm

#region ConnectorFulfilledByDm

public class ConnectorFulfilledByDm : ConnectorRelationDm
{
    public string Discriminator => nameof(ConnectorFulfilledByDm);

    private bool Equals(ConnectorFulfilledByDm other)
    {
        if (other is null)
            return false;

        return ReferenceEquals(this, other) || base.Equals(other);
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectorFulfilledByDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}

#endregion ConnectorFulfilledByDm

#region ConnectorHasLocationDm

public class ConnectorHasLocationDm : ConnectorRelationDm
{
    public string Discriminator => nameof(ConnectorHasLocationDm);

    private bool Equals(ConnectorHasLocationDm other)
    {
        if (other is null)
            return false;

        return ReferenceEquals(this, other) || base.Equals(other);
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectorHasLocationDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}

#endregion ConnectorHasLocationDm

#region ConnectorPartOfDm

public class ConnectorPartOfDm : ConnectorRelationDm
{
    public string Discriminator => nameof(ConnectorPartOfDm);

    private bool Equals(ConnectorPartOfDm other)
    {
        if (other is null)
            return false;

        return ReferenceEquals(this, other) || base.Equals(other);
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectorPartOfDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}

#endregion ConnectorPartOfDm