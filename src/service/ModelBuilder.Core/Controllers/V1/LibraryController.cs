using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Common;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mimirorg.TypeLibrary.Models.Client;
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

        public LibraryController(ILogger<ProjectController> logger, ILibraryService libraryService)
        {
            _logger = logger;
            _libraryService = libraryService;
        }

        /// <summary>
        /// Get all node types
        /// </summary>
        /// <returns></returns>
        [HttpGet("node")]
        [ProducesResponseType(typeof(ICollection<NodeLibCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetNodes()
        {
            try
            {
                var data = await _libraryService.GetNodeTypes(null);
                return Ok(data);
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
        [ProducesResponseType(typeof(ICollection<LibrarySubProjectVersion>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetSubProjects()
        {
            try
            {
                var subProjects = await _libraryService.GetSubProjects();
                return Ok(subProjects);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all connectorTerminal types
        /// </summary>
        /// <returns></returns>
        [HttpGet("connectorTerminal")]
        [ProducesResponseType(typeof(ICollection<TerminalLibCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetTerminals()
        {
            try
            {
                var data = await _libraryService.GetTerminalTypes();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all connectorTerminal types
        /// </summary>
        /// <returns></returns>
        [HttpGet("attribute")]
        [ProducesResponseType(typeof(ICollection<AttributeLibCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetAttributes()
        {
            try
            {
                var data = await _libraryService.GetAttributeTypes();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all quantity datum types
        /// </summary>
        /// <returns></returns>
        [HttpGet("quantity-datums")]
        [ProducesResponseType(typeof(ICollection<QuantityDatumCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetQuantityDatums()
        {
            try
            {
                var data = await _libraryService.GetQuantityDatums();
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