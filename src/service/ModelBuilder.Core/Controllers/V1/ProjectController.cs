using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Data;
using Mimirorg.Common.Exceptions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using Mb.Models.Application;
using Mb.Models.Client;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Project services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Project")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ILogger<ProjectController> _logger;
        private readonly IProjectFileService _projectFileService;
        private readonly ICommonRepository _commonRepository;
        private readonly IModuleService _moduleService;

        /// <summary>
        /// Project Controller Constructor
        /// </summary>
        /// <param name="projectService"></param>
        /// <param name="logger"></param>
        /// <param name="projectFileService"></param>
        /// <param name="commonRepository"></param>
        /// <param name="moduleService"></param>
        public ProjectController(IProjectService projectService, ILogger<ProjectController> logger,
            IProjectFileService projectFileService, ICommonRepository commonRepository, IModuleService moduleService)
        {
            _projectService = projectService;
            _logger = logger;
            _projectFileService = projectFileService;
            _commonRepository = commonRepository;
            _moduleService = moduleService;
        }

        /// <summary>
        /// Create a new empty project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> CreateNewProject([FromBody] CreateProjectAm project)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdProject = await _projectService.CreateProject(project);
                return StatusCode(201, createdProject);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// List last 10 available projects by search on project the name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("search")]
        [ProducesResponseType(typeof(IEnumerable<ProjectItemCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public IActionResult GetBySearch(string name)
        {
            try
            {
                var data = _projectService.GetProjectList(name, 0, 10).ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get project by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("The id can not be null or empty");

            try
            {
                var data = await _projectService.GetProject(id, null);
                return Ok(data);
            }
            catch (MimirorgNotFoundException)
            {
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Convert project
        /// </summary>
        /// <param name="projectConverter"></param>
        /// <returns></returns>
        [HttpPost("convert")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> ConvertProject([FromBody] ProjectConverterAm projectConverter)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var project = await _projectFileService.ConvertProject(projectConverter);
                return Ok(project);
            }
            catch (MimirorgBadRequestException e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");

                foreach (var error in e.Errors().ToList())
                {
                    ModelState.Remove(error.Key);
                    ModelState.TryAddModelError(error.Key, error.Error);
                }

                return BadRequest(ModelState);
            }

            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Import a new project
        /// </summary>
        /// <param name="id"></param>
        /// <param name="projectAm"></param>
        /// <returns></returns>
        [HttpPost("update/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> UpdateProject(string id, [FromBody] ProjectAm projectAm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _projectService.UpdateProject(id, null, projectAm, _commonRepository.GetDomain());
                return Ok(null);
            }
            catch (MimirorgDuplicateException e)
            {
                return Conflict(e.Message);
            }
            catch (MimirorgNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Delete a project
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> DeleteProject(string id)
        {
            try
            {
                await _projectService.DeleteProject(id);
                return Ok();
            }
            catch (MimirorgNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (MimirorgInvalidOperationException e)
            {
                return StatusCode(500, e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Download a project to file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        [HttpGet("download/{id}/{parser}")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> DownloadProject(string id, string parser)
        {
            try
            {
                var (file, format) = await _projectService.CreateFile(id, new Guid(parser));
                return File(file, format.ContentType, $"project_{id}.{format.FileExtension}");
            }
            catch (ModelBuilderModuleException e)
            {
                ModelState.AddModelError("DownloadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (MimirorgNotFoundException e)
            {
                ModelState.AddModelError("DownloadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Upload a project from file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        [HttpPost("upload/{parser}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Edit")]
        [RequestSizeLimit(100_000_000)]
        public async Task<IActionResult> UploadProject(string parser, IFormFile file,
            CancellationToken cancellationToken)
        {
            try
            {
                var fileParser = _moduleService.Resolve<IModelBuilderParser>(new Guid(parser));
                var fileParserExtension = $".{fileParser.GetFileFormat().FileExtension}";
                var submissionFileExtension = Path.GetExtension(file.FileName);
                if (fileParserExtension != submissionFileExtension)
                    return BadRequest($"Invalid file extension. The file must be {fileParserExtension}");

                await _projectFileService.ImportProject(file, cancellationToken, new Guid(parser));
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (MimirorgBadRequestException e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");

                foreach (var error in e.Errors().ToList())
                {
                    ModelState.Remove(error.Key);
                    ModelState.TryAddModelError(error.Key, error.Error);
                }

                return BadRequest(ModelState);
            }
            catch (ModelBuilderModuleException e)
            {
                ModelState.AddModelError("UploadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (MimirorgDuplicateException e)
            {
                ModelState.AddModelError("UploadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}