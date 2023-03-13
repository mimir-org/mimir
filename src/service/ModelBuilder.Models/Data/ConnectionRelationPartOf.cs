namespace Mb.Models.Data
{
    public class ConnectionRelationPartOf : ConnectionRelation
    {
        public override string Discriminator => nameof(ConnectionRelationPartOf);

        private bool Equals(ConnectionRelationPartOf other)
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

            return obj.GetType() == GetType() && Equals((ConnectionRelationPartOf) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}
