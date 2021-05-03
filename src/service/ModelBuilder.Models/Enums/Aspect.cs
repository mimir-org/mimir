using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum Aspect
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Function")]
        Function = 1,

        [Display(Name = "Product")]
        Product = 2,

        [Display(Name = "Location")]
        Location = 3
    }
}
