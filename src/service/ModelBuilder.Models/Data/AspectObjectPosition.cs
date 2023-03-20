using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    [Serializable]
    public class AspectObjectPosition
    {
        [Required]
        public int ThreePosX { get; set; }
        [Required]
        public int ThreePosY { get; set; }
        [Required]
        public int BlockPosX { get; set; }
        [Required]
        public int BlockPosY { get; set; }

    }
}