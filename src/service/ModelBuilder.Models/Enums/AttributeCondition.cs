using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum AttributeCondition
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Minimum")]
        Minimum = 1,

        [Display(Name = "Nominal")]
        Nominal = 2,

        [Display(Name = "Maximum")]
        Maximum = 3,

        [Display(Name = "Actual")]
        Actual = 4
    }
}
