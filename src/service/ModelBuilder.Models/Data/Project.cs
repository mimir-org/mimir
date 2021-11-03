using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Data
{
    [Serializable]
    public class Project
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public bool IsSubProject { get; set; }

        [Required]
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

        public void IncrementMajorVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementMajorVersion();
        }

        public void IncrementMinorVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementMinorVersion();
        }

        public void IncrementCommitVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementCommitVersion();
        }

        public string Domain => Id.ResolveDomain();

    }
}
