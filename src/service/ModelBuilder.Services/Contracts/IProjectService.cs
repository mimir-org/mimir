using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IProjectService
    {
        IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number);
        Task<Project> GetProject(string id, bool ignoreNotFound = false);
        Task<Project> CreateProject(CreateProject createProject);
        Task<Project> CreateProject(ProjectAm project);
        Task<Project> CreateProject(SubProjectAm subProjectAm);
        Task<(Project, IDictionary<string, string>)> UpdateProject(string id, ProjectAm project, string invokedByDomain);
        Task DeleteProject(string projectId);
        Task<(byte[] file, FileFormat format)> CreateFile(string projectId, Guid id);
        Task CommitProject(CommitPackage package);
        bool ProjectExist(string projectId);
    }
}
