using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mimirorg.Common.Exceptions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Mimirorg.Common.Extensions;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;

namespace Mb.Services.Services;

public class ProjectFileService : IProjectFileService
{
    private readonly IModuleService _moduleService;
    private readonly IProjectService _projectService;
    private readonly IProjectRepository _projectRepository;

    #region Constructors

    public ProjectFileService(IModuleService moduleService, IProjectService projectService, IProjectRepository projectRepository)
    {
        _moduleService = moduleService;
        _projectService = projectService;
        _projectRepository = projectRepository;
    }

    #endregion

    #region Public methods

    /// <summary>
    /// Resolve project from project file
    /// </summary>
    /// <param name="projectFile"></param>
    /// <returns></returns>
    /// <exception cref="MimirorgInvalidOperationException"></exception>
    /// <exception cref="MimirorgBadRequestException"></exception>
    /// <exception cref="ModelBuilderModuleException"></exception>
    public async Task<ProjectRequest> ResolveProject(ProjectConvertResponse projectFile)
    {
        if (projectFile == null)
            throw new MimirorgInvalidOperationException("ProjectFile is null");

        var validation = projectFile.ValidateObject();
        if (!validation.IsValid)
            throw new MimirorgBadRequestException("Couldn't resolve project, the ProjectFile is not valid.", validation);

        if (projectFile.ParserId == Guid.Empty)
        {
            throw new MimirorgBadRequestException("The Id must be in Guid format.");
        }

        //if (_moduleService.Modules.All(x =>
        //        x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty && !(x.ModuleDescription.Id == projectFile.ParserId),StringComparison.CurrentCultureIgnoreCase))
        //    throw new ModelBuilderModuleException($"There is no parser with key: {projectFile.ParserId}");



        var par = _moduleService.Resolve<IModelBuilderParser>(projectFile.ParserId);
        var project = await par.DeserializeProjectAm(Encoding.UTF8.GetBytes(projectFile.FileContent));
        return project;
    }

    /// <summary>
    /// Import project, if exist update project
    /// </summary>
    /// <param name="file"></param>
    /// <param name="cancellationToken"></param>
    /// <param name="id"></param>
    /// <param name="fileFormat"></param>
    /// <returns></returns>
    /// <exception cref="ModelBuilderModuleException"></exception>
    public async Task ImportProject(IFormFile file, CancellationToken cancellationToken, Guid id, FileFormat fileFormat)
    {
        await using var stream = new MemoryStream();
        await file.CopyToAsync(stream, cancellationToken);
        var fileContent = Encoding.UTF8.GetString(stream.ToArray());
        await ImportProject(new ProjectConvertResponse { ParserId = id, FileContent = fileContent, Filename = file.FileName, FileFormat = fileFormat });
    }

    /// <summary>
    /// Save and convert project
    /// </summary>
    /// <param name="projectConverter"></param>
    /// <returns></returns>
    /// <exception cref="MimirorgInvalidOperationException"></exception>
    /// <exception cref="MimirorgNullReferenceException"></exception>
    public async Task<ProjectConvertResponse> ConvertProject(ProjectConvertRequest projectConverter)
    {
        if (projectConverter.ParserId == Guid.Empty)
        {
            throw new MimirorgInvalidOperationException("The Id must be in Non empty Guid format.");
        }

        var par = _moduleService.Resolve<IModelBuilderParser>(projectConverter.ParserId);
        if (par == null)
            throw new MimirorgInvalidOperationException($"There is no parser with id: {projectConverter.ParserId}");

        await _projectService.Create(projectConverter.Project); // create or update here?

        var project = await _projectRepository.GetAsyncComplete(projectConverter.Project.Id);

        if (project == null)
            throw new MimirorgNullReferenceException($"Couldn't save project with id: {projectConverter.Project.Id}");

        var bytes = await par.SerializeProject(project);
        var projectFile = new ProjectConvertResponse
        {
            FileContent = Encoding.UTF8.GetString(bytes),
            ParserId = projectConverter.ParserId,
            FileFormat = par.GetFileFormat()
        };

        return projectFile;
    }

    #endregion

    #region Private

    /// <summary>
    /// Import project, if exist update project
    /// </summary>
    /// <param name="projectFile"></param>
    /// <returns></returns>
    /// <exception cref="MimirorgInvalidOperationException"></exception>
    private async Task ImportProject(ProjectConvertResponse projectFile)
    {
        if (projectFile == null)
            throw new MimirorgInvalidOperationException("ProjectFile is null");

        var validation = projectFile.ValidateObject();
        if (!validation.IsValid)
            throw new MimirorgBadRequestException("Couldn't resolve project, the ProjectFile is not valid.",
                validation);

        var project = await ResolveProject(projectFile);

        if (project == null || ((project.Id != Guid.Empty)))
            throw new MimirorgInvalidOperationException(
                "You can't import an project that is null or missing id");

        var exist = _projectService.Exist(project.Id);

        if (!exist)
        {
            await _projectService.Create(project);
            return;
        }

        await _projectService.Update(project);
    }

    #endregion Private
}