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
  
## Library file  
        [
      {
        "Id": "[DOMAIN_GUID]",
        "Aspect": "[NotSet|Function|Product|Location]",
        "ObjectType": "[NotSet|ObjectBlock|Transport|Interface ]",
        "TypeName": "[The type name]",
        "Status": "[NotSet|Draft|Complete]",
        "Rds": "[RDS CODE]",
        "RdsCategory": "[NotSet|FunctionalSystems|TechnicalSystems|Components|Transports|Interfaces|Spaces|ConstructionEntities]",
		"SemanticRdsReference": "[SemanticRdsReference]",
        "Version": "[x.y]",
        "Terminals": [
          {
	  "Id": "[DOMAIN_GUID]"
            "TerminalType": "[NotSet|Electric|Thermal|Solar|Mechanical|Sound|Wind|HydroPower|Fluid|DryGranulated|SolidPieces|Bracket|Bolts|Flanges|Sensor|Water|Oil|ChemicalFluids|MultiphaseFluids|WetGas|Vapour|Gas|Sand|Powder|Bricks|Boxes|Pieces]",
            "ConnectorType": "[Input|Output]",
			"SemanticReference": "[SemanticReference]",
			"Attributes": [
			  {
				"Entity": "[The name of the attribute]",
				"Qualifier": "[NotSet|Capacity|Operating|Rating]",
				"Source": "[NotSet|Required|Design|Calculated|Measured|RequiredLow|RequiredHigh|DesignLow|DesignHigh]",
				"Condition": "[NotSet|Minimum|Nominal|Maximum|Actual]",
				"Units": [
				  "[Notset|None|Sm3D|Sm3H|Scfhr|Bbld|Barg|Bara|Psi|Psig|Pascal|Degc|Degf|Kelvin|Percent|Kgm3|Micron|Ppm|Ppb|Composite|Percent2X100|Percent3X50|Percent2X50|Specific|Fc|Fo|Fr|OneToN|NoDeadPockets|NotApplicable|MeterPerSecond|FeetPerSecond|LitersPerMSm3|PercentWeight|S|Ms|Min|Mm|Inch|Mm2|SqInch]"
				],
				"Aspect": "[NotSet|Function|Product|Location]",
				"Format": "[NotSet|UnsignedFloat|Float|UnsignedInteger|Table|Selection|TextDocReference|Boolean]",
				"IsInterface": [true|false]
			  }
			]
          }
        ],
        "Attributes": [
          {
            "Entity": "[The name of the attribute]",
            "Qualifier": "[NotSet|Capacity|Operating|Rating]",
            "Source": "[NotSet|Required|Design|Calculated|Measured|RequiredLow|RequiredHigh|DesignLow|DesignHigh]",
            "Condition": "[NotSet|Minimum|Nominal|Maximum|Actual]",
            "Units": [
              "[Notset|None|Sm3D|Sm3H|Scfhr|Bbld|Barg|Bara|Psi|Psig|Pascal|Degc|Degf|Kelvin|Percent|Kgm3|Micron|Ppm|Ppb|Composite|Percent2X100|Percent3X50|Percent2X50|Specific|Fc|Fo|Fr|OneToN|NoDeadPockets|NotApplicable|MeterPerSecond|FeetPerSecond|LitersPerMSm3|PercentWeight|S|Ms|Min|Mm|Inch|Mm2|SqInch]"
            ],
            "Aspect": "[NotSet|Function|Product|Location]",
            "Format": "[NotSet|UnsignedFloat|Float|UnsignedInteger|Table|Selection|TextDocReference|Boolean]",
            "IsInterface": [true|false]
          }
        ]
      }
    ]
  
  
