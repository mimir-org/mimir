using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.Services.Contracts
{
    public interface INodeService
    {
        Task UpdateNodes(string projectId, List<NodeAm> nodes);
    }
}
