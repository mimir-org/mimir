﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Data.Enums.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{

    /// <summary>
    /// Common services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Enum")]
    public class EnumController : ControllerBase
    {
        private readonly IEnumService _enumService;
        private readonly ILogger<EnumController> _logger;
        public EnumController(IEnumService enumService, ILogger<EnumController> logger)
        {
            _enumService = enumService;
            _logger = logger;
        }

        /// <summary>
        /// Create a new enum
        /// </summary>
        /// <param name="createEnum"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(EnumBase), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateNewEnum([FromBody] CreateEnum createEnum)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdEnum = await _enumService.CreateEnum(createEnum);
                return StatusCode(201, createdEnum);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all enums of given type
        /// </summary>
        /// <param name="enumType"></param>
        /// <returns></returns>
        [HttpGet("{enumType}")]
        [ProducesResponseType(typeof(IEnumerable<EnumBase>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllEnumsOfType([FromRoute]EnumType enumType)
        {
            try
            {
                var data = _enumService.GetAllOfType(enumType);
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