using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class EdgeAm : IValidatableObject
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string ProjectId { get; set; }
        public string FromConnectorId { get; set; }
        public string FromConnectorIri { get; set; }
        public string ToConnectorId { get; set; }
        public string ToConnectorIri { get; set; }
        public string FromNodeId { get; set; }
        public string FromNodeIri { get; set; }
        public string ToNodeId { get; set; }
        public string ToNodeIri { get; set; }
        public string MasterProjectId { get; set; }
        public string MasterProjectIri { get; set; }
        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }
        public TransportAm Transport { get; set; }
        public InterfaceAm Interface { get; set; }

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(Id))
                yield return new ValidationResult("Id is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(Iri))
                yield return new ValidationResult("Iri is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ProjectId))
                yield return new ValidationResult("ProjectId is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(FromConnectorId))
                yield return new ValidationResult("FromConnectorId is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(FromConnectorIri))
                yield return new ValidationResult("FromConnectorIri is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToConnectorId))
                yield return new ValidationResult("ToConnectorId is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToConnectorIri))
                yield return new ValidationResult("ToConnectorIri is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(FromNodeId))
                yield return new ValidationResult("FromNodeId is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToNodeId))
                yield return new ValidationResult("ToNodeId is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToNodeIri))
                yield return new ValidationResult("ToNodeIri is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(MasterProjectId))
                yield return new ValidationResult("MasterProjectId is required", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(MasterProjectIri))
                yield return new ValidationResult("MasterProjectIri is required", new List<string> { GetType().Name });

            if (Transport != null)
            {
                //TODO: Validate TransportAm
            }

            if (Interface != null)
            {
                //TODO: Validate InterfaceAm
            }
        }

        #endregion Validate
    }
}