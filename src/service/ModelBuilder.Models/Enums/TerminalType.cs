using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Enums
{
    public enum TerminalType
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Electric")]
        Electric = 1,

        [Display(Name = "Thermal")]
        Thermal = 2,

        [Display(Name = "Solar")]
        Solar = 3,

        [Display(Name = "Mechanical")]
        Mechanical = 4,

        [Display(Name = "Sound")]
        Sound = 5,

        [Display(Name = "Wind")]
        Wind = 6,

        [Display(Name = "HydroPower")]
        HydroPower = 7,

        [Display(Name = "Fluid")]
        Fluid = 8,

        [Display(Name = "DryGranulated")]
        DryGranulated = 9,

        [Display(Name = "SolidPieces")]
        SolidPieces = 10,

        [Display(Name = "Bracket")]
        Bracket = 11,

        [Display(Name = "Bolts")]
        Bolts = 12,

        [Display(Name = "Flanges")]
        Flanges = 13,

        [Display(Name = "Sensor")]
        Sensor = 14,

        [Display(Name = "Water")]
        Water = 15,

        [Display(Name = "Oil")]
        Oil = 16,

        [Display(Name = "ChemicalFluids")]
        ChemicalFluids = 17,

        [Display(Name = "MultiphaseFluids")]
        MultiphaseFluids = 18,

        [Display(Name = "WetGas")]
        WetGas = 19,

        [Display(Name = "Vapour")]
        Vapour = 20,

        [Display(Name = "Gas")]
        Gas = 21,

        [Display(Name = "Sand")]
        Sand = 22,

        [Display(Name = "Powder")]
        Powder = 23,

        [Display(Name = "Bricks")]
        Bricks = 24,

        [Display(Name = "Boxes")]
        Boxes = 25,

        [Display(Name = "Pieces")]
        Pieces = 26
    }
}
