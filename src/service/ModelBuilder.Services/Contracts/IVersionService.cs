using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IVersionService
    {
        Task<IEnumerable<VersionCm>> GetAllVersions();
        Task<IEnumerable<VersionCm>> GetAllVersions(string typeId);
        Task<ProjectDm> GetGetByVersion(string typeId, string version);
        Task<ProjectDm> GetProject(int id);
        Task<VersionCm> CreateVersion(ProjectDm project);
        Task DeleteVersion(int id);
    }
}