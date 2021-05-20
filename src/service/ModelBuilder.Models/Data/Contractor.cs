using System;

namespace Mb.Models.Data
{
    public class Contractor
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
                return false;

            if (!(obj is Contractor))
                return false;

            var b = (Contractor)obj;

            return Id.Equals(b.Id);

        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }
    }
}
