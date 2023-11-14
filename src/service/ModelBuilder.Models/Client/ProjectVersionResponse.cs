using System;

namespace Mb.Models.Client;

public class ProjectVersionResponse
{
    public Guid ProjectId { get; set; }
    public string Version { get; set; }
}