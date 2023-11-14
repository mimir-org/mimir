using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mb.Services.Contracts;

public interface IProjectService
{
    Task<ProjectResponse> GetById(Guid id);
    Task<ProjectRequest> GetAmById(Guid id);
    IEnumerable<ProjectResponse> GetBySearch(string name, int from, int number);
    Task<(byte[] file, FileFormat format)> Download(Guid projectId, Guid id);
    Task<Guid> Update(ProjectRequest project);
    Task<Guid> Create(ProjectRequest project);
    Task<ProjectResponse> CreateSubProject(SubProjectRequest subProjectAm);
    Task ConvertSubProject(Guid projectId);
    Task<PrepareResponse> PrepareForMerge(PrepareRequest prepare);
    bool Exist(Guid? projectId);
    Task Delete(Guid? projectId);
}