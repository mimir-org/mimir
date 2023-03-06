using System;
using System.Collections.Generic;
using Mimirorg.Common.Extensions;
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
        public string Domain => Id.ResolveDomain();
        public string Name { get; set; }
        public ConnectorDirection Direction { get; set; }
        public virtual string AspectObjectId { get; set; }
        public string Inside { get; set; }
        public string Outside { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Node AspectObject { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Connection> FromConnections { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Connection> ToConnections { get; set; }

        #endregion

        public bool Equals(Connector other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Name == other.Name &&
                   Direction == other.Direction &&
                   AspectObjectId == other.AspectObjectId;
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
            return HashCode.Combine(Id, Name, (int) Direction, AspectObjectId);
        }
    }
}