using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Application;

public class ConnectorRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ConnectorDirection Direction { get; set; }
    public string Inside { get; set; }
    public string Outside { get; set; }
    public Guid BlockId { get; set; }
    public List<Attribute> Attributes { get; set; }
    public RelationType TypeConnector { get; set; }
    public Guid TerminalId { get; set; }
    public string Color { get; set; }
}