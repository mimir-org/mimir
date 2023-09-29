using System.Collections.Generic;

namespace Mb.Models.Client;

public class PrepareCm
{
    public string SubProjectId { get; set; }
    public ICollection<BlockCm> blocks { get; set; } = new List<BlockCm>();
    public ICollection<ConnectionCm> Connections { get; set; } = new List<ConnectionCm>();
}