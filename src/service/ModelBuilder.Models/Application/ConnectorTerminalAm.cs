using Mimirorg.Common.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;

namespace Mb.Models.Application
{
    public class ConnectorTerminalAm : ConnectorAm, IValidatableObject
    {
        [Required]
        public string Color { get; set; }

        [RequiredOne(nameof(TerminalType))]
        public string TerminalType { get; set; }

        public string TerminalParentType { get; set; }

        public ICollection<TypeReference> TypeReferences { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

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