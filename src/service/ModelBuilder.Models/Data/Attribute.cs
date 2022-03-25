using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Newtonsoft.Json;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Attribute : IEquatable<Attribute>
    {
        #region Properties

        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Kind => nameof(Attribute);
        public string Entity { get; set; }
        public string Value { get; set; }
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

        #region IEquatable

        public bool Equals(Attribute other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   Entity == other.Entity &&
                   Value == other.Value &&
                   AttributeTypeId == other.AttributeTypeId &&
                   AttributeTypeIri == other.AttributeTypeIri &&
                   SelectedUnitId == other.SelectedUnitId &&
                   UnitString == other.UnitString &&
                   QualifierId == other.QualifierId &&
                   SourceId == other.SourceId &&
                   ConditionId == other.ConditionId &&
                   FormatId == other.FormatId &&
                   TerminalId == other.TerminalId &&
                   TerminalIri == other.TerminalIri &&
                   NodeId == other.NodeId &&
                   NodeIri == other.NodeIri &&
                   TransportId == other.TransportId &&
                   TransportIri == other.TransportIri &&
                   InterfaceId == other.InterfaceId &&
                   InterfaceIri == other.InterfaceIri &&
                   SimpleId == other.SimpleId &&
                   SimpleIri == other.SimpleIri &&
                   SelectValuesString == other.SelectValuesString &&
                   SelectType == other.SelectType &&
                   Discipline == other.Discipline &&
                   IsLocked == other.IsLocked &&
                   IsLockedStatusBy == other.IsLockedStatusBy &&
                   Nullable.Equals(IsLockedStatusDate, other.IsLockedStatusDate);
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Attribute) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(Iri);
            hashCode.Add(Entity);
            hashCode.Add(Value);
            hashCode.Add(AttributeTypeId);
            hashCode.Add(AttributeTypeIri);
            hashCode.Add(SelectedUnitId);
            hashCode.Add(UnitString);
            hashCode.Add(QualifierId);
            hashCode.Add(SourceId);
            hashCode.Add(ConditionId);
            hashCode.Add(FormatId);
            hashCode.Add(TerminalId);
            hashCode.Add(TerminalIri);
            hashCode.Add(NodeId);
            hashCode.Add(NodeIri);
            hashCode.Add(TransportId);
            hashCode.Add(TransportIri);
            hashCode.Add(InterfaceId);
            hashCode.Add(InterfaceIri);
            hashCode.Add(SimpleId);
            hashCode.Add(SimpleIri);
            hashCode.Add(SelectValuesString);
            hashCode.Add((int) SelectType);
            hashCode.Add((int) Discipline);
            hashCode.Add(Tags);
            hashCode.Add(IsLocked);
            hashCode.Add(IsLockedStatusBy);
            hashCode.Add(IsLockedStatusDate);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}