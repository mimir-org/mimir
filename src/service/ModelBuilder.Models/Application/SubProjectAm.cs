using Mimirorg.Common.Extensions;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class SubProjectAm : IValidatableObject
{
    [Required]
    public string FromProjectId { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    public ICollection<string> Blocks { get; set; }
    public ICollection<string> Connections { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validateionResults = new List<ValidationResult>();

        if (Blocks is not { Count: > 0 })
        {
            validateionResults.Add(new ValidationResult("Number of blocks must be greater than 0", new List<string> { "blocks" }));
        }

        if (Blocks.HasDuplicateValues())
            validateionResults.Add(new ValidationResult("Duplicate block id's detected", new List<string> { "blocks" }));

        if (Blocks.HasEmptyValues())
            validateionResults.Add(new ValidationResult("Empty block id's detected", new List<string> { "blocks" }));

        if (Connections.HasDuplicateValues())
            validateionResults.Add(new ValidationResult("Duplicate connection id's detected", new List<string> { "Connections" }));

        if (Connections.HasEmptyValues())
            validateionResults.Add(new ValidationResult("Empty block id's detected", new List<string> { "Connections" }));

        return validateionResults;
    }
}