using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    [Serializable]
    public class Project
    {
        [Required]
        public string Id { get; set; }

        public string ParentId { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[1-9])\d+(\.[0-9]?)?$", ErrorMessage = "The version format must be at x.y")]
        public string Version { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string ProjectOwner { get; set; }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Updated { get; set; }


        public virtual ICollection<Node> Nodes { get; set; }
        public virtual ICollection<Edge> Edges { get; set; }

        public bool IsSubProject => !string.IsNullOrEmpty(ParentId);
    }
}
