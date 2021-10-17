using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Http;

namespace Mb.Services.Contracts
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
        Task<(byte[] file, FileFormat format)> CreateFile(string projectId, string parser);
        Task<Project> CreateFromFile(IFormFile file, CancellationToken cancellationToken, string parser);
        Task LockUnlockNode(LockUnlockNodeAm lockUnlockNodeAm);
        Task LockUnlockAttribute(LockUnlockAttributeAm lockUnlockAttributeAm);
        IEnumerable<string> GetLockedNodes(string projectId);
        IEnumerable<string> GetLockedAttributes(string projectId);
        Task CommitProject(CommitPackage package);
    }
}
