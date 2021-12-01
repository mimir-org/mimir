using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface ICloneService
    {
        (ICollection<Node> nodes, ICollection<Edge> edges) MakeClones(string projectId, ICollection<Node> nodes, ICollection<Edge> edges);
    }
}
