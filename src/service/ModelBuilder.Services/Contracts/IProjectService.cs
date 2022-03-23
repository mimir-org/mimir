using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Exceptions;

namespace Mb.Services.Contracts
{
    public interface IProjectService
    {
        /// <summary>
        /// Get a list of project items from start index and a max number that will be returned.
        /// The list will be filtered on the name parameter.
        /// </summary>
        /// <param name="name">Name search filter</param>
        /// <param name="from">From number</param>
        /// <param name="number">Number of items</param>
        /// <returns>A list project list items</returns>
        IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number);

        /// <summary>
        /// Get a project by Id or Iri. The project will include all edges, nodes, transports, interfaces,
        /// attributes and connectors.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <param name="ignoreNotFound"></param>
        /// <returns>The actual project</returns>
        /// <exception cref="ModelBuilderNotFoundException">Throws if the project does not exist</exception>
        Task<Project> GetProject(string id, string iri, bool ignoreNotFound = false);

        /// <summary>
        /// Create a new mimir project based on data
        /// </summary>
        /// <param name="project">The project that should be created</param>
        /// <returns>A create project task</returns>
        /// <exception cref="ModelBuilderDuplicateException">Throws if there is already a project, node or edge with same id.</exception>
        /// <exception cref="ModelBuilderNullReferenceException">Throws if project is null</exception>
        /// <exception cref="ModelBuilderBadRequestException">Throws if project is not valid</exception>
        Task<Project> CreateProject(ProjectAm project);

        /// <summary>
        /// Create a new sub project based on an existing project. 
        /// </summary>
        /// <param name="subProjectAm"></param>
        /// <returns></returns>
        Task<Project> CreateProject(SubProjectAm subProjectAm);

        /// <summary>
        /// Update a project
        /// </summary>
        /// <param name="id"></param>
        /// <param name="project"></param>
        /// <param name="invokedByDomain"></param>
        /// <param name="iri"></param>
        /// <returns>Update Project Task</returns>
        /// <exception cref="ModelBuilderInvalidOperationException">Throws if invoking domain is not set.</exception>
        /// <exception cref="ModelBuilderNotFoundException">Throws if project is missing from database.</exception>
        /// <exception cref="ModelBuilderNullReferenceException">Throws if project is null, or missing both id and iri.</exception>
        /// <exception cref="ModelBuilderBadRequestException">Throws if project is not valid.</exception>
        Task UpdateProject(string id, string iri, ProjectAm project, string invokedByDomain);



        Task<Project> CreateProject(CreateProject createProject);


        Task DeleteProject(string projectId);
        Task<(byte[] file, FileFormat format)> CreateFile(string projectId, Guid id);
        Task CommitProject(CommitPackage package);
        bool ProjectExist(string projectId, string projectIri);
    }
}