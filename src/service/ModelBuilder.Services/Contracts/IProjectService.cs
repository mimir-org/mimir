using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mb.Services.Contracts;

public interface IProjectService
{
    Task<ProjectCm> GetById(string id);
    Task<ProjectAm> GetAmById(string id);
    IEnumerable<ProjectCm> GetBySearch(string name, int from, int number);
    Task<(byte[] file, FileFormat format)> Download(string projectId, Guid id);
    Task<ProjectCm> CreateOrUpdate(ProjectAm project);
    Task<ProjectCm> CreateSubProject(SubProjectAm subProjectAm);
    Task ConvertSubProject(string projectId);
    Task<PrepareCm> PrepareForMerge(PrepareAm prepare);
    bool Exist(string projectId);
    Task Delete(string projectId);
}