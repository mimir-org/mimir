using Mb.Models.Records;
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.Common.Models;

namespace Mb.Models.Abstract;

// ReSharper disable once IdentifierTypo
public interface IVersionable<in T>
{
    string Version { get; set; }
    Validation HasIllegalChanges(T other);
    VersionStatus CalculateVersionStatus(T other, ProjectEditData editData);
    void UpdateVersion(VersionStatus status);
}