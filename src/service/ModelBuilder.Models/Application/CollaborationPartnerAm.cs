using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class CollaborationPartnerAm
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Domain { get; set; }

        [Required]
        public bool Current { get; set; }

        public ICollection<string> Iris { get; set; }
    }
}