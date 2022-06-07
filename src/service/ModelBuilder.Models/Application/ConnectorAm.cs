using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Application
{
    public class ConnectorAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        [ValidIri]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Name { get; set; }

        [EnumDataType(typeof(ConnectorDirection))]
        public ConnectorDirection Type { get; set; }

        public string SemanticReference { get; set; }

        [EnumDataType(typeof(ConnectorVisibility))]
        public ConnectorVisibility ConnectorVisibility { get; set; }

        public string NodeId { get; set; }

        [ValidIri]
        public string NodeIri { get; set; }

        public bool IsRequired { get; set; }

        // Relation
        [EnumDataType(typeof(RelationType))]
        public RelationType RelationType { get; set; }

        // Terminal
        public string Color { get; set; }
        public string TerminalCategory { get; set; }
        public string TerminalTypeId { get; set; }

        [ValidIri]
        public string TerminalTypeIri { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (RelationType == RelationType.NotSet)
            {
                if (string.IsNullOrWhiteSpace(TerminalTypeId) && string.IsNullOrWhiteSpace(TerminalTypeIri))
                    validations.Add(new ValidationResult($"{nameof(TerminalTypeId)} or {nameof(TerminalTypeIri)} is required when object is terminal", new List<string> { nameof(TerminalTypeId), nameof(TerminalTypeIri) }));
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