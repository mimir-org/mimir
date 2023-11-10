using System;
using System.Linq;
using System.Threading.Tasks;
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

namespace Mb.Core.Controllers.V1;

/// <summary>
/// Project services
/// </summary>
[Produces("application/json")]
[Authorize]
[ApiController]
[ApiVersion("1.0")]
[Route("V{version:apiVersion}/[controller]")]
[SwaggerTag("SubProject")]
public class SubProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly ILogger<ProjectController> _logger;

    /// <summary>
    /// Project Controller Constructor
    /// </summary>
    /// <param name="projectService"></param>
    /// <param name="logger"></param>
    public SubProjectController(IProjectService projectService, ILogger<ProjectController> logger)
    {
        _projectService = projectService;
        _logger = logger;
    }

    /// <summary>
    /// Create a new subProject
    /// </summary>
    /// <param name="subProjectAm"></param>
    /// <returns></returns>
    [HttpPost("")]
    [ProducesResponseType(typeof(Project), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Policy = "Edit")]
    public async Task<IActionResult> CreateSubProject([FromBody] SubProjectAm subProjectAm)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var createdSubProject = await _projectService.CreateSubProject(subProjectAm);
            return StatusCode(201, createdSubProject);
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
    /// Convert sun project status
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>No content</returns>
    [HttpPost("convert")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Policy = "Edit")]
    public async Task<IActionResult> ConvertProject([FromBody] Guid projectId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _projectService.ConvertSubProject(projectId);
            return NoContent();
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    /// <summary>
    /// Get a sub project by id
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
    public async Task<IActionResult> GetSubProject(Guid id)
    {
        if (id == Guid.Empty)
            return BadRequest("The id can not be null or empty");

        try
        {
            var data = await _projectService.GetById(id);

            if (data is { SubProject: false })
                return BadRequest("This is not a subProject");

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
    /// Clone a sub-project and prepare sub-project for merging into another project
    /// </summary>
    /// <param name="prepare">The prepare project data</param>
    /// <returns></returns>
    [HttpPost("prepare")]
    [ProducesResponseType(typeof(PrepareCm), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize(Policy = "Read")]
    public async Task<IActionResult> PrepareForMerge([FromBody] PrepareAm prepare)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var data = await _projectService.PrepareForMerge(prepare);
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
}