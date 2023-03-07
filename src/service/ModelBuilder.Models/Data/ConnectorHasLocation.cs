using Mb.Models.Const;

namespace Mb.Models.Data
{
    public class ConnectorHasLocation : ConnectorRelation
    {
        public override string Discriminator => Discriminators.HasLocation;

        private bool Equals(ConnectorHasLocation other)
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

            return obj.GetType() == GetType() && Equals((ConnectorHasLocation) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}
