using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
{
    public interface IProjectService
    {
        IEnumerable<ProjectSimple> GetProjectList(string name, int from, int number);
        Task<Project> GetProject(string id);
        Task<Project> CreateProject(CreateProject createProject);
        Task<Project> CreateProject(Project project);
        Task<Project> UpdateProject(Project project);
        Task DeleteProject(string projectId);
    }
}
