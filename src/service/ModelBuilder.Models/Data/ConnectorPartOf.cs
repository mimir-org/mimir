using Mb.Models.Const;

namespace Mb.Models.Data
{
    public class ConnectorPartOf : ConnectorRelation
    {
        public string Discriminator => nameof(ConnectorPartOf);

        private bool Equals(ConnectorPartOf other)
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

            return obj.GetType() == GetType() && Equals((ConnectorPartOf) obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}