using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;
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
    [ApiVersion("0.1")]
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
        /// Get all from library by search
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(ICollection<LibNode>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAll(string name)
        {
            try
            {

                return StatusCode(500, "Internal Server Error");
                var data = _libraryService.GetLibNodes(name).ToList();
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
