using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class LockUnlockAttributeAm
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public bool IsLocked { get; set; }
    }
}