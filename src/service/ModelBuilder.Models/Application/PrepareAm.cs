using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class PrepareAm
    {
        [Required]
        public string SubProjectId { get; set; }

        [Required]
        public string ProjectId { get; set; }

        [Required]
        public string DropPositionX { get; set; }

        [Required]
        public string DropPositionY { get; set; }
    }
}