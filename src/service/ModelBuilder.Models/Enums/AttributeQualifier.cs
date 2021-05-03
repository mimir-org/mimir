using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum AttributeQualifier
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Capacity")]
        Capacity = 1,

        [Display(Name = "Operating")]
        Operating = 2,

        [Display(Name = "Rating")]
        Rating = 3,
    }
}
