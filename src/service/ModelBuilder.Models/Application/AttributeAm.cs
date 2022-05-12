using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Attributes;
using Mb.Models.Enums;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class AttributeAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        [ValidIri]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Entity { get; set; }
        public string Value { get; set; }

        // Type
        [RequiredOne(nameof(AttributeTypeIri))]
        public string AttributeTypeId { get; set; }

        [RequiredOne(nameof(AttributeTypeId))]
        [ValidIri]
        public string AttributeTypeIri { get; set; }

        // Unit
        public string SelectedUnitId { get; set; }
        public virtual ICollection<UnitAm> Units { get; set; }

        // Qualifiers
        // TODO: Remove foreign keys
        [Required]
        public string Qualifier { get; set; }

        [Required]
        public string Source { get; set; }

        [Required]
        public string Condition { get; set; }

        [Required]
        public string Format { get; set; }

        // References
        public string TerminalId { get; set; }

        [ValidIri]
        public string TerminalIri { get; set; }

        public string NodeId { get; set; }

        [ValidIri]
        public string NodeIri { get; set; }

        public string TransportId { get; set; }

        [ValidIri]
        public string TransportIri { get; set; }

        public string InterfaceId { get; set; }

        [ValidIri]
        public string InterfaceIri { get; set; }

        public string SimpleId { get; set; }

        [ValidIri]
        public string SimpleIri { get; set; }

        public ICollection<string> SelectValues { get; set; }

        [EnumDataType(typeof(SelectType))]
        public SelectType SelectType { get; set; }

        [EnumDataType(typeof(Discipline))]
        public Discipline Discipline { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(TerminalId) &&
                string.IsNullOrEmpty(TerminalIri) &&
                string.IsNullOrEmpty(NodeId) &&
                string.IsNullOrEmpty(NodeIri) &&
                string.IsNullOrEmpty(TransportId) &&
                string.IsNullOrEmpty(TransportIri) &&
                string.IsNullOrEmpty(InterfaceId) &&
                string.IsNullOrEmpty(InterfaceIri) &&
                string.IsNullOrEmpty(SimpleId) &&
                string.IsNullOrEmpty(SimpleIri)
               )
            {
                yield return new ValidationResult("One of this fields is required", new[]
                {
                    nameof(TerminalId),
                    nameof(TerminalIri),
                    nameof(NodeId),
                    nameof(NodeIri),
                    nameof(TransportId),
                    nameof(TransportIri),
                    nameof(InterfaceId),
                    nameof(InterfaceIri),
                    nameof(SimpleId),
                    nameof(SimpleIri)
                });
            }
        }
    }
}