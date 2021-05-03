using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Core.Services;
using Mb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Api.Controllers.V1
{
    /// <summary>
    /// Type editor services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("TypeEditor")]
    public class TypeEditorController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly ITypeEditorService _typeEditorService;
        
        public TypeEditorController(ILogger<ProjectController> logger, ITypeEditorService typeEditorService)
        {
            _logger = logger;
            _typeEditorService = typeEditorService;
        }

        /// <summary>
        /// Get all aspects
        /// </summary>
        /// <returns></returns>
        [HttpGet("aspects")]
        [ProducesResponseType(typeof(Dictionary<int, string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAspects()
        {
            try
            {
                var data = _typeEditorService.GetAspects();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all object types
        /// </summary>
        /// <returns></returns>
        [HttpGet("types")]
        [ProducesResponseType(typeof(Dictionary<int, string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetObjectTypes()
        {
            try
            {
                var data = _typeEditorService.GetObjectTypes();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all RDS codes
        /// </summary>
        /// <returns></returns>
        [HttpGet("rds")]
        [ProducesResponseType(typeof(ICollection<Rds>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetRdsCodes()
        {
            try
            {
                var data = _typeEditorService.GetRds().ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all attribute types
        /// </summary>
        /// <returns></returns>
        [HttpGet("attributes")]
        [ProducesResponseType(typeof(ICollection<Rds>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAttributeTypes()
        {
            try
            {
                var data = _typeEditorService.GetAttributeTypes().ToList();
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
