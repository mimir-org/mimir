using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum EntityType
    {
        [Display(Name = "Node")]
        Node = 0,

        [Display(Name = "Edge")]
        Edge = 1,

        [Display(Name = "Attribute")]
        Attribute = 2
    }
}