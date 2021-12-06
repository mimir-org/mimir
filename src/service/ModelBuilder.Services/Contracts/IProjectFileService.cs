using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Http;

namespace Mb.Services.Contracts
{
    public interface IProjectFileService
    {
        Task<ProjectAm> ResolveProject(ProjectFileAm projectFile);
        Task<Project> ImportProject(ProjectFileAm project);
        Task<Project> ImportProject(IFormFile file, CancellationToken cancellationToken, Guid id);
    }
}
