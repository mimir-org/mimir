using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class AttributeAm
    {
        public string Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string SelectedUnitId { get; set; }
        public string AttributeTypeId { get; set; }
        public string QualifierId { get; set; }
        public string SourceId { get; set; }
        public string ConditionId { get; set; }
        public string FormatId { get; set; }
        public string TerminalId { get; set; }
        public string NodeId { get; set; }
        public virtual ICollection<UnitAm> Units { get; set; }
    }
}
