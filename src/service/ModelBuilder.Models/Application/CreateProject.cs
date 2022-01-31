using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class CreateProject
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}