using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.Services.Contracts
{
    public interface ILockService
    {
        IEnumerable<string> GetLockedAttributes(string projectId);
        IEnumerable<string> GetLockedEdges(string projectId);
        IEnumerable<string> GetLockedNodes(string projectId);
        Task LockAttribute(LockAttributeAm lockAttributeAm);
        Task LockEdge(LockEdgeAm lockEdgeAm);
        Task LockNode(LockNodeAm lockNodeAm);
    }
}