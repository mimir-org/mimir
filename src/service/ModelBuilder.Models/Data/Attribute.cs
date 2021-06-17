using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Data.Enums;

namespace Mb.Models.Data
{
    [Serializable]
    public class Attribute
    {
        public string Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        
        public string SelectedUnitId { get; set; }
        public Unit Unit => Units?.SingleOrDefault(x => x.Id.Equals(SelectedUnitId));

        public string QualifierId { get; set; }
        public AttributeQualifier Qualifier { get; set; }

        public string SourceId { get; set; }
        public AttributeSource Source { get; set; }
        
        public string ConditionId { get; set; }
        public AttributeCondition Condition { get; set; }

        public string FormatId { get; set; }
        public AttributeFormat Format { get; set; }

        public virtual ICollection<Unit> Units { get; set; }

        public virtual string TerminalId { get; set; }
        public virtual Terminal Terminal { get; set; }

        public virtual string NodeId { get; set; }
        public virtual Node Node { get; set; }
    }
}
