using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1.TypeLibrary
{

    /// <summary>
    /// Common services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Enum")]
    public class EnumController : ControllerBase
    {
        private readonly ILogger<EnumController> _logger;
        private readonly ILibraryService _libraryService;

        public EnumController(ILogger<EnumController> logger, ILibraryService libraryService)
        {
            _logger = logger;
            _libraryService = libraryService;
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
        [Authorize(Policy = "Read")]
        public IActionResult GetAllEnumsOfType([FromRoute] EnumType enumType)
        {
            try
            {
                var data = _libraryService.GetAllOfType(enumType);
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all enums - location types
        /// </summary>
        /// <returns></returns>
        [HttpGet("location-types")]
        [ProducesResponseType(typeof(IEnumerable<LocationTypeAm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public IActionResult GetLocationTypes()
        {
            try
            {
                var data = _libraryService.GetAllLocationTypes().ToList();
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