using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class SubProjectAm
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public ICollection<string> Nodes { get; set; }
        public ICollection<string> Edges { get; set; }
    }
}
