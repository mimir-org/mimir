using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mb.Models.Extensions;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Application
{
    public class ProjectAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsSubProject { get; set; }

        [Required]
        public string Version { get; set; }

        public string Description { get; set; }

        [Required]
        public string ProjectOwner { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? Updated { get; set; }

        public ICollection<NodeAm> Nodes { get; set; } = new List<NodeAm>();
        public ICollection<ConnectionAm> Connections { get; set; } = new List<ConnectionAm>();

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();
            validations.AddRange(Nodes.Validate(validationContext));
            validations.AddRange(Connections.Validate(validationContext));
            return validations;
        }

        #endregion Validate

        #region Public Methods

        public IEnumerable<ConnectionAm> GetParentlessConnectors()
        {
            return Connections.GetParentlessConnectors(Nodes);
        }

        public IEnumerable<ConnectionAm> GetNotConnectedConnectors()
        {
            return Connections.GetNotConnectedConnectors(Nodes);
        }

        #endregion
    }
}