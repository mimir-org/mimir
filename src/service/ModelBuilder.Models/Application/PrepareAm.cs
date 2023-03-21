using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class PrepareAm
    {
        [Required]
        public string SubProject { get; set; }

        [Required]
        public string Version { get; set; }

        [Required]
        public string Project { get; set; }

        [Required]
        public double DropPositionX { get; set; }

        [Required]
        public double DropPositionY { get; set; }
    }
}