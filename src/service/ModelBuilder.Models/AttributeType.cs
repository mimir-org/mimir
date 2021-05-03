using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models
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
    }
}
