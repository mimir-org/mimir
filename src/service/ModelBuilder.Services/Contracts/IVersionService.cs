using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Services.Contracts;

public interface IVersionService
{
    Task<IEnumerable<VersionResponse>> GetAllVersions();
    Task<IEnumerable<VersionResponse>> GetAllVersions(Guid typeId);
    Task<Project> GetGetByVersion(Guid typeId, string version);
    Task<Project> GetProject(Guid id);
    Task<VersionResponse> CreateVersion(Project project);
    Task DeleteVersion(Guid id);
}