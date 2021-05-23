using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum TerminalCategory
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Material Fluid")]
        MaterialFluid = 1,

        [Display(Name = "Material Granulate")]
        MaterialGranulate = 2,

        [Display(Name = "Material Pieces")]
        MaterialPieces = 3,

        [Display(Name = "Energy Electrical")]
        EnergyElectrical = 4,

        [Display(Name = "Energy Thermal")]
        EnergyThermal = 5,

        [Display(Name = "Energy Mechanical")]
        EnergyMechanical = 6,

        [Display(Name = "Information")]
        Information = 7,

        [Display(Name = "Information")]
        Force = 8
    }
}
