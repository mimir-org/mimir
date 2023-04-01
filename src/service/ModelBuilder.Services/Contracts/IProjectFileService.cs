using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using Microsoft.AspNetCore.Http;

namespace Mb.Services.Contracts;

public interface IProjectFileService
{
    Task<ProjectAm> ResolveProject(ProjectConvertCm projectFile);
    Task ImportProject(IFormFile file, CancellationToken cancellationToken, Guid id, FileFormat fileFormat);
    Task<ProjectConvertCm> ConvertProject(ProjectConvertAm projectConverter);
}