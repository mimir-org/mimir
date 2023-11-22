using System;

namespace Mb.Models.Application;

public class UnitRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string UnitType { get; set; }
    public string Symbol { get; set; }

}