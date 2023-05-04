using Mb.Models.Abstract;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mb.Models.Records;
using Mimirorg.Common.Extensions;
using Mimirorg.Common.Models;
using Mimirorg.TypeLibrary.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data;

[Serializable]
public class AspectObjectDm : IEquatable<AspectObjectDm>, IVersionable<AspectObjectDm>
{
    public string Id { get; set; }
    public string Version { get; set; }
    public string Name { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public Aspect Aspect { get; set; }
    public AspectObjectType AspectObjectType { get; set; }
    public string Project { get; set; }
    public string MainProject { get; set; }
    public string LibraryType { get; set; }
    public string PositionTree { get; set; }
    public string PositionBlock { get; set; }
    public string ReferenceType { get; set; }
    public string CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime? Updated { get; set; }
    public string Rds { get; set; }
    public string Symbol { get; set; }
    public string Purpose { get; set; }
    public bool IsLocked { get; set; }
    public string IsLockedStatusBy { get; set; }
    public DateTime? IsLockedStatusDate { get; set; }

    [NotMapped]
    public List<ConnectorDm> Connectors { get; set; } = new();
    [NotMapped]
    public List<AttributeDm> Attributes { get; set; } = new();

    #region IEquatable

    public bool Equals(AspectObjectDm other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id &&
               Rds == other.Rds &&
               Description == other.Description &&
               ReferenceType == other.ReferenceType &&
               Name == other.Name &&
               Label == other.Label &&
               PositionTree == other.PositionTree &&
               PositionBlock == other.PositionBlock &&
               UpdatedBy == other.UpdatedBy &&
               Updated.Equals(other.Updated) &&
               Nullable.Equals(Created, other.Created) &&
               CreatedBy == other.CreatedBy &&
               LibraryType == other.LibraryType &&
               Version == other.Version &&
               Aspect == other.Aspect &&
               AspectObjectType == other.AspectObjectType &&
               MainProject == other.MainProject &&
               Symbol == other.Symbol &&
               Purpose == other.Purpose &&
               Project == other.Project;
    }

    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((AspectObjectDm) obj);
    }

    public override int GetHashCode()
    {
        var hashCode = new HashCode();
        hashCode.Add(Id);
        hashCode.Add(Rds);
        hashCode.Add(Description);
        hashCode.Add(ReferenceType);
        hashCode.Add(Name);
        hashCode.Add(Label);
        hashCode.Add(PositionTree);
        hashCode.Add(PositionBlock);
        hashCode.Add(UpdatedBy);
        hashCode.Add(Updated);
        hashCode.Add(Created);
        hashCode.Add(CreatedBy);
        hashCode.Add(LibraryType);
        hashCode.Add(Version);
        hashCode.Add((int) Aspect);
        hashCode.Add(AspectObjectType);
        hashCode.Add(MainProject);
        hashCode.Add(Symbol);
        hashCode.Add(Purpose);
        hashCode.Add(Project);
        return hashCode.ToHashCode();
    }

    #endregion

    #region IVersionable

    public Validation HasIllegalChanges(AspectObjectDm other)
    {
        if (other == null)
            throw new ArgumentNullException(nameof(other));

        var validation = new Validation();
        return validation;
    }

    public VersionStatus CalculateVersionStatus(AspectObjectDm other, ProjectEditData editData)
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