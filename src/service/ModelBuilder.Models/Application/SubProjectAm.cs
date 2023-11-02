using Mimirorg.Common.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class SubProjectAm : IValidatableObject
{
    [Required]
    public Guid FromProjectId { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    public ICollection<string> Blocks { get; set; }
    public ICollection<string> Connections { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validationResults = new List<ValidationResult>();

        if (Blocks is not { Count: > 0 })
        {
            validationResults.Add(new ValidationResult("Number of blocks must be greater than 0", new List<string> { "Blocks" }));
        }

        if (Blocks.HasDuplicateValues())
            validationResults.Add(new ValidationResult("Duplicate block id's detected", new List<string> { "Blocks" }));

        if (Blocks.HasEmptyValues())
            validationResults.Add(new ValidationResult("Empty block id's detected", new List<string> { "Blocks" }));

        if (Connections.HasDuplicateValues())
            validationResults.Add(new ValidationResult("Duplicate connection id's detected", new List<string> { "Connections" }));

        if (Connections.HasEmptyValues())
            validationResults.Add(new ValidationResult("Empty block id's detected", new List<string> { "Connections" }));

        return validationResults;
    }
}