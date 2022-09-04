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
        Task<Project> GetProject(int id);
        Task<VersionCm> CreateVersion(string projectId);
        Task DeleteVersion(int id);
    }
}