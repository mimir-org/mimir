using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Records;

namespace Mb.Data.Contracts
{
    public interface IProjectRepository : IGenericRepository<ModelBuilderDbContext, Project>
    {
        /// <summary>
        /// Get complete project
        /// </summary>
        /// <param name="id">Project id</param>
        /// <param name="iri">Project Iri</param>
        /// <returns>Complete project</returns>
        Task<Project> GetAsyncComplete(string id, string iri);

        /// <summary>
        /// Get project list
        /// </summary>
        /// <param name="name">The project to search for</param>
        /// <param name="from">Get project from</param>
        /// <param name="number">Get number of project</param>
        /// <returns>A list of project information</returns>
        IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number);

        /// <summary>
        /// Update project
        /// </summary>
        /// <param name="original"></param>
        /// <param name="updated"></param>
        /// <param name="data"></param>
        /// <returns>A project update task</returns>
        Task UpdateProject(Project original, Project updated, ProjectEditData data);

        /// <summary>
        /// Create a project
        /// </summary>
        /// <param name="project">The project that should be created</param>
        /// <param name="data">Project data</param>
        /// <returns>A project create task</returns>
        Task CreateProject(Project project, ProjectData data);

        /// <summary>
        /// Delete a project
        /// </summary>
        /// <param name="project">The project that should be deleted</param>
        /// <param name="data">Project data</param>
        /// <returns>A project delete task</returns>
        Task DeleteProject(Project project, ProjectData data);
    }
}