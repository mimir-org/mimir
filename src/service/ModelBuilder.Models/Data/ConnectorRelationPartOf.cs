using Mb.Models.Const;

namespace Mb.Models.Data
{
    public class ConnectorRelationPartOf : ConnectorRelation
    {
        public override string Discriminator => Discriminators.PartOf;

        private bool Equals(ConnectorRelationPartOf other)
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

            return obj.GetType() == GetType() && Equals((ConnectorRelationPartOf) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}
