using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum RdsCategory
    {
        [Display(Name = "Not set")]
        NotSet = 0,

        [Display(Name = "Functional Systems")]
        FunctionalSystems = 1,

        [Display(Name = "Technical Systems")]
        TechnicalSystems = 2,

        [Display(Name = "Components")]
        Components = 3,

        [Display(Name = "Transports")]
        Transports = 4,

        [Display(Name = "Interfaces")]
        Interfaces = 5,

        [Display(Name = "Spaces")]
        Spaces = 6,

        [Display(Name = "Construction Entities")]
        ConstructionEntities = 7
    }
}
