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
    public abstract class Connector : IEquatable<Connector>
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public virtual string Discriminator { get; set; }
        public ConnectorDirection Direction { get; set; }
        public string Inside { get; set; }
        public string Outside { get; set; }
        public virtual string Color { get; set; }
        public virtual string AspectObjectId { get; set; }
        public virtual string TypeReference { get; set; }
        public virtual string TerminalType { get; set; }
        public virtual string TerminalParentType { get; set; }

        public string Domain => Id.ResolveDomain();

        [JsonIgnore]
        [TSExclude]
        public virtual AspectObject AspectObject { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Connection> FromConnections { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Connection> ToConnections { get; set; }

        public bool Equals(Connector other)
        {
            if (other is null) 
                return false;

            if (ReferenceEquals(this, other)) 
                return true;

            return Id == other.Id &&
                   Name == other.Name &&
                   Direction == other.Direction &&
                   AspectObjectId == other.AspectObjectId;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) 
                return false;

            if (ReferenceEquals(this, obj)) 
                return true;

            return obj.GetType() == GetType() && Equals((Connector) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, (int) Direction, AspectObjectId);
        }
    }
}