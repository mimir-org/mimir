using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums;

public enum EntityType
{
    [Display(Name = "block")]
    block = 0,

    [Display(Name = "Connection")]
    Connection = 1,

    [Display(Name = "Attribute")]
    Attribute = 2
}