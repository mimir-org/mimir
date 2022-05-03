using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Library services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Library")]
    public class LibraryController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly ILibraryService _libraryService;
        private readonly ILibraryRepository _libRepository;

        public LibraryController(ILogger<ProjectController> logger, ILibraryService libraryService,
            ILibraryRepository libRepository)
        {
            _logger = logger;
            _libraryService = libraryService;
            _libRepository = libRepository;
        }

        /// <summary>
        /// Get all library data by search
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(Library), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetAll(string name)
        {
            try
            {
                var data = await _libraryService.GetLibTypes(name);
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Get all node types
        /// </summary>
        /// <returns></returns>
        [HttpGet("node")]
        [ProducesResponseType(typeof(ICollection<LibraryNodeItem>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetNodes()
        {
            try
            {
                var data = await _libraryService.GetNodeTypes(null);
                return Ok(data.ToList());
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get transport types
        /// </summary>
        /// <returns></returns>
        [HttpGet("transport")]
        [ProducesResponseType(typeof(ICollection<LibraryTransportItem>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetTransports()
        {
            try
            {
                var transportTypes = await _libraryService.GetTransportTypes(null);
                return Ok(transportTypes.ToList());
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get interface types
        /// </summary>
        /// <returns></returns>
        [HttpGet("interface")]
        [ProducesResponseType(typeof(ICollection<LibraryInterfaceItem>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetInterfaces()
        {
            try
            {
                var interfaceTypes = await _libraryService.GetInterfaceTypes(null);
                return Ok(interfaceTypes.ToList());
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get subProjects
        /// </summary>
        /// <returns></returns>
        [HttpGet("subProject")]
        [ProducesResponseType(typeof(ICollection<LibrarySubProjectItem>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetSubProjects()
        {
            try
            {
                var subProjects = await _libraryService.GetSubProjects();
                return Ok(subProjects.ToList());
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}