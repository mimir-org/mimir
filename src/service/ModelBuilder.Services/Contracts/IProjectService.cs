using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mb.Services.Contracts;

public interface IProjectService
{
    Task<ProjectCm> GetById(Guid id);
    Task<ProjectAm> GetAmById(Guid id);
    IEnumerable<ProjectCm> GetBySearch(string name, int from, int number);
    Task<(byte[] file, FileFormat format)> Download(Guid projectId, Guid id);
    Task<Guid> Update(ProjectAm project);
    Task<Guid> Create(ProjectAm project);
    Task<ProjectCm> CreateSubProject(SubProjectAm subProjectAm);
    Task ConvertSubProject(Guid projectId);
    Task<PrepareCm> PrepareForMerge(PrepareAm prepare);
    bool Exist(Guid? projectId);
    Task Delete(Guid? projectId);
}