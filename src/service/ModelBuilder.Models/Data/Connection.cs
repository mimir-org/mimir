using System;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Extensions;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Connection : IEquatable<Connection>
    {
        public string Id { get; set; }
        public virtual string Discriminator { get; set; }
        public string Domain => Id.ResolveDomain();
        public string FromConnector { get; set; }
        public string ToConnector { get; set; }
        
        [Required]
        public string MainProject { get; set; }

        [Required]
        public virtual string Project { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Project ProjectObject { get; set; }

        #region IEquatable

        public bool Equals(Connection other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   FromConnector == other.FromConnector &&
                   ToConnector == other.ToConnector &&
                   MainProject == other.MainProject &&
                   Project == other.Project;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Connection) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(FromConnector);
            hashCode.Add(ToConnector);
            hashCode.Add(MainProject);
            hashCode.Add(Project);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}