using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum Status
    {
        [Display(Name = "Not Set")]
        NotSet = 0,

        [Display(Name = "Draft")]
        Draft = 1,

        [Display(Name = "Complete")]
        Complete = 2
    }
}
