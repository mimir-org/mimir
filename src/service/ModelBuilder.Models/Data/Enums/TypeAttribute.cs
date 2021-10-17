using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data.Enums
{
    public class TypeAttribute : EnumBase
    {
        public string ParentId { get; set; }
        public Aspect Aspect { get; set; }
        public TypeAttribute Parent { get; set; }

        public ICollection<TypeAttribute> Children { get; set; }
        public override string Key => string.IsNullOrEmpty(ParentId) ? $"{Name}-{InternalType}" : $"{Name}-{InternalType}-{ParentId}";
    }
}
