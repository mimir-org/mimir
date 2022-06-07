using System;
using Mb.Models.Enums;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [TSFlat]
    public class Relation : Connector, IEquatable<Relation>
    {
        public RelationType RelationType { get; set; }
        public string Discriminator => nameof(Relation);

        #region IEquatable

        public bool Equals(Relation other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return base.Equals(other) && RelationType == other.RelationType;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((Relation) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(base.GetHashCode(), (int) RelationType);
        }

        #endregion
    }
}