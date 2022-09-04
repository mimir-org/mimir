using Mb.Models.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;
using Mimirorg.Common.Attributes;

namespace Mb.Models.Application
{
    public class InterfaceAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Version { get; set; }

        [Required]
        public string Rds { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }

        public string Description { get; set; }

        public string StatusId { get; set; }

        public ICollection<TypeReference> TypeReferences { get; set; }

        [Required]
        public string InputTerminalId { get; set; }

        [Required]
        public TerminalAm InputTerminal { get; set; }

        [Required]
        public string OutputTerminalId { get; set; }

        [Required]
        public TerminalAm OutputTerminal { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime? Updated { get; set; }

        public DateTime? Created { get; set; }
        public string CreatedBy { get; set; }

        [Required]
        public string LibraryTypeId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (InputTerminal != null)
            {
                if (InputTerminal.Id != InputTerminalId)
                    validations.Add(new ValidationResult("InputTerminal.Id is different from InputTerminalId.", new List<string> { nameof(InputTerminalId), nameof(InputTerminal) }));
            }

            if (OutputTerminal != null)
            {
                if (OutputTerminal.Id != OutputTerminalId)
                    validations.Add(new ValidationResult("OutputTerminal.Id is different from OutputTerminalId.", new List<string> { nameof(OutputTerminalId), nameof(OutputTerminal) }));
            }

            if (Attributes != null)
            {
                foreach (var attribute in Attributes)
                {
                    var attributeResult = attribute.Validate(validationContext);
                    foreach (var result in attributeResult)
                    {
                        validations.Add(result);
                    }
                }
            }

            return validations;
        }
    }
}