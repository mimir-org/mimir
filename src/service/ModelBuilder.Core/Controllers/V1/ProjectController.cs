using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Project services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Project")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ILogger<ProjectController> _logger;
        private readonly IModuleService _moduleService;

        /// <summary>
        /// Project Controller Constructor
        /// </summary>
        /// <param name="projectService"></param>
        /// <param name="logger"></param>
        /// <param name="moduleService"></param>
        public ProjectController(IProjectService projectService, ILogger<ProjectController> logger, IModuleService moduleService)
        {
            _projectService = projectService;
            _logger = logger;
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
        public async Task<IActionResult> CreateNewProject([FromBody] CreateProject project)
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
        [ProducesResponseType(typeof(IEnumerable<ProjectSimple>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
        public async Task<IActionResult> GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("The id can not be null or empty");
            
            try
            {
                var data = await _projectService.GetProject(id);
                return Ok(data);
            }
            catch (ModelBuilderNotFoundException)
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
        /// Import a new project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        [HttpPost("import")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Project), StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ImportProject([FromBody] ProjectAm project)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _projectService.ImportProject(project);
                return Ok(data);
            }
            catch (ModelBuilderDuplicateException e)
            {
                return Conflict(e.Message);
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
        /// <param name="project"></param>
        /// <returns></returns>
        [HttpPost("update/{id}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Project), StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateProject(string id, [FromBody] ProjectAm project)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _projectService.UpdateProject(id, project);
                return Ok(data);
            }
            catch (ModelBuilderDuplicateException e)
            {
                return Conflict(e.Message);
            }
            catch (ModelBuilderNotFoundException e)
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
        public async Task<IActionResult> DeleteProject(string id)
        {
            try
            {
                await _projectService.DeleteProject(id);
                return Ok();
            }
            catch (ModelBuilderNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ModelBuilderInvalidOperationException e)
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
        public async Task<IActionResult> DownloadProject(string id, string parser)
        {
            try
            {
                var data = await _projectService.CreateFile(id, parser);
                return File(data, "application/json", $"project_{id}.json");
            }
            catch (ModelBuilderNotFoundException e)
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
        /// Upload a project from file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        [HttpPost("upload/{parser}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadProject(string parser, IFormFile file, CancellationToken cancellationToken)
        {
            try
            {
                if (!file.ValidateJsonFileExtension())
                    return BadRequest("Invalid file extension. The file must be a json file");

                var createdProject = await _projectService.CreateFromFile(file, cancellationToken, parser);
                return CreatedAtAction(nameof(GetById), new { id = createdProject.Id }, createdProject);
            }
            catch (ModelBuilderDuplicateException e)
            {
                return Conflict(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all registered parsers
        /// </summary>
        /// <returns></returns>
        [HttpGet("parser")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetParsers()
        {
            try
            {
                var data = _moduleService.ParserModules.Select(x => x.Key).ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
