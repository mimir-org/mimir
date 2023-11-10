using System;

namespace Mb.Models.Data;

public class Unit
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string UnitType { get; set; }
    public string Symbol { get; set; }
}