using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Services.Contracts;

public interface IVersionService
{
    Task<IEnumerable<VersionCm>> GetAllVersions();
    Task<IEnumerable<VersionCm>> GetAllVersions(Guid typeId);
    Task<ProjectDm> GetGetByVersion(Guid typeId, string version);
    Task<ProjectDm> GetProject(Guid id);
    Task<VersionCm> CreateVersion(ProjectDm project);
    Task DeleteVersion(Guid id);
}