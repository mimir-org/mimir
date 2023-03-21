using System;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Services.Contracts;
using Mimirorg.Common.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Aspect object services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("AspectObject")]
    public class AspectObjectController : ControllerBase
    {
        private readonly IAspectObjectService _aspectObjectService;
        private readonly ILogger<ProjectController> _logger;

        /// <summary>
        /// Project Controller Constructor
        /// </summary>
        /// <param name="aspectObjectService"></param>
        /// <param name="logger"></param>
        public AspectObjectController(IAspectObjectService aspectObjectService, ILogger<ProjectController> logger)
        {
            _aspectObjectService = aspectObjectService;
            _logger = logger;
        }

        /// <summary>
        /// Get aspect object by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(AspectObjectCm), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("The id can not be null or empty");

            try
            {
                var data = await _aspectObjectService.Get(id);
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
}