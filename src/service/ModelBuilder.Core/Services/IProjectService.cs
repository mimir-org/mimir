using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectSimple> GetProjectList(string name);
        Task<Project> GetProject(string id);
        Task<Project> CreateProject(Project project);
        Task<Project> CreateNewProject(CreateProject createProjectAm);
        Project CreateInitProject(string name, string description);
        IEnumerable<LibNode> GetLibNodes(string searchString);
    }
}
