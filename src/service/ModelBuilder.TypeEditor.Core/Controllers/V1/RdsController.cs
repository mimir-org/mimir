using System;
using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.TypeEditor.Core.Controllers.V1
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
        private readonly IRdsService _rdsService;

        public RdsController(ILogger<RdsController> logger, IRdsService rdsService)
        {
            _logger = logger;
            _rdsService = rdsService;
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
        public IActionResult GetAllRds()
        {
            try
            {
                var data = _rdsService.GetRds();
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