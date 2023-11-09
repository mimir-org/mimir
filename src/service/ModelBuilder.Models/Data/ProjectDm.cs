using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Abstract;
using Mb.Models.Extensions;
using Mb.Models.Records;
using Mimirorg.Common.Extensions;
using Mimirorg.Common.Models;
using Mimirorg.TypeLibrary.Enums;

// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data;

[Serializable]
public class ProjectDm : IEquatable<ProjectDm>, IVersionable<ProjectDm>
{
    #region Properties

    public Guid Id { get; set; }
    public string Version { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool SubProject { get; set; }
    public string CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime? Updated { get; set; }
    public string Domain { get; set; }
    public List<BlockDm> Blocks { get; set; } = new();
    public List<ConnectionDm> Connections { get; set; } = new();

    #endregion

    #region IEquatable

    public bool Equals(ProjectDm other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id &&
               SubProject == other.SubProject &&
               Version == other.Version &&
               Name == other.Name &&
               Description == other.Description &&
               UpdatedBy == other.UpdatedBy &&
               Updated.Equals(other.Updated) &&
               CreatedBy == other.CreatedBy &&
               Created.Equals(other.Created);
    }

    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((ProjectDm) obj);
    }

    public override int GetHashCode()
    {
        var hashCode = new HashCode();
        hashCode.Add(Id);
        hashCode.Add(SubProject);
        hashCode.Add(Version);
        hashCode.Add(Name);
        hashCode.Add(Description);
        hashCode.Add(UpdatedBy);
        hashCode.Add(Updated);
        hashCode.Add(CreatedBy);
        hashCode.Add(Created);
        return hashCode.ToHashCode();
    }

    #endregion

    #region IVersionable

    public Validation HasIllegalChanges(ProjectDm other)
    {
        if (other == null)
            throw new ArgumentNullException(nameof(other));

        var validation = new Validation();
        return validation;
    }

    public VersionStatus CalculateVersionStatus(ProjectDm other, ProjectEditData editData)
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