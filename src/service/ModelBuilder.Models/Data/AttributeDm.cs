using System;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data;

[Serializable]
public class AttributeDm : IEquatable<AttributeDm>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
    public string AttributeType { get; set; }
    public string UnitSelected { get; set; }
    public string Units { get; set; }
    public string Qualifiers { get; set; }
    public string ConnectorTerminal { get; set; }
    public Guid Block { get; set; }

    #region IEquatable

    public bool Equals(AttributeDm other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id &&
               Name == other.Name &&
               Value == other.Value &&
               AttributeType == other.AttributeType &&
               UnitSelected == other.UnitSelected &&
               Units == other.Units &&
               Qualifiers == other.Qualifiers &&
               ConnectorTerminal == other.ConnectorTerminal &&
               Block == other.Block;
    }

    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((AttributeDm) obj);
    }

    public override int GetHashCode()
    {
        var hashCode = new HashCode();
        hashCode.Add(Id);
        hashCode.Add(Name);
        hashCode.Add(Value);
        hashCode.Add(AttributeType);
        hashCode.Add(UnitSelected);
        hashCode.Add(Units);
        hashCode.Add(Qualifiers);
        hashCode.Add(ConnectorTerminal);
        hashCode.Add(Block);
        return hashCode.ToHashCode();
    }

    #endregion
}