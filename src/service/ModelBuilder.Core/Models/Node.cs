using System;
using System.Collections.Generic;
using Mb.Core.Enums;

namespace Mb.Core.Models
{
    public class Node
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public IconType Icon { get; set; }
        public string Label { get; set; }
        public NodeType Type { get; set; }
        public decimal PositionX { get; set; }
        public decimal PositionY { get; set; }
        public virtual ICollection<Connector> Connectors { get; set; }
        public bool IsLocked { get; set; }
        public bool IsSelected { get; set; }
        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
    }
}
