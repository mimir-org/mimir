using System;

namespace Mb.Models.Data
{
    public class ConnectionRelation : Connection, IEquatable<ConnectionRelation>
    {
        public bool Equals(ConnectionRelation other)
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

            return obj.GetType() == GetType() && Equals((ConnectionRelation) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}