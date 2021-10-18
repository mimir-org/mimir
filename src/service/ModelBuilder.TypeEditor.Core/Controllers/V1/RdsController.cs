﻿using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mb.TypeEditor.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.TypeEditor.Core.Controllers.V1
{
    /// <summary>
    /// Library file services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Attribute type services")]
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
        /// Get RDS codes
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        [HttpGet("{aspect}")]
        [ProducesResponseType(typeof(ICollection<Rds>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetRdsCodes(Aspect aspect)
        {
            try
            {
                var data = _rdsService.GetRds(aspect).ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        #endregion

        #region Post

        #endregion

        #region Delete



        #endregion
    }
}
