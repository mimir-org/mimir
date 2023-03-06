using System;
using Mb.Models.Enums;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class Relation : Connector, IEquatable<Relation>
    {
        public virtual string Discriminator => nameof(Relation);
        public RelationType RelationType { get; set; }

        #region IEquatable

        public bool Equals(Relation other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return base.Equals(other);
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
            return base.GetHashCode();
        }

        #endregion
    }

    public class PartOf : Relation
    {
        public override string Discriminator => nameof(PartOf);

        private bool Equals(PartOf other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return base.Equals(other);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((PartOf) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}