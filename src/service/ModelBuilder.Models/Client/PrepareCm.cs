using System;
using System.Collections.Generic;

namespace Mb.Models.Client;

public class PrepareCm
{
    public Guid SubProjectId { get; set; }
    public ICollection<BlockCm> Blocks { get; set; } = new List<BlockCm>();
    public ICollection<ConnectionCm> Connections { get; set; } = new List<ConnectionCm>();
}