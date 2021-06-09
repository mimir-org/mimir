using System;
using System.Collections.Generic;
using System.Linq;

namespace Mb.Models.Data.Enums.Mapping
{
    public enum EnumType
    {
        Unit =0,
        AttributeCondition=1,
        AttributeFormat=2
    }

    public static class EnumTypeExtension {
        private static Dictionary<int, Type> EnumTypes { get; set; }

        public static Type GetEnumTypeFromEnum(this EnumType enumType)
        {
            if (EnumTypes == null || !EnumTypes.Any())
            {
                EnumTypes = new Dictionary<int, Type>();
                PopulateEnumTypes();
            }

            return EnumTypes.TryGetValue((int)enumType, out var value) ? value : typeof(EnumBase);
        }
        
        private static void PopulateEnumTypes()
        {
            EnumTypes.Add(0, typeof(Unit));
            EnumTypes.Add(1, typeof(AttributeCondition));
            EnumTypes.Add(2, typeof(AttributeFormat));
        }
    }
}
