using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class Terminal : Connector, IEquatable<Terminal>
    {
        public override string Kind => nameof(Terminal);
        public string Color { get; set; }
        public string TerminalTypeId { get; set; }
        public string TerminalTypeIri { get; set; }
        public string TerminalParentTypeId { get; set; }
        public string TerminalParentTypeIri { get; set; }
        public string TerminalParentTypeName { get; set; }
        public virtual ICollection<Attribute> Attributes { get; set; }
        public string Discriminator => nameof(Terminal);
        public bool IsProxy { get; set; }
        public string ProxyParent { get; set; }
        public string ProxySibling { get; set; }

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

        #region IEquatable

        public bool Equals(Terminal other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return base.Equals(other) &&
                   TypeReferenceString == other.TypeReferenceString &&
                   Color == other.Color &&
                   TerminalParentTypeName == other.TerminalParentTypeName &&
                   TerminalTypeId == other.TerminalTypeId &&
                   TerminalTypeIri == other.TerminalTypeIri &&
                   TerminalParentTypeId == other.TerminalParentTypeId &&
                   TerminalParentTypeIri == other.TerminalParentTypeIri &&
                   IsProxy == other.IsProxy &&
                   ProxyParent == other.ProxyParent &&
                   ProxySibling == other.ProxySibling;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Terminal) obj);
        }

        public override int GetHashCode()
        {
            var proxyString = $"{IsProxy}{ProxyParent}{ProxySibling}";
            var parentProxyString = $"{TerminalParentTypeId}{TerminalParentTypeIri}";
            return HashCode.Combine(base.GetHashCode(), Color, TerminalParentTypeName, TerminalTypeId, TerminalTypeIri, parentProxyString, TypeReferenceString, proxyString);
        }

        #endregion IEquatable

        #region Private members

        [TSExclude]
        private ICollection<TypeReference> _typeReferences;

        #endregion Private members
    }
}