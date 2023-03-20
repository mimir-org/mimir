namespace Mb.Models.Data
{
    public class ConnectionHasLocation : ConnectionRelation
    {
        public string Discriminator => nameof(ConnectionHasLocation);

        private bool Equals(ConnectionHasLocation other)
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

            return obj.GetType() == GetType() && Equals((ConnectionHasLocation) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}