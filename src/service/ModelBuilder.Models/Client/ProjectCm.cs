using System;
using Mb.Models.Application;
using System.Collections.Generic;

namespace Mb.Models.Client;

public class ProjectCm
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Version { get; set; }
    public bool SubProject { get; set; }
    public string Description { get; set; }
    public DateTime? Updated { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
    public ICollection<BlockCm> blocks { get; set; } = new List<BlockCm>();
    public ICollection<ConnectionCm> Connections { get; set; } = new List<ConnectionCm>();
}