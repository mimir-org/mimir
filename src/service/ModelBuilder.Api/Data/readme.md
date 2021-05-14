# Type data files #
This files will be automatic resolved with application startup. Every file must be an array of objects. The application will automatically try to resolve:
- All .json files that contains name attribute as AttributeType
- All .json files that contains name library as LibraryTypeComponents
- All .json files that contains name rds as RDS.

# Documentation #
Examples of how to create types in file

## Attribute file
        [
          {
            "Entity": "[The name of the attribute]",
            "Qualifier": "[NotSet|Capacity|Operating|Rating]",
            "Source": "[NotSet|Required|Design|Calculated|Measured|RequiredLow|RequiredHigh|DesignLow|DesignHigh]",
            "Condition": "[NotSet|Minimum|Nominal|Maximum|Actual]",
            "Units": [
              "[Notset|None|Sm3D|Sm3H|Scfhr|Bbld|Barg|Bara|Psi|Psig|Pascal|Degc|Degf|Kelvin|Percent|Kgm3|Micron|Ppm|Ppb|Composite|Percent2X100|Percent3X50|Percent2X50|Specific|Fc|Fo|Fr|OneToN|NoDeadPockets|NotApplicable|MeterPerSecond|FeetPerSecond|LitersPerMSm3|PercentWeight|S|Ms|Min|Mm|Inch|Mm2|SqInch]",
              "[Notset|None|Sm3D|Sm3H|Scfhr|Bbld|Barg|Bara|Psi|Psig|Pascal|Degc|Degf|Kelvin|Percent|Kgm3|Micron|Ppm|Ppb|Composite|Percent2X100|Percent3X50|Percent2X50|Specific|Fc|Fo|Fr|OneToN|NoDeadPockets|NotApplicable|MeterPerSecond|FeetPerSecond|LitersPerMSm3|PercentWeight|S|Ms|Min|Mm|Inch|Mm2|SqInch]"
            ],
            "Aspect": "[NotSet|Function|Product|Location]",
            "Format": "[NotSet|UnsignedFloat|Float|UnsignedInteger|Table|Selection|TextDocReference|Boolean]",
            "IsInterface": [true|false]
          }
        ]
   
## RDS file
        [
          {
            "Code": "[RDS Code]",
            "Name": "[RDS Name]",
            "IsFunction": [true|false],
            "IsProduct": [true|false],
            "IsLocation": [true|false],
            "Category": "[NotSet|FunctionalSystems|TechnicalSystems|Components|Transports|Interfaces|Spaces|ConstructionEntities]"
          }
        ]
  
  
