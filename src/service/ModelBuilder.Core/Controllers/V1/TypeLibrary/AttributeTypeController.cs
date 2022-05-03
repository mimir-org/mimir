using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.TypeEditor;
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
    /// Library file services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Attribute type services")]
    public class AttributeTypeController : ControllerBase
    {
        private readonly ILogger<AttributeTypeController> _logger;
        private readonly ILibraryService _libraryService;

        public AttributeTypeController(ILogger<AttributeTypeController> logger, ILibraryService libraryService)
        {
            _logger = logger;
            _libraryService = libraryService;
        }

        #region Get

        /// <summary>
        /// Get all attribute types by aspect.
        /// If aspect is NotSet, all attribute types will be returned
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        [HttpGet("{aspect}")]
        [ProducesResponseType(typeof(ICollection<AttributeType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetAttributeTypes(Aspect aspect)
        {
            try
            {
                var data = await _libraryService.GetAttributeTypes(aspect);
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get predefined attributes
        /// </summary>
        /// <returns></returns>
        [HttpGet("predefined-attributes")]
        [ProducesResponseType(typeof(ICollection<PredefinedAttributeAm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetPredefinedAttributes()
        {
            try
            {
                var data = await _libraryService.GetPredefinedAttributes();
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