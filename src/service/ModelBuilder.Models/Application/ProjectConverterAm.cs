using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class ProjectConverterAm
    {
        [Required]
        public string ParserId { get; set; }

        [Required]
        public ProjectAm Project { get; set; }
    }
}