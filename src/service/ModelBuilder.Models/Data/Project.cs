using System;
using System.Collections.Generic;
using Mb.Models.Abstract;
using Mb.Models.Extensions;
using Mb.Models.Records;
using Mimirorg.Common.Extensions;
using Mimirorg.Common.Models;
using Mimirorg.TypeLibrary.Enums;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Project : IEquatable<Project>, IVersionable<Project>
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
        public virtual ICollection<AspectObject> Nodes { get; set; }
        public virtual ICollection<Connection> Connections { get; set; }

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

        #region IVersionable

        public Validation HasIllegalChanges(Project other)
        {
            if (other == null)
                throw new ArgumentNullException(nameof(other));

            var validation = new Validation();
            return validation;
        }

        public VersionStatus CalculateVersionStatus(Project other, ProjectEditData editData)
        {
            if (other == null)
                throw new ArgumentNullException(nameof(other));

            if (this.HasMajorChanges(editData))
                return VersionStatus.Major;

            if (this.HasMinorChanges(editData, other))
                return VersionStatus.Minor;

            return VersionStatus.NoChange;
        }

        public void UpdateVersion(VersionStatus status)
        {
            Version = status switch
            {
                VersionStatus.Minor => Version.IncrementMinorVersion(),
                VersionStatus.Major => Version.IncrementMajorVersion(),
                _ => Version
            };
        }

        #endregion

    }
}