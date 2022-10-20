using Mimirorg.Common.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;

namespace Mb.Models.Application
{
    public class TerminalAm : ConnectorAm, IValidatableObject
    {
        [Required]
        public string Color { get; set; }
        public string TerminalCategory { get; set; }
        public bool IsProxy { get; set; }
        public string ProxyParent { get; set; }
        public string ProxySibling { get; set; }

        [RequiredOne(nameof(TerminalTypeIri))]
        public string TerminalTypeId { get; set; }

        [ValidIri]
        [RequiredOne(nameof(TerminalTypeId))]
        public string TerminalTypeIri { get; set; }

        public ICollection<TypeReference> TypeReferences { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (IsProxy)
            {
                if (string.IsNullOrWhiteSpace(ProxyParent))
                    validations.Add(new ValidationResult($"{nameof(ProxyParent)} is required when {IsProxy} is true.", new List<string> { nameof(ProxyParent) }));
            }

            if (Attributes != null)
            {
                foreach (var attributeAm in Attributes)
                {
                    var validationResults = attributeAm.Validate(validationContext);
                    foreach (var validationResult in validationResults)
                    {
                        validations.Add(validationResult);
                    }
                }
            }

            return validations;
        }
    }
}