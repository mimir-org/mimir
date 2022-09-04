using Mb.Models.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class ProjectFileAm
    {
        [Required]
        public string ParserId { get; set; }

        [Required]
        public string FileContent { get; set; }

        public FileFormat FileFormat { get; set; }
    }
}