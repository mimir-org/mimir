using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
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
    public class AttributeTypeController : ControllerBase
    {
        private readonly ILogger<AttributeTypeController> _logger;
        private readonly IAttributeTypeService _attributeTypeService;

        public AttributeTypeController(ILogger<AttributeTypeController> logger, IAttributeTypeService attributeTypeService)
        {
            _logger = logger;
            _attributeTypeService = attributeTypeService;
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
        public IActionResult GetAttributeTypes(Aspect aspect)
        {
            try
            {
                var data = _attributeTypeService.GetAttributeTypes(aspect).ToList();
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
        public IActionResult GetPredefinedAttributes()
        {
            try
            {
                var data = _attributeTypeService.GetPredefinedAttributes().ToList();
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

        /// <summary>
        /// Create an attribute type
        /// </summary>
        /// <param name="createAttributeType"></param>
        /// <returns></returns>
        [HttpPost("attribute")]
        [ProducesResponseType(typeof(AttributeType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateAttributeType([FromBody] CreateAttributeType createAttributeType)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdAttribute = await _attributeTypeService.CreateAttributeType(createAttributeType);
                if (createdAttribute == null)
                    return BadRequest("The attribute already exist");

                return Ok(createdAttribute);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        #endregion

        #region Delete



        #endregion
    }
}
