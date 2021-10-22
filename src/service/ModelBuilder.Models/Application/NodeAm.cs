using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Attributes;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class NodeAm
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Version { get; set; }

        [Required]
        public string Label { get; set; }

        public string Rds { get; set; }

        public string Contractor { get; set; }

        public string SemanticReference { get; set; }

        public string TagNumber { get; set; }

        public string Description { get; set; }

        public decimal PositionX { get; set; }

        public decimal PositionY { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        public string IsLockedBy { get; set; }

        public decimal PositionBlockX { get; set; }

        public decimal PositionBlockY { get; set; }

        [ValidatePositiveDecimal]
        public decimal? Length { get; set; }

        [ValidatePositiveDecimal]
        public decimal? Width { get; set; }

        [ValidatePositiveDecimal]
        public decimal? Height { get; set; }
        
        [ValidatePositiveDecimal]
        //[ProductAspectRequiredDecimal]
        public decimal? Cost { get; set; }

        [Required]
        public string StatusId { get; set; }

        [Required]
        public string MasterProjectId { get; set; }

        public string Symbol { get; set; }

        public Purpose Purpose { get; set; }

        public DateTime? Created { get; set; }
        
        public string CreatedBy { get; set; }
        
        public DateTime? Updated { get; set; }
        
        public string UpdatedBy { get; set; }

        public ICollection<ConnectorAm> Connectors { get; set; }

        public ICollection<AttributeAm> Attributes { get; set; }
        
        public ICollection<CompositeAm> Composites { get; set; }

        [Required]
        public Aspect Aspect { get; set; }

        [Required]
        public bool IsRoot { get; set; }
    }
}
