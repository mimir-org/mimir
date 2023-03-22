using System;
using Mimirorg.Common.Extensions;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data;

#region ConnectionDm

[Serializable]
public class ConnectionDm : IEquatable<ConnectionDm>
{
    public string Id { get; set; }
    public string Domain => Id.ResolveDomain();
    public string FromConnector { get; set; }
    public string ToConnector { get; set; }
    public string MainProject { get; set; }
    public string Project { get; set; }

    public bool Equals(ConnectionDm other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id &&
               FromConnector == other.FromConnector &&
               ToConnector == other.ToConnector &&
               MainProject == other.MainProject &&
               Project == other.Project;
    }

    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((ConnectionDm) obj);
    }

    public override int GetHashCode()
    {
        var hashCode = new HashCode();
        hashCode.Add(Id);
        hashCode.Add(FromConnector);
        hashCode.Add(ToConnector);
        hashCode.Add(MainProject);
        hashCode.Add(Project);
        return hashCode.ToHashCode();
    }
}

#endregion ConnectionDm

#region ConnectionTerminalDm

public class ConnectionTerminalDm : ConnectionDm, IEquatable<ConnectionTerminalDm>
{
    public string TerminalType { get; set; }
    public string TerminalParentType { get; set; }
    public string Discriminator => nameof(ConnectionTerminalDm);

    public bool Equals(ConnectionTerminalDm other)
    {
        if (other is null)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        return base.Equals(other) &&
               TerminalType == other.TerminalType &&
               TerminalParentType == other.TerminalParentType;
    }

    public override bool Equals(object obj)
    {
        if (obj is null)
            return false;

        if (ReferenceEquals(this, obj))
            return true;

        return obj.GetType() == GetType() && Equals((ConnectionTerminalDm) obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(base.GetHashCode(), TerminalType);
    }
}

#endregion ConnectionTerminalDm

#region ConnectionRelationDm

public abstract class ConnectionRelationDm : ConnectionDm, IEquatable<ConnectionRelationDm>
{
    public bool Equals(ConnectionRelationDm other)
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

        return obj.GetType() == GetType() && Equals((ConnectionRelationDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }
}

#endregion ConnectionRelationDm

#region ConnectionFulfilledByDm

public class ConnectionFulfilledByDm : ConnectionRelationDm
{
    public string Discriminator => nameof(ConnectionFulfilledByDm);

    private bool Equals(ConnectionFulfilledByDm other)
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

        return obj.GetType() == GetType() && Equals((ConnectionFulfilledByDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}

#endregion ConnectionFulfilledByDm

#region ConnectionHasLocationDm

public class ConnectionHasLocationDm : ConnectionRelationDm
{
    public string Discriminator => nameof(ConnectionHasLocationDm);

    private bool Equals(ConnectionHasLocationDm other)
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

        return obj.GetType() == GetType() && Equals((ConnectionHasLocationDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}

#endregion ConnectionHasLocationDm

#region ConnectionPartOfDm

public class ConnectionPartOfDm : ConnectionRelationDm
{
    public string Discriminator => nameof(ConnectionPartOfDm);

    private bool Equals(ConnectionPartOfDm other)
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

        return obj.GetType() == GetType() && Equals((ConnectionPartOfDm) obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

}

#endregion ConnectionPartOfDm