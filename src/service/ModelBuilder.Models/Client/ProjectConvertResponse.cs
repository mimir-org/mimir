using Mb.Models.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Client;

public class ProjectConvertResponse
{
    [Required]
    public Guid ParserId { get; set; }

    [Required]
    public string FileContent { get; set; }

    [Required]
    public FileFormat FileFormat { get; set; }

    [Required]
    public string Filename { get; set; }
}