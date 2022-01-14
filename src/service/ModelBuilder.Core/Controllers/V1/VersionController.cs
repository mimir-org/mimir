using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
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
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Version")]
    public class VersionController : ControllerBase
    {
        private readonly IVersionService _versionService;
        private readonly ILogger<ProjectController> _logger;

        /// <summary>
        /// Version controller
        /// </summary>
        /// <param name="versionService"></param>
        /// <param name="logger"></param>
        public VersionController(IVersionService versionService, ILogger<ProjectController> logger)
        {
            _versionService = versionService;
            _logger = logger;
        }

        /// <summary>
        /// Returns all
        /// </summary>
        /// <returns>List of VersionCm</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VersionCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllVersions()
        {
            try
            {
                var versionCmList = await _versionService.GetAllVersions();
                return Ok(versionCmList);
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
        /// Returns a VersionCm list of all versions for a specific type (param: version table 'typeId')
        /// </summary>
        /// <param name="typeId"></param>
        /// <returns>List of VersionCm</returns>
        [HttpGet("{typeId}")]
        [ProducesResponseType(typeof(IEnumerable<VersionCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllVersions(string typeId)
        {
            try
            {
                var versionCmList = await _versionService.GetAllVersions(typeId);
                return Ok(versionCmList);
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
        /// Returns a specific version of a Project
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Project</returns>
        [HttpGet("{id}/project")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProject(string id)
        {
            try
            {
                var project = await _versionService.GetProject(int.Parse(id));
                return Ok(project);
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
        /// Create a new version of an existing Project. Returns the created VersionCm
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>VersionCm</returns>
        [HttpPost("{projectId}")]
        [ProducesResponseType(typeof(VersionCm), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateVersion(string projectId)
        {
            try
            {
                var versionCm = await _versionService.CreateVersion(projectId);
                return Ok(versionCm);
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
        /// Delete a version. Returns 200OK
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Status200OK</returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteVersion(string id)
        {
            try
            {
                await _versionService.DeleteVersion(int.Parse(id));
                return Ok();
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
    }
}