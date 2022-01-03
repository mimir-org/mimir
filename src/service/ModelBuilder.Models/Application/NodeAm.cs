﻿using System;
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

        [Required]
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
        
        [Required]
        public string MasterProjectIri { get; set; }

        public string Symbol { get; set; }

        public Purpose Purpose { get; set; }

        [Required]
        public DateTime? Created { get; set; }
        
        [Required]
        public string CreatedBy { get; set; }

        [Required]
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
            if (Aspect == Aspect.None)
                yield return new ValidationResult("Aspect 'None' is not allowed", new List<string> { GetType().Name });

            if (Aspect == Aspect.NotSet)
                yield return new ValidationResult($"Aspect {nameof(Aspect.NotSet)} is not allowed", new List<string> { GetType().Name });
        }

        #endregion Validate
    }
}