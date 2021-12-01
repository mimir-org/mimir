﻿using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Const;
using Mb.Models.Data;
using Mb.Models.Data.Hubs;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
        private readonly IHubContext<ModelBuilderHub> _hubContext;

        public CommitController(ILogger<CommitController> logger, IProjectService projectService, IHubContext<ModelBuilderHub> hubContext)
        {
            _logger = logger;
            _projectService = projectService;
            _hubContext = hubContext;
        }

        /// <summary>
        /// Commit a package
        /// </summary>
        /// <param name="package"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(IActionResult), StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> CommitProject(CommitPackage package)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _projectService.CommitProject(package);
                return NoContent();
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

        /// <summary>
        /// Test
        /// </summary>
        /// <returns></returns>
        [HttpGet("test")]
        [ProducesResponseType(typeof(IActionResult), StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> TestSendData()
        {
            try
            {
                var roles = User?.Claims.Where(x => x.Type == ClaimsIdentity.DefaultRoleClaimType);
                await _hubContext.Clients.All.SendAsync(WebSocketReceiver.ReceiveNodeData, WorkerStatus.Update, new Node {Id = "Tester"});
                await _hubContext.Clients.All.SendAsync(WebSocketReceiver.ReceiveEdgeData, WorkerStatus.Update, new Edge {Id = "Tester edge"});
                return NoContent();
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
