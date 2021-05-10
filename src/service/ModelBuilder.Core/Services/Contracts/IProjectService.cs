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
        Task<Project> CreateProject(CreateProject createProject);
        Task<Project> CreateProject(Project project);
        Task<Project> UpdateProject(Project project);
        Task DeleteProject(string projectId);
        Task<byte[]> CreateFile(string projectId, string parser);
        Task<Project> CreateFromFile(IFormFile file, CancellationToken cancellationToken, string parser);
    }
}
