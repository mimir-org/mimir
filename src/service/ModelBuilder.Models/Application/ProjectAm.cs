using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Application;

public class ProjectAm : IValidatableObject
{
    [Required]
    public string Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public bool SubProject { get; set; }

    public string Description { get; set; }

    public ICollection<AspectObjectAm> AspectObjects { get; set; }
    public ICollection<ConnectionAm> Connections { get; set; }

    #region Validate

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();
        validations.AddRange(AspectObjects.Validate(validationContext));
        validations.AddRange(Connections.Validate(validationContext));
        return validations;
    }

    #endregion Validate

    #region Public Methods

    public IEnumerable<ConnectionAm> GetParentlessConnectors()
    {
        return Connections.GetParentlessConnectors(AspectObjects);
    }

    public IEnumerable<ConnectionAm> GetNotConnectedConnectors()
    {
        return Connections.GetNotConnectedConnectors(AspectObjects);
    }

    #endregion
}