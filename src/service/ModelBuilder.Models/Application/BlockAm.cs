using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class BlockAm : IValidatableObject
{

    public Guid? Id { get; set; }
    [Required]
    public string Version { get; set; }
    [Required]
    public string Name { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    [Required]
    public Aspect Aspect { get; set; }
    [Required]
    public BlockType BlockType { get; set; }

    public Guid? Project { get; set; }

    public Guid? MainProject { get; set; }
    public string LibraryType { get; set; }
    [Required]
    public PositionAm PositionTree { get; set; }
    public PositionAm PositionBlock { get; set; }
    public string ReferenceType { get; set; }
    public string CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime? Updated { get; set; }
    public string Rds { get; set; }
    public string Symbol { get; set; }
    public string Purpose { get; set; }
    public bool IsLocked { get; set; }
    public string IsLockedStatusBy { get; set; }
    public DateTime? IsLockedStatusDate { get; set; }

    public ICollection<ConnectorAm> Connectors { get; set; }
    public ICollection<AttributeAm> Attributes { get; set; }

    #region Validate

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (string.IsNullOrWhiteSpace(Rds) && BlockType == BlockType.Aspect)
            validations.Add(new ValidationResult($"{nameof(Rds)} can't be null or empty", new List<string> { nameof(Rds), nameof(BlockType) }));

        if (Aspect == Aspect.None)
            validations.Add(new ValidationResult($"Aspect {nameof(Aspect.None)} is not allowed", new List<string> { nameof(Aspect) }));

        if (Aspect == Aspect.NotSet)
            validations.Add(new ValidationResult($"Aspect {nameof(Aspect.NotSet)} is not allowed", new List<string> { nameof(Aspect) }));

        if (Connectors != null)
        {
            foreach (var connector in Connectors)
            {
                if (!(connector is ConnectorTerminalAm t))
                    continue;

                var result = t.Validate(validationContext);
                foreach (var validationResult in result)
                {
                    validations.Add(validationResult);
                }
            }
        }

        if (Attributes != null)
        {
            foreach (var attribute in Attributes)
            {
                var result = attribute.Validate(validationContext);
                foreach (var validationResult in result)
                {
                    validations.Add(validationResult);
                }
            }
        }

        return validations;
    }

    #endregion Validate
}