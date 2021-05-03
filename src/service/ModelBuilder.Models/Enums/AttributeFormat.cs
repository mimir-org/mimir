using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum AttributeFormat
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Unsigned Float")]
        UnsignedFloat = 1,

        [Display(Name = "Float")]
        Float = 2,

        [Display(Name = "Unsigned Integer")]
        UnsignedInteger = 3,

        [Display(Name = "Table")]
        Table = 4,

        [Display(Name = "Selection")]
        Selection = 5,

        [Display(Name = "Text and doc reference")]
        TextDocReference = 6,

        [Display(Name = "Boolean")]
        Boolean = 7
    }
}
