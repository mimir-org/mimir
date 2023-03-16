using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mb.Models.Extensions;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Application
{
    public class ProjectUpdateAm : IValidatableObject
    {
        [RequiredOne(nameof(Id))]
        public string Id { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsSubProject { get; set; }

        [Required]
        public string Version { get; set; }

        public string Description { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? Updated { get; set; }
        public string CreatedBy { get; set; }

        public DateTime? Created { get; set; }

        public ICollection<AspectObjectAm> AspectObjects { get; set; } = new List<AspectObjectAm>();
        public ICollection<ConnectionAm> Connections { get; set; } = new List<ConnectionAm>();

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
}