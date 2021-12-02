using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IRemapService
    {
        (ICollection<Node> nodes, ICollection<Edge> edges) CreateRemap(string projectId, ICollection<Node> nodes, ICollection<Edge> edges, bool reuseValidIds);
    }
}
