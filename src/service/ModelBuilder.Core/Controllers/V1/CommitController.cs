﻿using System;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Commit services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Commit")]
    public class CommitController : ControllerBase
    {
        private readonly ILogger<CommitController> _logger;
        private readonly IProjectService _projectService;

        public CommitController(ILogger<CommitController> logger, IProjectService projectService)
        {
            _logger = logger;
            _projectService = projectService;
        }

        /// <summary>
        /// Commit a package
        /// </summary>
        /// <param name="package"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(IActionResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CommitProject(CommitPackage package)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _projectService.CommitProject(package);
                return Ok(null);
            }
            catch (ModelBuilderNotFoundException e)
            {
                ModelState.AddModelError("CommitProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderModuleException e)
            {
                ModelState.AddModelError("CommitProject", e.Message);
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
