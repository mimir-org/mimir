using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class ProjectAm
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string ProjectOwner { get; set; }

        public DateTime? LastEdited { get; set; }

        public ICollection<NodeAm> Nodes { get; set; }

        public ICollection<EdgeAm> Edges { get; set; }
    }
}
