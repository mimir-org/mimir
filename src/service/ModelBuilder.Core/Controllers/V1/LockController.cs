using Mb.Models.Application;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mimirorg.Common.Exceptions;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mb.Core.Controllers.V1;

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
    /// Returns a list of all locked aspectObjects id's
    /// If param 'projectId' is null all locked aspectObjects in the database will be returned
    /// </summary>
    /// <returns>List of locked aspectObject id></returns>
    [HttpGet("aspectObject")]
    [ProducesResponseType(typeof(ICollection<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize(Policy = "Read")]
    public IActionResult GetLockedAspectObjects()
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var result = _lockService.GetLockedAspectObjects().ToList();
            return Ok(result);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    /// <summary>
    /// Locks or unlock an attribute, connection or aspectObject
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
        catch (MimirorgBadRequestException e)
        {
            ModelState.AddModelError("lock", e.Message);
            return BadRequest(ModelState);
        }
        catch (MimirorgUnauthorizedAccessException e)
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