using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class NodeAm
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public IconTypeAm Icon { get; set; }

        public string Label { get; set; }

        [Required]
        public NodeTypeAm Type { get; set; }

        public decimal PositionX { get; set; }

        public decimal PositionY { get; set; }

        public ICollection<ConnectorAm> Connectors { get; set; }

        public bool IsLocked { get; set; }
        
        public bool IsSelected { get; set; }
        
        public ICollection<AttributeAm> Attributes { get; set; }
    }
}
