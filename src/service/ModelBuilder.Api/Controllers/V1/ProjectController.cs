using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
using Mb.Core.Services;
using Mb.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Api.Controllers.V1
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

        /// <summary>
        /// Project Controller Constructor
        /// </summary>
        public ProjectController(IProjectService projectService, ILogger<ProjectController> logger)
        {
            _projectService = projectService;
            _logger = logger;
        }

        /// <summary>
        /// Create a new empty project
        /// </summary>
        /// <returns></returns>
        [HttpGet("new/{name}/{description}")]
        [ProducesResponseType(typeof(ProjectAm), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateNewProject(string name, string description)
        {
            try
            {
                var data = await _projectService.CreateNewProject(name, description);
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// List all available projects
        /// </summary>
        /// <returns></returns>
        [HttpGet("search")]
        [ProducesResponseType(typeof(IEnumerable<ProjectSimpleAm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Get(string name)
        {
            try
            {
                var data = _projectService.GetProjectList();
                if (!string.IsNullOrEmpty(name))
                    data = data.Where(x => x.Name.ToLower().StartsWith(name.ToLower()));
                    
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get project by given id
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProjectAm), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(string id)
        {
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
        /// Save a project
        /// </summary>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(ProjectAm), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SaveProject([FromBody] ProjectAm project)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _projectService.CreateProject(project);
                return Ok(data);
            }
            catch (ModelBuilderDuplicateException)
            {
                return BadRequest("Can't create a duplicate project");
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
