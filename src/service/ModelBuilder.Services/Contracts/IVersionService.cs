using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IVersionService
    {
        Task<IEnumerable<VersionCm>> GetVersions();
        Task<IEnumerable<VersionCm>> GetVersionTypes(string typeId);
        Task<Project> GetVersionProject(int id);
        Task<IEnumerable<Project>> GetVersionsProject(string typeId);
        Task<VersionCm> CreateVersion(string projectId);
        Task DeleteVersion(int id);
    }
}