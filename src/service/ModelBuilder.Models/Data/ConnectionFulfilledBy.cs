namespace Mb.Models.Data
{
    public class ConnectionFulfilledBy : ConnectionRelation
    {
        public string Discriminator => nameof(ConnectionFulfilledBy);

        private bool Equals(ConnectionFulfilledBy other)
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

            return obj.GetType() == GetType() && Equals((ConnectionFulfilledBy) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}