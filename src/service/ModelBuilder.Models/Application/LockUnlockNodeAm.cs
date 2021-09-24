using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class LockUnlockNodeAm
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string ProjectId { get; set; }
        [Required]
        public bool IsLocked { get; set; }
    }
}