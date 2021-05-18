using System;
using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    [Serializable]
    public class Node
    {
        public string Id { get; set; }
        public string SemanticId { get; set; }
        public string TagNumber { get; set; }
        public string Description { get; set; }
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

        // Only for location aspect
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int RelativeToPlatformEast { get; set; }
        public int RelativeToPlatformNorth { get; set; }
        public int RelativeToPlatformZeroPoint { get; set; }
        public int MaxTemp { get; set; }
        public int MinTemp { get; set; }
        public int NoiceRestriction { get; set; }
        public int Area => Length * Width;

        public BuildStatus Status { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }
        public string Version { get; set; }


        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual ICollection<Project> Projects { get; set; }

        
    }
}
