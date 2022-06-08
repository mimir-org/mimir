using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class Terminal : Connector, IEquatable<Terminal>
    {
        public string Color { get; set; }
        public string TerminalCategory { get; set; }
        public string TerminalTypeId { get; set; }
        public string TerminalTypeIri { get; set; }
        public virtual ICollection<Attribute> Attributes { get; set; }
        public string Discriminator => nameof(Terminal);

        [JsonIgnore]
        [TSExclude]
        public ICollection<Transport> InputTransports { get; set; }

        [JsonIgnore]
        [TSExclude]
        public ICollection<Transport> OutputTransports { get; set; }

        [JsonIgnore]
        [TSExclude]
        public ICollection<Interface> InputInterfaces { get; set; }

        [JsonIgnore]
        [TSExclude]
        public ICollection<Interface> OutputInterfaces { get; set; }

        #region IEquatable

        public bool Equals(Terminal other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return base.Equals(other) &&
                   Color == other.Color &&
                   TerminalCategory == other.TerminalCategory &&
                   TerminalTypeId == other.TerminalTypeId &&
                   TerminalTypeIri == other.TerminalTypeIri;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Terminal) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(base.GetHashCode(), Color, TerminalCategory, TerminalTypeId, TerminalTypeIri);
        }

        #endregion
    }
}