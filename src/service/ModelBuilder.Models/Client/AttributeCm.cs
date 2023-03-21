using System;
using System.Collections.Generic;

namespace Mb.Models.Client
{
    public class AttributeCm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string AttributeType { get; set; }
        public string UnitSelected { get; set; }
        public ICollection<UnitCm> Units { get; set; }
        public ICollection<QualifierCm> Qualifiers { get; set; }
        public string ConnectorTerminal { get; set; }
        public string AspectObject { get; set; }
        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }
    }
}