using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IProjectService
    {
        IEnumerable<ProjectCm> Get(string name, int from, int number);
        Task<ProjectCm> Get(string id);
        Task<ProjectCm> Create(ProjectUpdateAm project);
        Task<ProjectCm> Create(SubProjectAm subProjectAm);
        Task Update(string id, ProjectUpdateAm project, string invokedByDomain);
        Task<ProjectCm> Create(ProjectCreateAm projectCreateAm);
        Task ConvertSubProject(string projectId);
        Task Delete(string projectId);
        Task<(byte[] file, FileFormat format)> CreateFile(string projectId, Guid id);
        Task<PrepareCm> PrepareForMerge(PrepareAm prepare);
        bool Exist(string projectId, string projectIri);
    }
}