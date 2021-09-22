using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Services.Contracts
{
    public interface IProjectService
    {
        IEnumerable<ProjectSimple> GetProjectList(string name, int from, int number);
        Task<Project> GetProject(string id, bool ignoreNotFound = false);
        Task<Project> ImportProject(ProjectAm project);
        Task<Project> CreateProject(CreateProject createProject);
        Task<Project> CreateProject(ProjectAm project);
        Task<Project> UpdateProject(string id, ProjectAm project);
        Task DeleteProject(string projectId);
        Task<byte[]> CreateFile(string projectId, string parser);
        Task<Project> CreateFromFile(IFormFile file, CancellationToken cancellationToken, string parser);
        Task LockUnlockNode(LockUnlockNodeAm lockUnlockNodeAm);
        Task LockUnlockAttribute(LockUnlockAttributeAm lockUnlockAttributeAm);
        Task<List<string>> GetLockedNodes(string projectId);
        Task<List<string>> GetLockedAttributes(string projectId);
    }
}
