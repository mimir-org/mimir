using System;
using System.Collections.Generic;

namespace Mb.Models.Client;

public class PrepareResponse
{
    public Guid SubProjectId { get; set; }
    public ICollection<BlockResponse> Blocks { get; set; } = new List<BlockResponse>();
    public ICollection<ConnectionResponse> Connections { get; set; } = new List<ConnectionResponse>();
}