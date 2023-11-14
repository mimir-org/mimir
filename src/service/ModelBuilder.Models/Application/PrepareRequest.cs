using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

public class PrepareRequest
{
    [Required]
    public Guid SubProject { get; set; }

    [Required]
    public string Version { get; set; }

    [Required]
    public Guid Project { get; set; }

    [Required]
    public double DropPositionX { get; set; }

    [Required]
    public double DropPositionY { get; set; }
}