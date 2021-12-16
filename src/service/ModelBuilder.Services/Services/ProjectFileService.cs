using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;

namespace Mb.Services.Services
{
    public class ProjectFileService : IProjectFileService
    {
        private readonly IModuleService _moduleService;
        private readonly IProjectService _projectService;
        private readonly ICommonRepository _commonRepository;

        #region Constructors

        public ProjectFileService(IModuleService moduleService, IProjectService projectService, ICommonRepository commonRepository)
        {
            _moduleService = moduleService;
            _projectService = projectService;
            _commonRepository = commonRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Resolve project from project file
        /// </summary>
        /// <param name="projectFile"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderInvalidOperationException"></exception>
        /// <exception cref="ModelBuilderBadRequestException"></exception>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public async Task<ProjectAm> ResolveProject(ProjectFileAm projectFile)
        {
            if (projectFile == null)
                throw new ModelBuilderInvalidOperationException("ProjectFile is null");

            var validation = projectFile.ValidateObject();
            if (!validation.IsValid)
                throw new ModelBuilderBadRequestException("Couldn't resolve project, the ProjectFile is not valid.", validation);

            if (_moduleService.Modules.All(x => x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty && !string.Equals(x.ModuleDescription.Id.ToString(), projectFile.ParserId.ToString(), StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with key: {projectFile.ParserId}");

            var par = _moduleService.Resolve<IModelBuilderParser>(projectFile.ParserId);
            var project = await par.DeserializeProjectAm(Encoding.UTF8.GetBytes(projectFile.FileContent));
            return project;
        }

        /// <summary>
        /// Import project, if exist update project
        /// </summary>
        /// <param name="projectFile"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderInvalidOperationException"></exception>
        public async Task<Project> ImportProject(ProjectFileAm projectFile)
        {
            if (projectFile == null)
                throw new ModelBuilderInvalidOperationException("ProjectFile is null");

            var validation = projectFile.ValidateObject();
            if (!validation.IsValid)
                throw new ModelBuilderBadRequestException("Couldn't resolve project, the ProjectFile is not valid.", validation);

            var project = await ResolveProject(projectFile);

            if (project == null || string.IsNullOrEmpty(project.Id))
                throw new ModelBuilderInvalidOperationException("You can't import an project that is null or missing id");

            var exist = _projectService.ProjectExist(project.Id);

            if (exist)
            {
                var projectResult = await _projectService.UpdateProject(project.Id, project, _commonRepository.GetDomain());
                return projectResult.Project;
            }
            
            return await _projectService.CreateProject(project);
        }

        /// <summary>
        /// Import project, if exist update project
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public async Task<Project> ImportProject(IFormFile file, CancellationToken cancellationToken, Guid id)
        {
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream, cancellationToken);
            var fileContent = Encoding.UTF8.GetString(stream.ToArray());
            return await ImportProject(new ProjectFileAm {ParserId = id, FileContent = fileContent});
        }

        /// <summary>
        /// Save and convert project
        /// </summary>
        /// <param name="projectConverter"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderInvalidOperationException"></exception>
        /// <exception cref="ModelBuilderNullReferenceException"></exception>
        public async Task<ProjectFileAm> ConvertProject(ProjectConverterAm projectConverter)
        {
            var par = _moduleService.Resolve<IModelBuilderParser>(projectConverter.ParserId);
            if(par == null)
                throw new ModelBuilderInvalidOperationException($"There is no parser with id: {projectConverter.ParserId}");

            var projectResult = await _projectService.UpdateProject(projectConverter.Project.Id, projectConverter.Project, _commonRepository.GetDomain());
            if(projectResult?.Project == null)
                throw new ModelBuilderNullReferenceException($"Couldn't save project with id: {projectConverter.Project.Id}");

            var bytes = await par.SerializeProject(projectResult.Project);
            var projectFile = new ProjectFileAm
            {
                FileContent = Encoding.UTF8.GetString(bytes),
                ParserId = projectConverter.ParserId,
                FileFormat = par.GetFileFormat()
            };

            return projectFile;
        }

        #endregion
    }
}
