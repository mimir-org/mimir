using System;
using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models
{
    public class Node
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string SemanticId { get; set; }
        public string TagNumber { get; set; }
        public string Name { get; set; }
        public IconType Icon { get; set; }
        public string Label { get; set; }
        public NodeType Type { get; set; }
        public decimal PositionX { get; set; }
        public decimal PositionY { get; set; }
        public virtual ICollection<Connector> Connectors { get; set; }
        public bool IsLocked { get; set; }
        public bool IsSelected { get; set; }

        public decimal PositionBlockX { get; set; }
        public decimal PositionBlockY { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }


        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual ICollection<Project> Projects { get; set; }

        
    }
}
