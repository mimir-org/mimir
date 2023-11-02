using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Client;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Records;

namespace Mb.Data.Contracts;

public interface IProjectRepository : IGenericRepository<ModelBuilderDbContext, ProjectDm>
{
    /// <summary>
    /// Get complete project
    /// </summary>
    /// <param name="id">Project id</param>
    /// <returns>Complete project</returns>
    Task<ProjectDm> GetAsyncComplete(Guid? id);

    /// <summary>
    /// Get complete project async not read from cache
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Complete project</returns>
    Task<ProjectDm> GetProjectAsync(Guid? id);

    /// <summary>
    /// Get project list
    /// </summary>
    /// <param name="name">The project to search for</param>
    /// <param name="from">Get project from</param>
    /// <param name="number">Get number of project</param>
    /// <returns>A list of project information</returns>
    IEnumerable<ProjectCm> GetProjectList(string name, int from, int number);

    /// <summary>
    /// Get project version list
    /// </summary>
    /// <param name="isSubProject">Get sub-projects or projects</param>
    /// <returns>A list of project version information</returns>
    Task<List<VersionDataDm>> GetProjectVersions(bool isSubProject);

    /// <summary>
    /// Update project
    /// </summary>
    /// <param name="original"></param>
    /// <param name="updated"></param>
    /// <param name="data"></param>
    /// <returns>A project update task</returns>
    Task UpdateProject(ProjectDm original, ProjectDm updated, ProjectEditData data);

    /// <summary>
    /// Create a project
    /// </summary>
    /// <param name="project">The project that should be created</param>
    /// <param name="data">Project data</param>
    /// <returns>A project create task</returns>
    Task CreateProject(ProjectDm project, ProjectData data);

    /// <summary>
    /// Delete a project
    /// </summary>
    /// <param name="project">The project that should be deleted</param>
    /// <param name="data">Project data</param>
    /// <returns>A project delete task</returns>
    Task DeleteProject(ProjectDm project, ProjectData data);
}