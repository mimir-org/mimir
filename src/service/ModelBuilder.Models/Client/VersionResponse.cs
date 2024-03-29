using System;

namespace Mb.Models.Client;

public class VersionResponse
{
    public string Id { get; set; }
    public string Ver { get; set; }
    public string Type { get; set; }
    public string TypeId { get; set; }
    public string Name { get; set; }
    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
}