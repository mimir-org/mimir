using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Application;

public class ProjectAm : IValidatableObject
{
    [Required]
    public string Id { get; set; }

    [Required]
    public string Version { get; set; }

    [Required]
    public string Name { get; set; }

    public string Description { get; set; }

    [Required]
    public bool SubProject { get; set; }

    public string CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime? Updated { get; set; }

    public ICollection<BlockAm> blocks { get; set; }
    public ICollection<ConnectionAm> Connections { get; set; }

    #region Validate

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();
        validations.AddRange(blocks.Validate(validationContext));
        validations.AddRange(Connections.Validate(validationContext));
        return validations;
    }

    #endregion Validate

    #region Public Methods

    public IEnumerable<ConnectionAm> GetParentlessConnectors()
    {
        return Connections.GetParentlessConnectors(blocks);
    }

    public IEnumerable<ConnectionAm> GetNotConnectedConnectors()
    {
        return Connections.GetNotConnectedConnectors(blocks);
    }

    #endregion
}