using System;
using System.Collections.Generic;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mimirorg.TypeLibrary.Enums;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Connector : IEquatable<Connector>
    {
        #region Properties
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Kind => nameof(Connector);
        public string Name { get; set; }
        public ConnectorDirection Type { get; set; }
        public ConnectorVisibility ConnectorVisibility { get; set; }
        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }
        public bool IsRequired { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Node Node { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Edge> FromEdges { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Edge> ToEdges { get; set; }

        #endregion

        public bool Equals(Connector other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   Name == other.Name &&
                   Type == other.Type &&
                   ConnectorVisibility == other.ConnectorVisibility &&
                   NodeId == other.NodeId &&
                   NodeIri == other.NodeIri &&
                   IsRequired == other.IsRequired;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((Connector) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Iri, Name, (int) Type, (int) ConnectorVisibility, NodeId, NodeIri, IsRequired);
        }
    }
}