using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class ConnectorAm
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public ConnectorTypeAm Type { get; set; }

        [Required]
        public string NodeId { get; set; }
    }
}
