using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
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
        /// Get RDS codes for aspect
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        [HttpGet("rds/{aspect}")]
        [ProducesResponseType(typeof(ICollection<Rds>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetRdsCodes(Aspect aspect)
        {
            try
            {
                var data = _typeEditorService.GetRds(aspect).ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get attribute types for aspect
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        [HttpGet("attributes/{aspect}")]
        [ProducesResponseType(typeof(ICollection<AttributeType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetAttributeTypes(Aspect aspect)
        {
            try
            {
                var data = _typeEditorService.GetAttributeTypes(aspect).ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all terminal types
        /// </summary>
        /// <returns></returns>
        [HttpGet("terminals")]
        [ProducesResponseType(typeof(ICollection<Terminal>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetTerminalTypes()
        {
            try
            {
                var data = _typeEditorService.GetTerminals().ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Create a library type
        /// </summary>
        /// <param name="libraryTypeComponent"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(ICollection<Rds>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateType([FromBody] LibraryTypeComponent libraryTypeComponent)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _typeEditorService.CreateLibraryComponent(libraryTypeComponent);
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Export to file
        /// </summary>
        /// <returns></returns>
        [HttpGet("export")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ExportTypes()
        {
            try
            {
                var data = _typeEditorService.CreateFile();
                return File(data, "application/json", "types.json");
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Import from file
        /// </summary>
        /// <returns></returns>
        [HttpPost("import")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ImportTypes(IFormFile file, CancellationToken cancellationToken)
        {
            try
            {
                if (!file.ValidateJsonFileExtension())
                    return BadRequest("Invalid file extension. The file must be a json file");

                await _typeEditorService.LoadDataFromFile(file, cancellationToken);
                return Ok(true);
            }
            catch (ModelBuilderDuplicateException e)
            {
                return Conflict(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Delete a type
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteType(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("The id could not be null or empty");

            try
            {
                await _typeEditorService.DeleteType(id);
                return Ok(true);
            }
            catch (ModelBuilderNotFoundException e)
            {
                return NotFound(e);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
