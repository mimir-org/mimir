using System;
using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class AttributeAm
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain { get; set; }
        public string Entity { get; set; }
        public string Value { get; set; }
        public string SemanticReference { get; set; }
        public string SelectedUnitId { get; set; }
        public string AttributeTypeId { get; set; }
        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }
        public string QualifierId { get; set; }
        public string SourceId { get; set; }
        public string ConditionId { get; set; }
        public string FormatId { get; set; }
        public virtual HashSet<string> Tags { get; set; }
        public string TerminalId { get; set; }
        public string NodeId { get; set; }
        public string TransportId { get; set; }
        public string InterfaceId { get; set; }
        public string CompositeId { get; set; }
        public virtual ICollection<UnitAm> Units { get; set; }
        public ICollection<string> SelectValues { get; set; }
        public SelectType SelectType { get; set; }
        public Discipline Discipline { get; set; }
    }
}
