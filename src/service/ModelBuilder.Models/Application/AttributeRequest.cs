using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class AttributeRequest
{
    [Required]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Value { get; set; }
    [Required]
    public string AttributeType { get; set; }
    public string UnitSelected { get; set; }
    public ICollection<UnitRequest> Units { get; set; }
    public ICollection<QualifierRequest> Qualifiers { get; set; }
    public string Terminal { get; set; }
    public Guid Block { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (string.IsNullOrEmpty(Terminal) && Block == Guid.Empty)
        {
            validations.Add(new ValidationResult("One of this fields is required", new[]
            {
                nameof(Terminal),
                nameof(Block)
            }));
        }

        return validations;
    }
}