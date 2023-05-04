using System;

namespace Mb.Models.Common;

public class LockDm
{
    public string Id { get; set; }
    public string ProjectId { get; set; }
    public bool IsLocked { get; set; }
    public string IsLockedStatusBy { get; set; }
    public DateTime? IsLockedStatusDate { get; set; }
}