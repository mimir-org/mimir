using Mimirorg.Common.Extensions;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class SubProjectAm : IValidatableObject
    {
        [Required]
        public string FromProjectId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public ICollection<string> Nodes { get; set; }
        public ICollection<string> Edges { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validateionResults = new List<ValidationResult>();

            if (Nodes == null || Nodes.Count <= 0)
            {
                validateionResults.Add(new ValidationResult("Number of nodes must be greater than 0", new List<string> { "Nodes" }));
            }

            if(Nodes.HasDuplicateValues())
                validateionResults.Add(new ValidationResult("Duplicate node id's detected", new List<string> { "Nodes" }));

            if (Nodes.HasEmptyValues())
                validateionResults.Add(new ValidationResult("Empty node id's detected", new List<string> { "Nodes" }));

            if (Edges.HasDuplicateValues())
                validateionResults.Add(new ValidationResult("Duplicate edge id's detected", new List<string> { "Edges" }));

            if (Edges.HasEmptyValues())
                validateionResults.Add(new ValidationResult("Empty node id's detected", new List<string> { "Edges" }));

            return validateionResults;
        }
    }
}