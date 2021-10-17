using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class BlobDataAm
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Data { get; set; }

        [Required]
        public Discipline Discipline { get; set; }
    }
}
