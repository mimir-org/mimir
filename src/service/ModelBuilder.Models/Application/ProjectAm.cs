using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class ProjectAm
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsSubProject { get; set; }

        public string Version { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }

        public ICollection<NodeAm> Nodes { get; set; }

        public ICollection<EdgeAm> Edges { get; set; }
    }
}
