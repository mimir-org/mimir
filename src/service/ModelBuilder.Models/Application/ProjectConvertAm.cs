using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class ProjectConvertAm
    {
        [Required]
        public string ParserId { get; set; }

        [Required]
        public ProjectAm Project { get; set; }

        [Required]
        public string FileName { get; set; }
    }
}