using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class ConnectorAm
    {
        public string Id { get; set; }

        public string Name { get; set; }

        [Required]
        public ConnectorTypeAm Type { get; set; }

        [Required]
        public TerminalCategoryAm TerminalCategory { get; set; }

        [Required]
        public TerminalTypeAm TerminalType { get; set; }

        [Required]
        public RelationTypeAm RelationType { get; set; }

        [Required]
        public string NodeId { get; set; }
    }
}
