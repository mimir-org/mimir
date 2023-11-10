using System;

namespace Mb.Models.Data;

public class Attribute 
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
    public string AttributeType { get; set; }
    public string UnitSelected { get; set; }
    public string Units { get; set; }
    public string Qualifiers { get; set; }
    public string Terminal { get; set; }
    public Guid? Block { get; set; }


}