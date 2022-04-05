using System;
using System.Collections.Generic;
using Mb.Models.Extensions;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Project : IEquatable<Project>
    {
        #region Properties

        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public bool IsSubProject { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public virtual ICollection<Node> Nodes { get; set; }
        public virtual ICollection<Edge> Edges { get; set; }

        #endregion

        #region Public methods

        public void IncrementMajorVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementMajorVersion();
        }

        public void IncrementMinorVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementMinorVersion();
        }

        public void IncrementCommitVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementCommitVersion();
        }

        #endregion

        #region IEquatable

        public bool Equals(Project other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   IsSubProject == other.IsSubProject &&
                   Version == other.Version &&
                   Name == other.Name &&
                   Description == other.Description &&
                   ProjectOwner == other.ProjectOwner &&
                   UpdatedBy == other.UpdatedBy &&
                   Updated.Equals(other.Updated);
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Project) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(Iri);
            hashCode.Add(IsSubProject);
            hashCode.Add(Version);
            hashCode.Add(Name);
            hashCode.Add(Description);
            hashCode.Add(ProjectOwner);
            hashCode.Add(UpdatedBy);
            hashCode.Add(Updated);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}