using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IVersionService
    {
        Task<VersionCm> GetVersion(int versionId);
        Task<IEnumerable<VersionCm>> GetVersions();
        Task<IEnumerable<VersionCm>> GetVersionTypes(string typeId);

        Task<Project> GetProject(int versionId);
        Task<IEnumerable<Project>> GetProjects(string typeId);

        Task<VersionCm> CreateVersion(string projectId);
        Task DeleteVersion(int versionId);
    }
}