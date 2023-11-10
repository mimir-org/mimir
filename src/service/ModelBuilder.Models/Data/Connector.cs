using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using System;

namespace Mb.Models.Data;

public class Connector
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ConnectorDirection Direction { get; set; }
    public string Inside { get; set; }
    public string Outside { get; set; }
    public Guid BlockId { get; set; }
    public RelationType TypeConnector { get; set; }
    public Guid TerminalId { get; set; }
    public string Color { get; set; }
}

