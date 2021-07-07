using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum BlobDataType
    {
        [Display(Name = "Not Set")] 
        NotSet = 0,

        [Display(Name = "Icon")]
        Icon = 1
    }
}
