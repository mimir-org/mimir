using System;
using System.Collections.Generic;
using System.Linq;

namespace Mb.Models.Data.Enums.Mapping
{
    public enum EnumType
    {
        Unit = 0,
        AttributeCondition = 1,
        AttributeQualifier = 2,
        AttributeSource = 3,
        RdsCategory = 4,
        TerminalCategory = 5,
        AttributeFormat = 6,
        BuildStatus = 7,
        PredefinedAttributeCategory = 8,
        Purpose = 9
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
            EnumTypes.Add(2, typeof(AttributeQualifier));
            EnumTypes.Add(3, typeof(AttributeSource));
            EnumTypes.Add(4, typeof(RdsCategory));
            EnumTypes.Add(5, typeof(TerminalCategory));
            EnumTypes.Add(6, typeof(AttributeFormat));
            EnumTypes.Add(7, typeof(BuildStatus));
            EnumTypes.Add(8, typeof(PredefinedAttributeCategory));
            EnumTypes.Add(9, typeof(Purpose));
        }
    }
}
