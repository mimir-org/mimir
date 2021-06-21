﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class NodeAm
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[1-9])\d+(\.[0-9]?)?$", ErrorMessage = "The version format must be at x.y")]
        public string Version { get; set; }

        [Required]
        public string Label { get; set; }

        [Required]
        public string Rds { get; set; }

        public string Contractor { get; set; }

        public string SemanticReference { get; set; }

        public string TagNumber { get; set; }

        public string Description { get; set; }

        public decimal PositionX { get; set; }

        public decimal PositionY { get; set; }

        public decimal PositionBlockX { get; set; }

        public decimal PositionBlockY { get; set; }

        [Required]
        public string StatusId { get; set; }

        [Required]
        public string MasterProjectId { get; set; }

        public IList<ConnectorAm> Connectors { get; set; }

        public IList<AttributeAm> Attributes { get; set; }

        [Required]
        public Aspect Aspect { get; set; }

        [Required]
        public bool IsRoot { get; set; }
    }
}