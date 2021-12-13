using System;
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
        Task LockAttribute(LockAttributeAm lockAttributeAm, bool save, string userName, DateTime dateTimeNow);
        Task LockEdge(LockEdgeAm lockEdgeAm, bool save, string userName, DateTime dateTimeNow);
        Task LockNode(LockNodeAm lockNodeAm, string userName, DateTime dateTimeNow);
    }
}