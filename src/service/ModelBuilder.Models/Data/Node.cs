using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    [Serializable]
    public class Node
    {
        [Required]
        public string Id { get; set; }

        public string Rds { get; set; }

        public string Contractor { get; set; }

        public string SemanticReference { get; set; }

        public string TagNumber { get; set; }

        public string Description { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }

        [Required]
        public Models.Enums.NodeType Type { get; set; }

        [Required]
        public decimal PositionX { get; set; }

        [Required]
        public decimal PositionY { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        [Required]
        public bool IsSelected { get; set; }

        [Required]
        public decimal PositionBlockX { get; set; }

        [Required]
        public decimal PositionBlockY { get; set; }

        // Only for location aspect
        [Required]
        public int Length { get; set; }

        [Required]
        public int Width { get; set; }

        [Required]
        public int Height { get; set; }
        
        [Required]
        public int Level { get; set; }

        [Required]
        public int Order { get; set; }

        [Required]
        public string StatusId { get; set; }
        public BuildStatus Status { get; set; }

        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        [RegularExpression(@"^(?=.*[1-9])\d+(\.[0-9]?)?$", ErrorMessage = "The version format must be at x.y")]
        public string Version { get; set; }

        public virtual ICollection<Connector> Connectors { get; set; }
        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual ICollection<Project> Projects { get; set; }

        public virtual ICollection<Edge> FromEdges { get; set; }
        public virtual ICollection<Edge> ToEdges { get; set; }

        public int Area => Length * Width;
        public Aspect Aspect => ResolveAspect();
        public bool IsRoot { get; set; }

        private Aspect ResolveAspect()
        {
            return Type switch
            {
                Models.Enums.NodeType.Function => Aspect.Function,
                Models.Enums.NodeType.AspectFunction => Aspect.Function,
                Models.Enums.NodeType.Product => Aspect.Product,
                Models.Enums.NodeType.AspectProduct => Aspect.Product,
                Models.Enums.NodeType.Location => Aspect.Location,
                Models.Enums.NodeType.AspectLocation => Aspect.Location,
                _ => Aspect.NotSet
            };
        }
    }
}
