using System.Collections.Generic;

namespace Mb.Models.Data.Enums
{
    public class PredefinedAttributeCategory : EnumBase
    {
        public string ParentId { get; set; }
        public PredefinedAttributeCategory Parent { get; set; }

        public ICollection<PredefinedAttributeCategory> Children { get; set; }
        public override string Key => string.IsNullOrEmpty(ParentId) ? $"{Name}-{InternalType}" : $"{Name}-{InternalType}-{ParentId}";
    }
}
