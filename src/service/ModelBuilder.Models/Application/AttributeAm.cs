using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;
using Mimirorg.Common.Attributes;

namespace Mb.Models.Application
{
    public class AttributeAm
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        [ValidIri]
        public string Iri { get; set; }

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
        public virtual ICollection<Unit> Units { get; set; }

        // Qualifiers
        public string SpecifiedScope { get; set; }
        public string SpecifiedProvenance { get; set; }
        public string RangeSpecifying { get; set; }
        public string RegularitySpecified { get; set; }

        // References
        public string TerminalId { get; set; }

        [ValidIri]
        public string TerminalIri { get; set; }

        public string NodeId { get; set; }

        [ValidIri]
        public string NodeIri { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (string.IsNullOrEmpty(TerminalId) &&
                string.IsNullOrEmpty(TerminalIri) &&
                string.IsNullOrEmpty(NodeId) &&
                string.IsNullOrEmpty(NodeIri)
               )
            {
                validations.Add(new ValidationResult("One of this fields is required", new[]
                {
                    nameof(TerminalId),
                    nameof(TerminalIri),
                    nameof(NodeId),
                    nameof(NodeIri)
                }));
            }

            return validations;
        }
    }
}