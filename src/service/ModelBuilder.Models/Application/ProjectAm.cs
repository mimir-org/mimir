using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Application;

public class ProjectAm : IValidatableObject
{
    
    public Guid Id { get; set; }

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

    public ICollection<BlockAm> Blocks { get; set; }
    public ICollection<ConnectionAm> Connections { get; set; }

    #region Validate

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();
        validations.AddRange(Blocks.Validate(validationContext));
        validations.AddRange(Connections.Validate(validationContext));
        return validations;
    }

    #endregion Validate

    #region Public Methods

    public IEnumerable<ConnectionAm> GetParentlessConnectors()
    {
        return Connections.GetParentlessConnectors(Blocks);
    }

    public IEnumerable<ConnectionAm> GetNotConnectedConnectors()
    {
        return Connections.GetNotConnectedConnectors(Blocks);
    }

    #endregion
}