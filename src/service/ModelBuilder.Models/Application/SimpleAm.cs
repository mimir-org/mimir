using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Attributes;

namespace Mb.Models.Application
{
    public class SimpleAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        [Required]
        public string Name { get; set; }
        
        public virtual ICollection<AttributeAm> Attributes { get; set; }

        [RequiredOne(nameof(NodeIri))]
        public virtual string NodeId { get; set; }

        [RequiredOne(nameof(NodeId))]
        public virtual string NodeIri { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Attributes != null && Attributes.Any())
            {
                foreach (var attribute in Attributes)
                {
                    var result = attribute.Validate(validationContext);
                    foreach (var validationResult in result)
                    {
                        yield return validationResult;
                    }
                }
            }
        }
    }
}