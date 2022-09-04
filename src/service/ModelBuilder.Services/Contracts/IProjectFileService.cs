using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Application;
using Microsoft.AspNetCore.Http;

namespace Mb.Services.Contracts
{
    public interface IProjectFileService
    {
        Task<ProjectAm> ResolveProject(ProjectFileAm projectFile);
        Task ImportProject(IFormFile file, CancellationToken cancellationToken, Guid id);
        Task<ProjectFileAm> ConvertProject(ProjectConverterAm projectConverter);
    }
}