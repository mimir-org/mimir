using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums;

public enum ConnectorVisibility
{
    [Display(Name = "None")]
    None = 0,

    [Display(Name = "Input visible")]
    InputVisible = 1,

    [Display(Name = "Output visible")]
    OutputVisible = 2
}