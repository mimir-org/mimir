using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;

namespace Mb.Services.Contracts;

public interface IProjectService
{
    Task<ProjectCm> GetById(string id);
    IEnumerable<ProjectCm> GetBySearch(string name, int from, int number);
    Task<(byte[] file, FileFormat format)> Download(string projectId, Guid id);
    Task<ProjectCm> CreateOrUpdate(ProjectAm project);
    Task<ProjectCm> CreateSubProject(SubProjectAm subProjectAm);
    Task ConvertSubProject(string projectId);
    Task<PrepareCm> PrepareForMerge(PrepareAm prepare);
    bool Exist(string projectId);
    Task Delete(string projectId);
}