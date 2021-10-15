using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class ProjectAm
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsSubProject { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[1-9])\d+(\.[0-9]?)?$", ErrorMessage = "The version format must be at x.y")]
        public string Version { get; set; }

        public string Description { get; set; }

        public string ProjectOwner { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }

        public ICollection<NodeAm> Nodes { get; set; }

        public ICollection<EdgeAm> Edges { get; set; }
    }
}
