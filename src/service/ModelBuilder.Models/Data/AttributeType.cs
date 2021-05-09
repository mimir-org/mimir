using System;
using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class AttributeType
    {
        public int Id { get; set; }
        public string Entity { get; set; }
        public AttributeQualifier Qualifier { get; set; }
        public AttributeSource Source { get; set; }
        public AttributeCondition Condition { get; set; }
        public ICollection<Unit> Units { get; set; }
        public Aspect Aspect { get; set; }
        public AttributeFormat Format { get; set; }
        public bool IsInterface { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
                return false;


            if (!(obj is AttributeType))
                return false;

            var b = (AttributeType) obj;

            return Entity.Equals(b.Entity) &&
                   Qualifier.Equals(b.Qualifier) &&
                   Source.Equals(b.Source) &&
                   Condition.Equals(b.Condition) &&
                   Aspect.Equals(b.Aspect);

        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }
    }
}
