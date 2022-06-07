using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mb.Models.Extensions;

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
        public ICollection<EdgeAm> Edges { get; set; } = new List<EdgeAm>();

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();
            validations.AddRange(Nodes.Validate(validationContext));
            validations.AddRange(Edges.Validate(validationContext));
            return validations;
        }

        #endregion Validate

        #region Public Methods

        public IEnumerable<EdgeAm> GetParentlessEdges()
        {
            return Edges.GetParentlessEdges(Nodes);
        }

        public IEnumerable<EdgeAm> GetNotConnectedEdges()
        {
            return Edges.GetNotConnectedEdges(Nodes);
        }

        #endregion
    }
}