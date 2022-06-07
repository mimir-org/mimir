using System;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Client
{
    public class LockCm
    {
        public string Id { get; set; }
        public string ProjectId { get; set; }
        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        [EnumDataType(typeof(EntityType))]
        public EntityType Type { get; set; }
    }
}