using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Extensions;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class Interface : IEquatable<Interface>
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Version { get; set; }
        public string Rds { get; set; }
        public string Kind => nameof(Interface);

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }
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

        public ICollection<Attribute> Attributes { get; set; }
        public string InputTerminalId { get; set; }
        public virtual Terminal InputTerminal { get; set; }
        public string OutputTerminalId { get; set; }
        public virtual Terminal OutputTerminal { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Created { get; set; }
        public string CreatedBy { get; set; }
        public string LibraryTypeId { get; set; }

        [JsonIgnore]
        [TSExclude]
        public ICollection<Edge> Edges { get; set; }

        public void IncrementMinorVersion()
        {
            Version = Version.IncrementMinorVersion();
        }

        public void IncrementMajorVersion()
        {
            Version = Version.IncrementMajorVersion();
        }

        #region IEquatable

        public bool Equals(Interface other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   Version == other.Version &&
                   Rds == other.Rds &&
                   Name == other.Name &&
                   Label == other.Label &&
                   Description == other.Description &&
                   TypeReferenceString == other.TypeReferenceString &&
                   InputTerminalId == other.InputTerminalId &&
                   OutputTerminalId == other.OutputTerminalId &&
                   UpdatedBy == other.UpdatedBy &&
                   Nullable.Equals(Updated, other.Updated) &&
                   Nullable.Equals(Created, other.Created) &&
                   CreatedBy == other.CreatedBy &&
                   LibraryTypeId == other.LibraryTypeId;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Interface) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(Iri);
            hashCode.Add(Version);
            hashCode.Add(Rds);
            hashCode.Add(Name);
            hashCode.Add(Label);
            hashCode.Add(Description);
            hashCode.Add(TypeReferenceString);
            hashCode.Add(InputTerminalId);
            hashCode.Add(OutputTerminalId);
            hashCode.Add(UpdatedBy);
            hashCode.Add(Updated);
            hashCode.Add(Created);
            hashCode.Add(CreatedBy);
            hashCode.Add(LibraryTypeId);
            return hashCode.ToHashCode();
        }

        #endregion IEquatable

        #region Private members

        [TSExclude]
        private ICollection<TypeReference> _typeReferences;

        #endregion Private members
    }
}