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
        Task<Project> GetGetByVersion(string typeId, string version);
        Task<Project> GetProject(int id);
        Task<VersionCm> CreateVersion(Project project);
        Task DeleteVersion(int id);
    }
}