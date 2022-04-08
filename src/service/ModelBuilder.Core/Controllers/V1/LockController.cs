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
        /// <param name="contextAccessor"></param>
        public LockController(ILockService lockService, ILogger<LockController> logger)
        {
            _lockService = lockService;
            _logger = logger;
        }

        /// <summary>
        /// Returns a list of all locked attributes id's
        /// If param 'projectId' is null all locked attributes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked attribute id></returns>
        [HttpGet("attribute")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLockedAttributes(string projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _lockService.GetLockedAttributes(projectId).ToList();
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
        /// If param 'projectId' is null all locked edges in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked edges id></returns>
        [HttpGet("edge")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLockedEdges(string projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _lockService.GetLockedEdges(projectId).ToList();
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
        /// <param name="projectId"></param>
        /// <returns>List of locked node id></returns>
        [HttpGet("node")]
        [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLockedNodes(string projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _lockService.GetLockedNodes(projectId).ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Locks or unlock an attribute
        /// </summary>
        /// <param name="lockAttributeAm"></param>
        /// <returns>Status204NoContent</returns>
        [HttpPost("attribute")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> LockAttribute([FromBody] LockAttributeAm lockAttributeAm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _lockService.LockAttribute(lockAttributeAm);
                return NoContent();
            }
            catch (ModelBuilderUnauthorizedAccessException e)
            {
                ModelState.AddModelError("attribute/lock", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Locks or unlock an Edge (transport or interface)
        /// </summary>
        /// <param name="lockEdgeAm"></param>
        /// <returns>Status204NoContent</returns>
        [HttpPost("edge")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> LockEdge([FromBody] LockEdgeAm lockEdgeAm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _lockService.LockEdge(lockEdgeAm);
                return NoContent();
            }
            catch (ModelBuilderUnauthorizedAccessException e)
            {
                ModelState.AddModelError("attribute/lock", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Locks or unlocks a node (including all attributes on the node) and all children nodes and attributes
        /// </summary>
        /// <param name="lockNodeAm"></param>
        /// <returns>Status204NoContent</returns>
        [HttpPost("node")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Edit")]
        public async Task<IActionResult> LockNode([FromBody] LockNodeAm lockNodeAm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _lockService.LockNode(lockNodeAm);
                return NoContent();
            }
            catch (ModelBuilderUnauthorizedAccessException e)
            {
                ModelState.AddModelError("node/lock", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}