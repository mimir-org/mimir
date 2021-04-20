using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Core.Models;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectSimpleAm> GetProjectList();
        Task<ProjectAm> GetProject(string id);
        Task<ProjectAm> CreateProject(ProjectAm project);
        Task<ProjectAm> CreateNewProject(string name, string description);
        Task<ProjectAm> UpdateProject(ProjectAm project);
        Project CreateInitProject(string name, string description);
        IEnumerable<LibNodeAm> GetLibNodes(string searchString);
    }
}
