using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Application;
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
    [SwaggerTag("Lock")]
    public class LockController : ControllerBase
    {
        private readonly ILockService _lockService;
        private readonly ILogger<LockController> _logger;

        /// <summary>
        /// Lock Controller Constructor
        /// </summary>
        /// <param name="lockService"></param>
        /// <param name="logger"></param>
        public LockController(ILockService lockService, ILogger<LockController> logger)
        {
            _lockService = lockService;
            _logger = logger;
        }

        /// <summary>
        /// Returns a list of all locked attributes id's
        /// </summary>
        /// <returns>List of locked attribute id></returns>
        [HttpGet("attribute")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLockedAttributes()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _lockService.GetLockedAttributes().ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Returns a list of all locked edges id's
        /// </summary>
        /// <returns>List of locked edges id></returns>
        [HttpGet("edge")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLockedEdges()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _lockService.GetLockedEdges().ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Returns a list of all locked nodes id's
        /// If param 'projectId' is null all locked nodes in the database will be returned
        /// </summary>
        /// <returns>List of locked node id></returns>
        [HttpGet("node")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLockedNodes()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _lockService.GetLockedNodes().ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Locks or unlock an attribute, edge or node
        /// </summary>
        /// <param name="lockAm"></param>
        /// <returns>Status204NoContent</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> Lock([FromBody] LockAm lockAm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _lockService.Lock(lockAm);
                return NoContent();
            }
            catch (ModelBuilderBadRequestException e)
            {
                ModelState.AddModelError("lock", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderUnauthorizedAccessException e)
            {
                ModelState.AddModelError("lock", e.Message);
                return Unauthorized(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}