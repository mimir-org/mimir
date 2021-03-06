using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Attributes;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class NodeAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        [Required]
        public Aspect Aspect { get; set; }

        [Required]
        public bool IsRoot { get; set; }

        public string Domain => Id.ResolveDomain();

        [RequiredOne(nameof(ProjectIri))]
        public string ProjectId { get; set; }

        [RequiredOne(nameof(ProjectId))]
        public string ProjectIri { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Version { get; set; }

        public string Label { get; set; }

        public string Rds { get; set; }

        public string SemanticReference { get; set; }

        public string Description { get; set; }

        public decimal PositionX { get; set; }

        public decimal PositionY { get; set; }

        public decimal PositionBlockX { get; set; }

        public decimal PositionBlockY { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public bool IsLocked { get; set; }

        public string IsLockedStatusBy { get; set; }

        public DateTime? IsLockedStatusDate { get; set; }

        public string StatusId { get; set; }

        [RequiredOne(nameof(MasterProjectIri))]
        public string MasterProjectId { get; set; }

        [RequiredOne(nameof(MasterProjectId))]
        public string MasterProjectIri { get; set; }

        public string Symbol { get; set; }

        public Purpose Purpose { get; set; }

        public DateTime? Created { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? Updated { get; set; }

        public string UpdatedBy { get; set; }

        [Required]
        public string LibraryTypeId { get; set; }

        public ICollection<ConnectorAm> Connectors { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }

        public ICollection<SimpleAm> Simples { get; set; }

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(Rds) && !IsRoot)
                yield return new ValidationResult($"{nameof(Rds)} can't be null or empty", new List<string> { nameof(Rds), nameof(IsRoot) });

            if (Aspect == Aspect.None)
                yield return new ValidationResult($"Aspect {nameof(Aspect.None)} is not allowed", new List<string> { nameof(Aspect) });

            if (Aspect == Aspect.NotSet)
                yield return new ValidationResult($"Aspect {nameof(Aspect.NotSet)} is not allowed", new List<string> { nameof(Aspect) });

            if (Connectors != null && Connectors.Any())
            {
                foreach (var connector in Connectors)
                {
                    var result = connector.Validate(validationContext);
                    foreach (var validationResult in result)
                    {
                        yield return validationResult;
                    }
                }
            }

            if (Attributes != null && Attributes.Any())
            {
                foreach (var attribute in Attributes)
                {
                    var result = attribute.Validate(validationContext);
                    foreach (var validationResult in result)
                    {
                        yield return validationResult;
                    }
                }
            }

            if (Simples != null && Simples.Any())
            {
                foreach (var simple in Simples)
                {
                    var result = simple.Validate(validationContext);
                    foreach (var validationResult in result)
                    {
                        yield return validationResult;
                    }
                }
            }
        }

        #endregion Validate
    }
}