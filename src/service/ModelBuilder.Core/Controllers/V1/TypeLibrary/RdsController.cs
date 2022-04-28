using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data.TypeEditor;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1.TypeLibrary
{
    /// <summary>
    /// Rds services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Rds")]
    public class RdsController : ControllerBase
    {
        private readonly ILogger<RdsController> _logger;
        private readonly ILibraryService _libraryService;

        public RdsController(ILogger<RdsController> logger, ILibraryService libraryService)
        {
            _logger = logger;
            _libraryService = libraryService;
        }

        #region Get

        /// <summary>
        /// Get all RDS entities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Rds>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetAllRds()
        {
            try
            {
                var data = await _libraryService.GetRds();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        #endregion
    }
}