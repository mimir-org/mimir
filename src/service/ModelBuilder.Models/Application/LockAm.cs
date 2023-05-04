using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application;

public class LockAm
{
    [Required]
    public string Id { get; set; }

    [Required]
    public string ProjectId { get; set; }

    [Required]
    public bool IsLocked { get; set; }
}