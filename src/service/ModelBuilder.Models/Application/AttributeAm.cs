using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class AttributeAm
{
    [Required]
    public string Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Value { get; set; }
    [Required]
    public string AttributeType { get; set; }
    public string UnitSelected { get; set; }
    public ICollection<UnitAm> Units { get; set; }
    public ICollection<QualifierAm> Qualifiers { get; set; }
    public string ConnectorTerminal { get; set; }
    public string Block { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (string.IsNullOrEmpty(ConnectorTerminal) && string.IsNullOrEmpty(Block))
        {
            validations.Add(new ValidationResult("One of this fields is required", new[]
            {
                nameof(ConnectorTerminal),
                nameof(Block)
            }));
        }

        return validations;
    }
}