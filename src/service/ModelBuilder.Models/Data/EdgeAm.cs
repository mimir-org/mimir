using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class EdgeAm
    {
        public string Id { get; set; }

        [Required]
        public string FromConnector { get; set; }

        [Required]
        public string ToConnector { get; set; }

        [Required]
        public string FromNode { get; set; }

        [Required]
        public string ToNode { get; set; }

        [Required]
        public NodeTypeAm ParentType { get; set; }

        [Required]
        public string ParentName { get; set; }
    }
}
