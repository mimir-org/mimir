using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Application
{
    public class ConnectionAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        [RequiredOne(nameof(ProjectIri))]
        public string ProjectId { get; set; }

        [RequiredOne(nameof(ProjectId))]
        public string ProjectIri { get; set; }

        [RequiredOne(nameof(FromConnectorIri))]
        public string FromConnectorId { get; set; }

        [RequiredOne(nameof(FromConnectorId))]
        public string FromConnectorIri { get; set; }

        [RequiredOne(nameof(ToConnectorIri))]
        public string ToConnectorId { get; set; }

        [RequiredOne(nameof(ToConnectorId))]
        public string ToConnectorIri { get; set; }

        [RequiredOne(nameof(FromAspectObjectIri))]
        public string FromAspectObjectId { get; set; }

        [RequiredOne(nameof(FromAspectObjectId))]
        public string FromAspectObjectIri { get; set; }

        [RequiredOne(nameof(ToAspectObjectIri))]
        public string ToAspectObjectId { get; set; }

        [RequiredOne(nameof(ToAspectObjectId))]
        public string ToAspectObjectIri { get; set; }

        [RequiredOne(nameof(MasterProjectIri))]
        public string MasterProjectId { get; set; }

        [RequiredOne(nameof(MasterProjectId))]
        public string MasterProjectIri { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            return validations;
        }
    }
}