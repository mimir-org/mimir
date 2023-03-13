using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Abstract;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mimirorg.Common.Models;
using Mimirorg.TypeLibrary.Enums;
using Newtonsoft.Json;
using TypeScriptBuilder;
using Mimirorg.Common.Extensions;
using Mb.Models.Records;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class AspectObject : IEquatable<AspectObject>, IVersionable<AspectObject>
    {
        #region Properties

        public string Id { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Rds { get; set; }
        public string Description { get; set; }

        [NotMapped]
        public virtual ICollection<TypeReference> TypeReferenceObjects
        {
            get
            {
                if (_typeReferences != null)
                    return _typeReferences;

                return !string.IsNullOrWhiteSpace(TypeReference) ? JsonConvert.DeserializeObject<ICollection<TypeReference>>(TypeReference) : null;
            }

            set => _typeReferences = value;
        }

        [JsonIgnore]
        [TSExclude]
        public string TypeReference { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }

        [Required]
        public string Position { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int Order { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }
        public DateTime? Created { get; set; }
        public string CreatedBy { get; set; }
        public string LibraryTypeId { get; set; }
        public string Version { get; set; }

        public Aspect Aspect { get; set; }

        public AspectObjectType AspectObjectType { get; set; }

        [Required]
        public string MasterProjectId { get; set; }

        [Required]
        public string MasterProjectIri { get; set; }

        public string Symbol { get; set; }
        public string PurposeString { get; set; }

        public virtual ICollection<Connector> Connectors { get; set; }
        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual string ProjectId { get; set; }
        public virtual string ProjectIri { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual Project Project { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Connection> FromConnections { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Connection> ToConnections { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        // Only for client
        [NotMapped]
        public string ParentAspectObjectId { get; set; }

        [NotMapped]
        public bool? Selected { get; set; }

        [NotMapped]
        public bool? BlockSelected { get; set; }

        [NotMapped]
        public bool? Hidden { get; set; }

        [NotMapped]
        public bool? BlockHidden { get; set; }

        [NotMapped]
        public bool? IsOffPageTarget { get; set; }

        [NotMapped]
        public bool? IsOffPageRequired { get; set; }

        #endregion Properties

        #region IEquatable

        public bool Equals(AspectObject other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Rds == other.Rds &&
                   Description == other.Description &&
                   TypeReference == other.TypeReference &&
                   Name == other.Name &&
                   Label == other.Label &&
                   Position == other.Position &&
                   Level == other.Level &&
                   Order == other.Order &&
                   UpdatedBy == other.UpdatedBy &&
                   Updated.Equals(other.Updated) &&
                   Nullable.Equals(Created, other.Created) &&
                   CreatedBy == other.CreatedBy &&
                   LibraryTypeId == other.LibraryTypeId &&
                   Version == other.Version &&
                   Aspect == other.Aspect &&
                   AspectObjectType == other.AspectObjectType &&
                   MasterProjectId == other.MasterProjectId &&
                   MasterProjectIri == other.MasterProjectIri &&
                   Symbol == other.Symbol &&
                   PurposeString == other.PurposeString &&
                   ProjectId == other.ProjectId &&
                   ProjectIri == other.ProjectIri &&
                   Width == other.Width &&
                   Height == other.Height;

        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((AspectObject) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(Rds);
            hashCode.Add(Description);
            hashCode.Add(TypeReference);
            hashCode.Add(Name);
            hashCode.Add(Label);
            hashCode.Add(Position);
            hashCode.Add(Level);
            hashCode.Add(Order);
            hashCode.Add(UpdatedBy);
            hashCode.Add(Updated);
            hashCode.Add(Created);
            hashCode.Add(CreatedBy);
            hashCode.Add(LibraryTypeId);
            hashCode.Add(Version);
            hashCode.Add((int) Aspect);
            hashCode.Add(AspectObjectType);
            hashCode.Add(MasterProjectId);
            hashCode.Add(MasterProjectIri);
            hashCode.Add(Symbol);
            hashCode.Add(PurposeString);
            hashCode.Add(ProjectId);
            hashCode.Add(ProjectIri);
            hashCode.Add(Width);
            hashCode.Add(Height);
            return hashCode.ToHashCode();
        }

        #endregion

        #region IVersionable

        public Validation HasIllegalChanges(AspectObject other)
        {
            if (other == null)
                throw new ArgumentNullException(nameof(other));

            var validation = new Validation();
            return validation;
        }

        public VersionStatus CalculateVersionStatus(AspectObject other, ProjectEditData editData)
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

        #region Private members

        [TSExclude]
        private ICollection<TypeReference> _typeReferences;

        #endregion Private members
    }
}