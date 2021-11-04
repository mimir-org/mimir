using System;
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
        Task<Project> CreateProject(SubProjectAm subProjectAm);
        Task<Project> UpdateProject(string id, ProjectAm project, string invokedByDomain);
        Task DeleteProject(string projectId);
        Task<(byte[] file, FileFormat format)> CreateFile(string projectId, Guid id);
        Task<Project> CreateFromFile(IFormFile file, CancellationToken cancellationToken, Guid id);
        Task LockUnlockNode(LockUnlockNodeAm lockUnlockNodeAm);
        Task LockUnlockAttribute(LockUnlockAttributeAm lockUnlockAttributeAm);
        IEnumerable<string> GetLockedNodes(string projectId);
        IEnumerable<string> GetLockedAttributes(string projectId);
        Task CommitProject(CommitPackage package);
        Task<bool> ProjectExist(string projectId);
    }
}
