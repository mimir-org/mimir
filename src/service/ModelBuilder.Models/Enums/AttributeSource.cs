using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum AttributeSource
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Required")]
        Required = 1, 
        
        [Display(Name = "Design")]
        Design = 2,
        
        [Display(Name = "Calculated")]
        Calculated = 3,
        
        [Display(Name = "Measured")]
        Measured = 4, 
        
        [Display(Name = "Required, Low")]
        RequiredLow = 5,
        
        [Display(Name = "Required, High")]
        RequiredHigh = 6,

        [Display(Name = "Design, Low")]
        DesignLow = 7,

        [Display(Name = "Design, High")]
        DesignHigh = 8
    }
}
