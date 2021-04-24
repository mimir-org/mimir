using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Core.Models;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectSimpleAm> GetProjectList(string name);
        Task<ProjectAm> GetProject(string id);
        Task<ProjectAm> CreateProject(ProjectAm project);
        Task<ProjectAm> CreateNewProject(CreateProjectAm createProjectAm);
        Project CreateInitProject(string name, string description);
        IEnumerable<LibNodeAm> GetLibNodes(string searchString);
    }
}
