using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Application;

public class AspectObjectAm : IValidatableObject
{
    [Required]
    public string Id { get; set; }
    [Required]
    public string Version { get; set; }
    [Required]
    public string Name { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    [Required]
    public Aspect Aspect { get; set; }
    [Required]
    public AspectObjectType AspectObjectType { get; set; }
    [Required]
    public string Project { get; set; }
    [Required]
    public string MainProject { get; set; }
    [Required]
    public string LibraryType { get; set; }
    [Required]
    public AspectObjectPositionAm Position { get; set; }
    public string ReferenceType { get; set; }
    public string Rds { get; set; }
    public string Symbol { get; set; }
    public string Purpose { get; set; }
    public bool IsLocked { get; set; }
    public string IsLockedStatusBy { get; set; }
    public DateTime? IsLockedStatusDate { get; set; }
    public string Domain => Id.ResolveDomain();

    public ICollection<ConnectorAm> Connectors { get; set; }
    public ICollection<AttributeAm> Attributes { get; set; }

    #region Validate

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (string.IsNullOrWhiteSpace(Rds) && AspectObjectType == AspectObjectType.Aspect)
            validations.Add(new ValidationResult($"{nameof(Rds)} can't be null or empty", new List<string> { nameof(Rds), nameof(AspectObjectType) }));

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

public class AspectObjectPositionAm
{
    [Required]
    public int ThreePosX { get; set; }
    [Required]
    public int ThreePosY { get; set; }
    [Required]
    public int BlockPosX { get; set; }
    [Required]
    public int BlockPosY { get; set; }

}