using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class OldLib
    {
        public string Id { get; set; }
        public Aspect Aspect { get; set; }

        public ObjectType ObjectType { get; set; }
        public string TypeName { get; set; }
        public Status Status { get; set; }
        public string Rds { get; set; }
        public RdsCategoryOld RdsCategory { get; set; }
        public string SemanticRdsReference { get; set; }
        public ICollection<TerminalTypeOld> Terminals { get; set; }
        public ICollection<AttributeTypeOld> Attributes { get; set; }
        public string Version { get; set; }
        public string SemanticReference { get; set; }
    }

    public enum RdsCategoryOld
    {
        [Display(Name = "Not set")]
        NotSet = 0,

        [Display(Name = "Functional Systems")]
        FunctionalSystems = 1,

        [Display(Name = "Technical Systems")]
        TechnicalSystems = 2,

        [Display(Name = "Components")]
        Components = 3,

        [Display(Name = "Transports")]
        Transports = 4,

        [Display(Name = "Interfaces")]
        Interfaces = 5,

        [Display(Name = "Spaces")]
        Spaces = 6,

        [Display(Name = "Construction Entities")]
        ConstructionEntities = 7
    }

    public enum TerminalCategoryOld
    {
        [Display(Name = "Not Set")]
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

        [Display(Name = "Force")]
        Force = 8
    }

    public enum AttributeQualifierOld
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Capacity")]
        Capacity = 1,

        [Display(Name = "Operating")]
        Operating = 2,

        [Display(Name = "Rating")]
        Rating = 3,
    }
    public enum AttributeSourceOld
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

    public enum AttributeConditionOld
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

        [Display(Name = "Minimum")]
        Minimum = 1,

        [Display(Name = "Nominal")]
        Nominal = 2,

        [Display(Name = "Maximum")]
        Maximum = 3,

        [Display(Name = "Actual")]
        Actual = 4
    }

    public enum AttributeFormatOld
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

    public enum UnitOld
    {
        [Display(Name = "NotSet")]
        NotSet = 0,

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
        Mm = 37,

        [Display(Name = "inch")]
        Inch = 38,

        [Display(Name = "mm2")]
        Mm2 = 39,

        [Display(Name = "sq.inch")]
        SqInch = 40,

        [Display(Name = "m3/d")]
        M3D = 41,

        [Display(Name = "m3/h")]
        M3H = 42,

        [Display(Name = "CF/hr")]
        Cfhr = 43,

        [Display(Name = "m")]
        M = 44
    }

    public enum TerminalOld
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

        [Display(Name = "Chemical")]
        Chemical = 17,

        [Display(Name = "Multiphase")]
        Multiphase = 18,

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
        Pieces = 26,

        [Display(Name = "Condensate")]
        Condensate = 27,

        [Display(Name = "Hot seawater")]
        HotSeawater = 28,

        [Display(Name = "Oily water")]
        OilyWater = 29,

        [Display(Name = "Produced water")]
        ProducedWater = 30,

        [Display(Name = "Seawater")]
        Seawater = 31,

        [Display(Name = "Cooling medium")]
        CoolingMedium = 32,

        [Display(Name = "Glycol MEG TEG")]
        GlycolMegTeg = 33,

        [Display(Name = "Methanol")]
        Methanol = 34
    }

    public class TerminalTypeOld
    {
        public string Id { get; set; }
        public TerminalOld Terminal { get; set; }
        public TerminalCategoryOld TerminalCategory { get; set; }
        public ConnectorType ConnectorType { get; set; }
        public string SemanticReference { get; set; }
        public ICollection<AttributeTypeOld> Attributes { get; set; }
    }


    public class AttributeTypeOld
    {
        public int Id { get; set; }
        public string Entity { get; set; }
        public AttributeQualifierOld Qualifier { get; set; }
        public AttributeSourceOld Source { get; set; }
        public AttributeConditionOld Condition { get; set; }
        public ICollection<UnitOld> Units { get; set; }
        public Aspect Aspect { get; set; }
        public AttributeFormatOld Format { get; set; }
        public bool IsInterface { get; set; }
        public bool IsTerminalType { get; set; }

        
    }
}