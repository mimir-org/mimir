using System;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application;

public class LockAm
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public Guid ProjectId { get; set; }

    [Required]
    public bool IsLocked { get; set; }
}