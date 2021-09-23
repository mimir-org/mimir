using System;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    [Flags]
    public enum Discipline
    {
        [Display(Name = "None")]
        None = 0,

        [Display(Name = "Not set")]
        NotSet = 1,

        [Display(Name = "Process")]
        Process = 2,

        [Display(Name = "Electro")]
        Electro = 4,

        [Display(Name = "Automation")]
        Automation = 8,

        [Display(Name = "Structural")]
        Structural = 16
    }
}