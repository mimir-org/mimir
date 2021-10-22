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

        [Required]
        [RegularExpression(@"^(?=.*[1-9])\d+(\.[0-9]?)?$", ErrorMessage = "The version format must be at x.y")]
        public string Version { get; set; }

        public ICollection<string> Nodes { get; set; }
        public ICollection<string> Edges { get; set; }
    }
}
