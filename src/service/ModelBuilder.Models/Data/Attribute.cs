using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Extensions;
using Microsoft.SqlServer.Server;
using Newtonsoft.Json;
using TypeScriptBuilder;
using Mimirorg.TypeLibrary.Enums;
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

        [NotMapped]
        public virtual ICollection<TypeReference> TypeReferences
        {
            get
            {
                if (_typeReferences != null)
                    return _typeReferences;

                return !string.IsNullOrWhiteSpace(TypeReferenceString) ? JsonConvert.DeserializeObject<ICollection<TypeReference>>(TypeReferenceString) : null;
            }

            set => _typeReferences = value;
        }

        [JsonIgnore]
        [TSExclude]
        public string TypeReferenceString { get; set; }

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
        public virtual Terminal Terminal { get; set; }

        public virtual string TerminalId { get; set; }
        public virtual string TerminalIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Node Node { get; set; }

        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Transport Transport { get; set; }

        public virtual string TransportId { get; set; }
        public virtual string TransportIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Interface Interface { get; set; }

        public virtual string InterfaceId { get; set; }
        public virtual string InterfaceIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Simple Simple { get; set; }

        public virtual string SimpleId { get; set; }
        public virtual string SimpleIri { get; set; }

        [NotMapped]
        public ICollection<string> SelectValues => string.IsNullOrEmpty(SelectValuesString) ? null : SelectValuesString.ConvertToArray();

        [JsonIgnore]
        [TSExclude]
        public string SelectValuesString { get; set; }

        public Select SelectType { get; set; }
        public Discipline Discipline { get; set; }
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
                   TypeReferenceString == other.TypeReferenceString &&
                   SpecifiedScope == other.SpecifiedScope &&
                   SpecifiedProvenance == other.SpecifiedProvenance &&
                   RangeSpecifying == other.RangeSpecifying &&
                   RegularitySpecified == other.RegularitySpecified &&
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
                   Discipline == other.Discipline;
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
            hashCode.Add(TypeReferenceString);
            hashCode.Add(SpecifiedScope);
            hashCode.Add(SpecifiedProvenance);
            hashCode.Add(RangeSpecifying);
            hashCode.Add(RegularitySpecified);
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
            return hashCode.ToHashCode();
        }

        #endregion

        #region Private members

        [TSExclude]
        private ICollection<TypeReference> _typeReferences;

        #endregion Private members
    }
}