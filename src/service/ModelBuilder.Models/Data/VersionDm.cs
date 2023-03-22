using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data;

public class VersionDm
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Ver { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public string TypeId { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public DateTime Created { get; set; }

    [Required]
    public string CreatedBy { get; set; }

    [Required]
    public string Data { get; set; }
}