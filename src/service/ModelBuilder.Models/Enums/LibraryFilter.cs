using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum LibraryFilter
    {
        [Display(Name = "Node")]
        Node = 0,

        [Display(Name = "Transport")]
        Transport = 1,

        [Display(Name = "Interface")]
        Interface = 2
    }
}