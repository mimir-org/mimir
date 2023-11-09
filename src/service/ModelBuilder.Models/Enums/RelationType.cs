using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums;

public enum RelationType
{
    [Display(Name = "NotSet")]
    NotSet = 0,

    [Display(Name = "HasLocation")]
    HasLocation = 1,

    [Display(Name = "PartOf")]
    PartOf = 2,

    [Display(Name = "FulfilledBy")]
    FulfilledBy = 3,

    [Display(Name = "Terminal")]
    Terminal = 4
}