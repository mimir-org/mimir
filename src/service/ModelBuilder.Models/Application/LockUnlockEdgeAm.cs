using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class LockUnlockEdgeAm
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string ProjectId { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }
    }
}