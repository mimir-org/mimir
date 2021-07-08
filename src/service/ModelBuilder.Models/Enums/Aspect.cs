using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    [Flags]
    public enum Aspect
    {
        [Display(Name = "None")]
        None = 0,

        [Display(Name = "Not Set")]
        NotSet = 1,

        [Display(Name = "Function")]
        Function = 2,

        [Display(Name = "Product")]
        Product = 4,

        [Display(Name = "Location")]
        Location = 8
    }
}
