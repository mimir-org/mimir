using Mb.Models.Const;

namespace Mb.Models.Data
{
    public class ConnectorRelationFulfilledBy : ConnectorRelation
    {
        public override string Discriminator => Discriminators.FulfilledBy;

        private bool Equals(ConnectorRelationFulfilledBy other)
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

            return obj.GetType() == GetType() && Equals((ConnectorRelationFulfilledBy) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}
