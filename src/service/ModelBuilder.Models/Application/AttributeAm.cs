using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;
using Mimirorg.Common.Attributes;

namespace Mb.Models.Application
{
    public class AttributeAm
    {
        [RequiredOne(nameof(Id))]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Value { get; set; }

        // Type
        [RequiredOne(nameof(AttributeType))]
        public string AttributeType { get; set; }

        // Unit
        public string SelectedUnit { get; set; }
        public ICollection<Unit> Units { get; set; }

        public Qualifiers Qualifiers { get; set; }

        // References
        public string ConnectorTerminal { get; set; }

        public string AspectObject { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (string.IsNullOrEmpty(ConnectorTerminal) && string.IsNullOrEmpty(AspectObject))
            {
                validations.Add(new ValidationResult("One of this fields is required", new[]
                {
                    nameof(ConnectorTerminal),
                    nameof(AspectObject)
                }));
            }

            return validations;
        }
    }
}