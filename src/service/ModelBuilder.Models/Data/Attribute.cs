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
        public string Name { get; set; }
        public string Value { get; set; }
        public string AttributeType { get; set; }

        // Unit
        public string SelectedUnit { get; set; }

        [NotMapped]
        public virtual ICollection<Unit> Units
        {
            get
            {
                if (_units != null)
                    return _units;

                return !string.IsNullOrWhiteSpace(UnitString) ? JsonConvert.DeserializeObject<ICollection<Unit>>(UnitString) : null;
            }
            set => _units = value;
        }

        [JsonIgnore]
        [TSExclude]
        public string UnitString { get; set; }

        public string Qualifiers { get; set; }

        public string ConnectorTerminal { get; set; }
        public string AspectObject { get; set; }

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
                   Name == other.Name &&
                   Value == other.Value &&
                   AttributeType == other.AttributeType &&
                   SelectedUnit == other.SelectedUnit &&
                   UnitString == other.UnitString &&
                   Qualifiers == other.Qualifiers &&
                   ConnectorTerminal == other.ConnectorTerminal &&
                   AspectObject == other.AspectObject;
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
            hashCode.Add(Name);
            hashCode.Add(Value);
            hashCode.Add(AttributeType);
            hashCode.Add(SelectedUnit);
            hashCode.Add(UnitString);
            hashCode.Add(Qualifiers);
            hashCode.Add(ConnectorTerminal);
            hashCode.Add(AspectObject);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}