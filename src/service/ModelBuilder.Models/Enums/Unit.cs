using System.ComponentModel.DataAnnotations;

// ReSharper disable IdentifierTypo
// ReSharper disable StringLiteralTypo

namespace Mb.Models.Enums
{
    public enum Unit
    {
        [Display(Name = "NotSet")]
        Notset = 0,

        [Display(Name = "None")]
        None = 1,

        [Display(Name = "Sm3/d")]
        Sm3D = 2,

        [Display(Name = "Sm3/h")]
        Sm3H = 3,

        [Display(Name = "SCF/hr")]
        Scfhr = 4,

        [Display(Name = "bbl/d")]
        Bbld = 5,

        [Display(Name = "barg")]
        Barg = 6,

        [Display(Name = "bara")]
        Bara = 7,

        [Display(Name = "psi")]
        Psi = 8,

        [Display(Name = "psig")]
        Psig = 9,

        [Display(Name = "Pascal")]
        Pascal = 10,

        [Display(Name = "degC")]
        Degc = 11,

        [Display(Name = "degF")]
        Degf = 12,

        [Display(Name = "Kelvin")]
        Kelvin = 13,

        [Display(Name = "%")]
        Percent = 14,

        [Display(Name = "kg/m3")]
        Kgm3 = 15,

        [Display(Name = "micron")]
        Micron = 16,

        [Display(Name = "ppm")]
        Ppm = 17,

        [Display(Name = "ppb")]
        Ppb = 18,

        [Display(Name = "composite")]
        Composite = 19,

        [Display(Name = "2x100%")]
        Percent2X100 = 20,

        [Display(Name = "3x50%")]
        Percent3X50 = 21,

        [Display(Name = "2x50%")]
        Percent2X50 = 22,

        [Display(Name = "<specific>")]
        Specific = 23,

        [Display(Name = "FC")]
        Fc = 24,

        [Display(Name = "FO")]
        Fo = 25,

        [Display(Name = "FR")]
        Fr = 26,

        [Display(Name = "1:n")]
        OneToN = 27,

        [Display(Name = "No dead pockets")]
        NoDeadPockets = 28,

        [Display(Name = "N/A")]
        NotApplicable = 29,

        [Display(Name = "m/s")]
        MeterPerSecond = 30,

        [Display(Name = "ft/sec")]
        FeetPerSecond = 31,

        [Display(Name = "liter/MSm3")]
        LitersPerMSm3 = 32,

        [Display(Name = "weight %")]
        PercentWeight = 33,

        [Display(Name = "S")]
        S = 34,

        [Display(Name = "mS")]
        Ms = 35,

        [Display(Name = "min")]
        Min = 36,

        [Display(Name = "mm")]
        Mm = 37
    }
}
