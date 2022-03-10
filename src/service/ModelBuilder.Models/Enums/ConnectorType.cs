using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum ConnectorType
    {
        [Display(Name = "Input")]
        Input = 0,

        [Display(Name = "Output")]
        Output = 1,

        [Display(Name = "Bidirectional")]
        Bidirectional = 2
    }
}