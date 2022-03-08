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
        #region Properties

        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Kind => nameof(Attribute);

        public string Entity { get; set; }
        public string Value { get; set; }

        // Type
        public string AttributeTypeId { get; set; }
        public string AttributeTypeIri { get; set; }

        // Unit
        public string SelectedUnitId { get; set; }
        
        [NotMapped]
        public virtual ICollection<Unit> Units { get; set; }

        [JsonIgnore]
        public string UnitString { get; set; }

        // Qualifiers
        public string QualifierId { get; set; }
        public AttributeQualifier Qualifier { get; set; }

        public string SourceId { get; set; }
        public AttributeSource Source { get; set; }

        public string ConditionId { get; set; }
        public AttributeCondition Condition { get; set; }

        public string FormatId { get; set; }
        public AttributeFormat Format { get; set; }

        // Reference objects
        [JsonIgnore]
        public virtual Terminal Terminal { get; set; }
        public virtual string TerminalId { get; set; }
        public virtual string TerminalIri { get; set; }

        [JsonIgnore]
        public virtual Node Node { get; set; }
        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }

        [JsonIgnore]
        public virtual Transport Transport { get; set; }
        public virtual string TransportId { get; set; }
        public virtual string TransportIri { get; set; }

        [JsonIgnore]
        public virtual Interface Interface { get; set; }
        public virtual string InterfaceId { get; set; }
        public virtual string InterfaceIri { get; set; }

        [JsonIgnore]
        public virtual Simple Simple { get; set; }
        public virtual string SimpleId { get; set; }
        public virtual string SimpleIri { get; set; }

        [NotMapped]
        public ICollection<string> SelectValues => string.IsNullOrEmpty(SelectValuesString) ? null : SelectValuesString.ConvertToArray();

        [JsonIgnore]
        public string SelectValuesString { get; set; }

        public SelectType SelectType { get; set; }
        public Discipline Discipline { get; set; }
        
        public virtual HashSet<string> Tags { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        #endregion

    }
}