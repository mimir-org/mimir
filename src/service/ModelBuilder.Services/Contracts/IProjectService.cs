using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;

namespace Mb.Services.Contracts
{
    public interface IProjectService
    {
        Task<ProjectCm> GetById(string id);
        IEnumerable<ProjectCm> GetBySearch(string name, int from, int number);
        Task<ProjectCm> CreateProject(ProjectCreateAm projectCreateAm);
        Task<ProjectCm> CreateSubProject(SubProjectAm subProjectAm);
        Task<(byte[] file, FileFormat format)> DownloadProject(string projectId, Guid id);
        Task UpdateProject(string id, ProjectAm project, string invokedByDomain);
        Task<ProjectCm> UpdateProject(ProjectAm project);
        Task ConvertSubProject(string projectId);
        Task<PrepareCm> PrepareForMerge(PrepareAm prepare);
        bool Exist(string projectId, string projectIri);
        Task DeleteProject(string projectId);
    }
}