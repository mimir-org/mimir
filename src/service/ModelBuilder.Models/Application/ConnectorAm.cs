using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Attributes;
using Mb.Models.Enums;
using Mb.Models.Extensions;

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

        [EnumDataType(typeof(ConnectorType))]
        public ConnectorType Type { get; set; }

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
        public string TerminalCategoryId { get; set; }
        public string TerminalTypeId { get; set; }

        [ValidIri]
        public string TerminalTypeIri { get; set; }

        public virtual ICollection<AttributeAm> Attributes { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (RelationType == RelationType.NotSet)
            {
                if (string.IsNullOrWhiteSpace(TerminalTypeId) && string.IsNullOrWhiteSpace(TerminalTypeIri))
                    yield return new ValidationResult($"{nameof(TerminalTypeId)} or {nameof(TerminalTypeIri)} is required when object is terminal", new List<string> { nameof(TerminalTypeId), nameof(TerminalTypeIri) });
            }

            if (Attributes != null)
            {
                foreach (var attributeAm in Attributes)
                {
                    var validationResults = attributeAm.Validate(validationContext);
                    foreach (var validationResult in validationResults)
                    {
                        yield return validationResult;
                    }
                }
            }
        }
    }
}