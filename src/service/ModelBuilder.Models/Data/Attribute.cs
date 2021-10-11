using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    [Serializable]
    public class Attribute
    {
        public string Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string SemanticReference { get; set; }
        public string AttributeTypeId { get; set; }
        public bool IsLocked {  get; set; }
        public string IsLockedBy {  get; set; }
        
        public string SelectedUnitId { get; set; }
        
        public string QualifierId { get; set; }
        public AttributeQualifier Qualifier { get; set; }

        public string SourceId { get; set; }
        public AttributeSource Source { get; set; }
        
        public string ConditionId { get; set; }
        public AttributeCondition Condition { get; set; }

        public string FormatId { get; set; }
        public AttributeFormat Format { get; set; }
        
        [NotMapped]
        public ICollection<string> SelectValues => string.IsNullOrEmpty(SelectValuesString) ? null : SelectValuesString.ConvertToArray();

        [JsonIgnore]
        public string SelectValuesString { get; set; }

        public SelectType SelectType { get; set; }

        public Discipline Discipline { get; set; }

        [NotMapped]
        public virtual ICollection<Unit> Units { get; set; }

        [JsonIgnore]
        public string UnitString { get; set; }

        public virtual string TerminalId { get; set; }
        public virtual string NodeId { get; set; }
        public virtual string TransportId { get; set; }
        public virtual string CompositeId { get; set; }

        [JsonIgnore]
        public virtual Terminal Terminal { get; set; }

        [JsonIgnore]
        public virtual Node Node { get; set; }

        [JsonIgnore]
        public virtual Composite Composite { get; set; }

        [JsonIgnore]
        public virtual Transport Transport { get; set; }

    }
}
