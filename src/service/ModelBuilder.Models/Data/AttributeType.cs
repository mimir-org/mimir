using System.Collections.Generic;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class AttributeType
    {
        public string Id { get; set; }
        public string Entity { get; set; }
        public Aspect Aspect { get; set; }

        public string QualifierId { get; set; }
        public AttributeQualifier Qualifier { get; set; }

        public string SourceId { get; set; }
        public AttributeSource Source { get; set; }
        
        public string ConditionId { get; set; }
        public AttributeCondition Condition { get; set; }
        
        public ICollection<Unit> Units { get; set; }
        
        public string FormatId { get; set; }
        public AttributeFormat Format { get; set; }

        [JsonIgnore]
        public virtual ICollection<TerminalType> TerminalTypes { get; set; }

        [JsonIgnore]
        public virtual ICollection<NodeType> NodeTypes { get; set; }

        [JsonIgnore]
        public virtual ICollection<TransportType> TransportTypes { get; set; }

        [JsonIgnore]
        public virtual ICollection<CompositeType> CompositeTypes { get; set; }
    }
}
