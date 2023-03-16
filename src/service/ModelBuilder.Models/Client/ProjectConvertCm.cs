using Mb.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Client
{
    public class ProjectConvertCm
    {
        [Required]
        public string ParserId { get; set; }

        [Required]
        public string FileContent { get; set; }

        [Required]
        public FileFormat FileFormat { get; set; }

        [Required]
        public string Filename { get; set; }
    }
}