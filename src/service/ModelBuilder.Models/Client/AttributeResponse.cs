using System;
using System.Collections.Generic;

namespace Mb.Models.Client;

public class AttributeResponse
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
    public string AttributeType { get; set; }
    public string UnitSelected { get; set; }
    public ICollection<UnitResponse> Units { get; set; }
    public ICollection<QualifierResponse> Qualifiers { get; set; }
    public string ConnectorTerminal { get; set; }
    public string Block { get; set; }
}