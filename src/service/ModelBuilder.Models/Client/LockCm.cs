using System;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Client;

public class LockCm
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public bool IsLocked { get; set; }
    public string IsLockedStatusBy { get; set; }
    public DateTime? IsLockedStatusDate { get; set; }
}