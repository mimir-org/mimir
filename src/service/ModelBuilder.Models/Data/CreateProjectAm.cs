using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class CreateProjectAm
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
