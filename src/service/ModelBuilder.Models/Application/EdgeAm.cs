using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class EdgeAm : IValidatableObject
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

        [RequiredOne(nameof(FromNodeIri))]
        public string FromNodeId { get; set; }

        [RequiredOne(nameof(FromNodeId))]
        public string FromNodeIri { get; set; }

        [RequiredOne(nameof(ToNodeIri))]
        public string ToNodeId { get; set; }

        [RequiredOne(nameof(ToNodeId))]
        public string ToNodeIri { get; set; }

        [RequiredOne(nameof(MasterProjectIri))]
        public string MasterProjectId { get; set; }

        [RequiredOne(nameof(MasterProjectId))]
        public string MasterProjectIri { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public TransportAm Transport { get; set; }

        public InterfaceAm Interface { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (Transport != null)
            {
                var transportValidationResult = Transport.Validate(validationContext);
                foreach (var result in transportValidationResult)
                {
                    validations.Add(result);
                }
            }

            if (Interface != null)
            {
                var interfaceValidationResult = Interface.Validate(validationContext);
                foreach (var result in interfaceValidationResult)
                {
                    validations.Add(result);
                }
            }

            return validations;
        }
    }
}