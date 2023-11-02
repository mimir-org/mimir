using System;

namespace Mb.Models.Client;

public class ProjectVersionCm
{
    public Guid ProjectId { get; set; }
    public string Version { get; set; }
}