using Mb.Models.Enums;

namespace Mb.Models
{
    public class Attribute
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Unit { get; set; }
        public AttributeType Type { get; set; }
        public AttributeInputType InputType { get; set; }

        public virtual string NodeId { get; set; }
        public virtual Node Node { get; set; }
    }
}
