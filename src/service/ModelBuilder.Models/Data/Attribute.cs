using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using TypeScriptBuilder;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Attribute : IEquatable<Attribute>
    {
        #region Properties

        public string Id { get; set; }
        public string Iri { get; set; }
        public string Kind => nameof(Attribute);
        public string Entity { get; set; }
        public string Value { get; set; }
        public string AttributeTypeId { get; set; }
        public string AttributeTypeIri { get; set; }

        // Unit
        public string SelectedUnitId { get; set; }

        [NotMapped]
        public virtual ICollection<Unit> Units
        {
            get
            {
                if (_units != null)
                    return _units;

                return !string.IsNullOrWhiteSpace(UnitString) ?
                    JsonConvert.DeserializeObject<ICollection<Unit>>(UnitString) :
                    null;
            }
            set => _units = value;
        }

        [JsonIgnore]
        [TSExclude]
        public string UnitString { get; set; }

        public string SpecifiedScope { get; set; }
        public string SpecifiedProvenance { get; set; }
        public string RangeSpecifying { get; set; }
        public string RegularitySpecified { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ConnectorTerminal ConnectorTerminal { get; set; }

        public virtual string TerminalId { get; set; }
        public virtual string TerminalIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Node Node { get; set; }

        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        #endregion

        #region Members

        [TSExclude]
        private ICollection<Unit> _units;

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
                   SpecifiedScope == other.SpecifiedScope &&
                   SpecifiedProvenance == other.SpecifiedProvenance &&
                   RangeSpecifying == other.RangeSpecifying &&
                   RegularitySpecified == other.RegularitySpecified &&
                   TerminalId == other.TerminalId &&
                   TerminalIri == other.TerminalIri &&
                   NodeId == other.NodeId &&
                   NodeIri == other.NodeIri;
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
            hashCode.Add(SpecifiedScope);
            hashCode.Add(SpecifiedProvenance);
            hashCode.Add(RangeSpecifying);
            hashCode.Add(RegularitySpecified);
            hashCode.Add(TerminalId);
            hashCode.Add(TerminalIri);
            hashCode.Add(NodeId);
            hashCode.Add(NodeIri);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}