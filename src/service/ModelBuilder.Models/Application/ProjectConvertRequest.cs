using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class ProjectConvertRequest
{
    [Required]
    public Guid ParserId { get; set; }

    [Required]
    public ProjectRequest Project { get; set; }

    [Required]
    public string FileName { get; set; }
}