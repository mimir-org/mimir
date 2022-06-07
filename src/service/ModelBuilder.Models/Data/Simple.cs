using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class Simple : IEquatable<Simple>
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Name { get; set; }
        public string Kind => nameof(Simple);
        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public Node Node { get; set; }

        public bool Equals(Simple other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   Name == other.Name &&
                   NodeId == other.NodeId &&
                   NodeIri == other.NodeIri;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Simple) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Iri, Name, NodeId, NodeIri);
        }
    }
}