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
            //If EdgeAm property 'Domain' is null it means that this is a new Edge (not existing in db yet)

            if (string.IsNullOrWhiteSpace(Id))
                yield return new ValidationResult("Id can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(Iri) && !string.IsNullOrWhiteSpace(Domain))
                yield return new ValidationResult("Iri can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ProjectId))
                yield return new ValidationResult("ProjectId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(FromConnectorId))
                yield return new ValidationResult("FromConnectorId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(FromConnectorIri) && !string.IsNullOrWhiteSpace(Domain))
                yield return new ValidationResult("FromConnectorIri can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToConnectorId))
                yield return new ValidationResult("ToConnectorId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToConnectorIri) && !string.IsNullOrWhiteSpace(Domain))
                yield return new ValidationResult("ToConnectorIri can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(FromNodeId))
                yield return new ValidationResult("FromNodeId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToNodeId))
                yield return new ValidationResult("ToNodeId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(ToNodeIri) && !string.IsNullOrWhiteSpace(Domain))
                yield return new ValidationResult("ToNodeIri can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(MasterProjectId))
                yield return new ValidationResult("MasterProjectId can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(MasterProjectIri) && !string.IsNullOrWhiteSpace(Domain))
                yield return new ValidationResult("MasterProjectIri can't be null or empty", new List<string> { GetType().Name });

            if (Transport != null)
                Transport.Validate(validationContext);

            if (Interface != null)
            {
                //TODO: Interface.Validate(validationContext);
            }
        }

        #endregion Validate
    }
}