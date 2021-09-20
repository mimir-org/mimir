using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class LockUnlockAm
    {
        public List<LockUnlockIdAm> Nodes { get; set; }
        public List<LockUnlockIdAm> Attributes { get; set; }
    }

    public class LockUnlockIdAm
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public bool IsLocked { get; set; }
    }
}