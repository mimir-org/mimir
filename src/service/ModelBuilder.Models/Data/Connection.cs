using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public Connector FromConnectorObject { get; set; }
        public string ToConnector { get; set; }
        public Connector ToConnectorObject { get; set; }
        public string FromAspectObject { get; set; }
        public AspectObject FromAspectObjectObject { get; set; }
        public string ToAspectObject { get; set; }
        public AspectObject ToAspectObjectObject { get; set; }
        public virtual string TerminalType { get; set; }
        public virtual string TerminalParentType { get; set; }

        [Required]
        public string MainProject { get; set; }

        [Required]
        public virtual string Project { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Project ProjectObject { get; set; }

        // Only for client
        [NotMapped]
        public bool? Selected { get; set; }

        [NotMapped]
        public bool? Hidden { get; set; }

        [NotMapped]
        public bool? BlockHidden { get; set; }

        #region IEquatable

        public bool Equals(Connection other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   FromConnector == other.FromConnector &&
                   ToConnector == other.ToConnector &&
                   FromAspectObject == other.FromAspectObject &&
                   ToAspectObject == other.ToAspectObject &&
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
            hashCode.Add(FromAspectObject);
            hashCode.Add(ToAspectObject);
            hashCode.Add(MainProject);
            hashCode.Add(Project);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}