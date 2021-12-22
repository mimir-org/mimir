using Mb.Models.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class TransportAm : IValidatableObject
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Version { get; set; }
        public string Rds { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }
        public string Description { get; set; }

        //[Required]
        public string StatusId { get; set; }
        
        public string SemanticReference { get; set; }
        public string InputTerminalId { get; set; }
        public TerminalAm InputTerminal { get; set; }
        public string OutputTerminalId { get; set; }
        public TerminalAm OutputTerminal { get; set; }
        public ICollection<AttributeAm> Attributes { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Created { get; set; }
        public string CreatedBy { get; set; }
        public string LibraryTypeId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //If TransportAm property 'Domain' is null it means that this is a new Transport (not existing in db yet)

            if (string.IsNullOrWhiteSpace(Id))
                yield return new ValidationResult("Id can't be null or empty", new List<string> { GetType().Name });

            //TODO: Need to fix that the client are mapping Iri value before adding the two code lines below
            //if (string.IsNullOrWhiteSpace(Iri) && !string.IsNullOrWhiteSpace(Domain))
            //    yield return new ValidationResult("Iri can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(Name))
                yield return new ValidationResult("Name can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(StatusId))
                yield return new ValidationResult("StatusId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(InputTerminalId))
                yield return new ValidationResult("InputTerminalId can't be null or empty", new List<string> { GetType().Name });

            if (InputTerminal == null)
                yield return new ValidationResult("InputTerminal can't be null", new List<string> { GetType().Name });

            if (InputTerminal != null)
            {
                //TODO: InputTerminal.Validate(validationContext);
            }

            if (string.IsNullOrWhiteSpace(OutputTerminalId))
                yield return new ValidationResult("OutputTerminalId can't be null or empty", new List<string> { GetType().Name });

            if (OutputTerminal == null)
                yield return new ValidationResult("OutputTerminal can't be null", new List<string> { GetType().Name });

            if (OutputTerminal != null)
            {
                //TODO: OutputTerminal.Validate(validationContext);
            }

            if (Attributes == null)
                yield return new ValidationResult("Attributes can't be null", new List<string> { GetType().Name });

            if (Attributes != null)
            {
                foreach(var attr in Attributes)
                {
                    //TODO: yield return attr.Validate(validationContext);
                }
            }

            if (Created == null || string.IsNullOrWhiteSpace(Created.ToString()))
                yield return new ValidationResult("Created (DateTime) can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(CreatedBy))
                yield return new ValidationResult("CreatedBy can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(LibraryTypeId))
                yield return new ValidationResult("LibraryTypeId can't be null or empty", new List<string> { GetType().Name });
        }
    }
}
