using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Data.TypeEditor;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

// ReSharper disable StringLiteralTypo

namespace Mb.Core.Controllers.V1.TypeLibrary
{
    /// <summary>
    /// Terminal type services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("TerminalType")]
    public class TerminalTypeController : ControllerBase
    {
        private readonly ILogger<TerminalTypeController> _logger;
        private readonly ILibraryService _libraryService;

        public TerminalTypeController(ILogger<TerminalTypeController> logger, ILibraryService libraryService)
        {
            _logger = logger;
            _libraryService = libraryService;
        }

        /// <summary>
        /// Get terminal types
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(ICollection<TerminalType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetTerminalTypes()
        {
            try
            {
                var data = await _libraryService.GetTerminals();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get categorized terminals
        /// </summary>
        /// <returns></returns>
        [HttpGet("category")]
        [ProducesResponseType(typeof(Dictionary<string, TerminalType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Policy = "Read")]
        public IActionResult GetTerminalTypesByCategory()
        {
            try
            {
                var data = _libraryService.GetTerminalsByCategory().ToList();
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