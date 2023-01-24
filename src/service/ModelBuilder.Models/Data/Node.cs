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
    public class Node : IEquatable<Node>, IVersionable<Node>
    {
        #region Properties

        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Kind => nameof(Node);
        public string Rds { get; set; }
        public string Description { get; set; }

        [NotMapped]
        public virtual ICollection<TypeReference> TypeReferences
        {
            get
            {
                if (_typeReferences != null)
                    return _typeReferences;

                return !string.IsNullOrWhiteSpace(TypeReferenceString) ? JsonConvert.DeserializeObject<ICollection<TypeReference>>(TypeReferenceString) : null;
            }

            set => _typeReferences = value;
        }

        [JsonIgnore]
        [TSExclude]
        public string TypeReferenceString { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }

        [Required]
        public decimal PositionX { get; set; }

        [Required]
        public decimal PositionY { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        [Required]
        public decimal PositionBlockX { get; set; }

        [Required]
        public decimal PositionBlockY { get; set; }

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

        public NodeType NodeType { get; set; }

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
        public virtual ICollection<Edge> FromEdges { get; set; }

        [JsonIgnore]
        [TSExclude]
        public virtual ICollection<Edge> ToEdges { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        #endregion Properties

        #region Client properties only

        [NotMapped]
        public bool Hidden { get; set; } = false;

        [NotMapped]
        public bool BlockHidden { get; set; } = false;

        [NotMapped]
        public bool Selected { get; set; } = false;

        [NotMapped]
        public bool BlockSelected { get; set; } = false;

        #endregion

        #region IEquatable

        public bool Equals(Node other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   Rds == other.Rds &&
                   Description == other.Description &&
                   TypeReferenceString == other.TypeReferenceString &&
                   Name == other.Name &&
                   Label == other.Label &&
                   PositionX == other.PositionX &&
                   PositionY == other.PositionY &&
                   PositionBlockX == other.PositionBlockX &&
                   PositionBlockY == other.PositionBlockY &&
                   Level == other.Level &&
                   Order == other.Order &&
                   UpdatedBy == other.UpdatedBy &&
                   Updated.Equals(other.Updated) &&
                   Nullable.Equals(Created, other.Created) &&
                   CreatedBy == other.CreatedBy &&
                   LibraryTypeId == other.LibraryTypeId &&
                   Version == other.Version &&
                   Aspect == other.Aspect &&
                   NodeType == other.NodeType &&
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
            return obj.GetType() == GetType() && Equals((Node) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(Iri);
            hashCode.Add(Rds);
            hashCode.Add(Description);
            hashCode.Add(TypeReferenceString);
            hashCode.Add(Name);
            hashCode.Add(Label);
            hashCode.Add(PositionX);
            hashCode.Add(PositionY);
            hashCode.Add(PositionBlockX);
            hashCode.Add(PositionBlockY);
            hashCode.Add(Level);
            hashCode.Add(Order);
            hashCode.Add(UpdatedBy);
            hashCode.Add(Updated);
            hashCode.Add(Created);
            hashCode.Add(CreatedBy);
            hashCode.Add(LibraryTypeId);
            hashCode.Add(Version);
            hashCode.Add((int) Aspect);
            hashCode.Add(NodeType);
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

        public Validation HasIllegalChanges(Node other)
        {
            if (other == null)
                throw new ArgumentNullException(nameof(other));

            var validation = new Validation();
            return validation;
        }

        public VersionStatus CalculateVersionStatus(Node other, ProjectEditData editData)
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