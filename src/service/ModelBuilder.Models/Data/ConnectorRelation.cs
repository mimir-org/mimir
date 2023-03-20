using System;

namespace Mb.Models.Data
{
    public abstract class ConnectorRelation : Connector, IEquatable<ConnectorRelation>
    {
        public bool Equals(ConnectorRelation other)
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

            return obj.GetType() == GetType() && Equals((ConnectorRelation) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}