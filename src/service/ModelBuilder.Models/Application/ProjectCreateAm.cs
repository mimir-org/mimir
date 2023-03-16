using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class ProjectCreateAm
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public bool SubProject { get; set; }
    }
}