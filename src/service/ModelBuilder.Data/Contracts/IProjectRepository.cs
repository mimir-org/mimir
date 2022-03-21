using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Records;

namespace Mb.Data.Contracts
{
    public interface IProjectRepository : IGenericRepository<ModelBuilderDbContext, Project>
    {
        Task<Project> GetAsyncComplete(string id, string iri);
        IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number);
        Task UpdateProject(Project original, Project updated, ProjectEditData data);
    }
}