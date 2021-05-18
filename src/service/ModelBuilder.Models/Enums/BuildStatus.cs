using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum BuildStatus
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Unused")]
        Unused = 1,

        [Display(Name = "Reserved")]
        Reserved = 2,

        [Display(Name = "Planned")]
        Planned = 3,

        [Display(Name = "AsBuilt")]
        AsBuilt = 4,

        [Display(Name = "Historic")]
        Historic = 5,

        [Display(Name = "OutOfService")]
        OutOfService = 6
    }
}
