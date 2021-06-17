using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum NodeType
    {
        [Display(Name = "Not Set")]
        NotSet = 0,

        [Display(Name = "Aspect Function")]
        AspectFunction = 1,

        [Display(Name = "Aspect Location")]
        AspectLocation = 2,

        [Display(Name = "Aspect Product")]
        AspectProduct = 3,

        [Display(Name = "Function")]
        Function = 4,

        [Display(Name = "Product")]
        Product = 5,

        [Display(Name = "Location")]
        Location = 6
    }
}
