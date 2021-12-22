using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Attributes;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class NodeAm : IValidatableObject
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();

        [Required]
        public string ProjectId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Version { get; set; }

        [Required]
        public string Label { get; set; }

        public string Rds { get; set; }

        public string SemanticReference { get; set; }

        public string Description { get; set; }

        public decimal PositionX { get; set; }

        public decimal PositionY { get; set; }

        public bool IsLocked { get; set; }

        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        public decimal PositionBlockX { get; set; }

        public decimal PositionBlockY { get; set; }

        [ValidatePositiveDecimal]
        public decimal? Length { get; set; }

        [ValidatePositiveDecimal]
        public decimal? Width { get; set; }

        [ValidatePositiveDecimal]
        public decimal? Height { get; set; }
        
        [ValidatePositiveDecimal]
        public decimal? Cost { get; set; }

        [Required]
        public string StatusId { get; set; }

        [Required]
        public string MasterProjectId { get; set; }
        
        public string MasterProjectIri { get; set; }

        public string Symbol { get; set; }

        public Purpose Purpose { get; set; }

        public DateTime? Created { get; set; }
        
        public string CreatedBy { get; set; }

        public string LibraryTypeId { get; set; }

        public DateTime? Updated { get; set; }
        
        public string UpdatedBy { get; set; }

        public ICollection<ConnectorAm> Connectors { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }
        
        public ICollection<SimpleAm> Simples { get; set; }

        [Required]
        public Aspect Aspect { get; set; }

        [Required]
        public bool IsRoot { get; set; }

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //If NodeAm property 'Domain' is null it means that this is a new Node (not existing in db yet)

            if (string.IsNullOrWhiteSpace(Id))
                yield return new ValidationResult("Id can't be null or empty", new List<string> { GetType().Name });

            //TODO: Need to fix that the client are mapping Iri value before adding the two code lines below
            //if (string.IsNullOrWhiteSpace(Iri) && !string.IsNullOrWhiteSpace(Domain))
            //    yield return new ValidationResult("Iri can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(Name))
                yield return new ValidationResult("Name can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(PositionBlockX.ToString()))
                yield return new ValidationResult("PositionBlockX can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(PositionX.ToString()))
                yield return new ValidationResult("PositionX can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(PositionBlockY.ToString()))
                yield return new ValidationResult("PositionBlockY can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(PositionY.ToString()))
                yield return new ValidationResult("PositionY can't be null or empty", new List<string> { GetType().Name });

            if (Created == null || string.IsNullOrWhiteSpace(Created.ToString()))
                yield return new ValidationResult("Created (DateTime) can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(CreatedBy))
                yield return new ValidationResult("CreatedBy can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(LibraryTypeId))
                yield return new ValidationResult("LibraryTypeId can't be null or empty", new List<string> { GetType().Name });

            if (Aspect == Aspect.None)
                yield return new ValidationResult("Aspect 'None' is not allowed", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(MasterProjectId))
                yield return new ValidationResult("MasterProjectId is can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrWhiteSpace(MasterProjectIri) && !string.IsNullOrWhiteSpace(Domain))
                yield return new ValidationResult("MasterProjectIri can't be null or empty", new List<string> { GetType().Name });
        }

        #endregion Validate
    }
}