using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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
        /// Get all library types
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(ICollection<LibraryType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetAllLibraryTypes()
        {
            try
            {
                var allTypes = _typeEditorService.GetAllTypes().ToList();
                return Ok(allTypes);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get statuses
        /// </summary>
        /// <returns></returns>
        [HttpGet("statuses")]
        [ProducesResponseType(typeof(Dictionary<int, string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetStatuses()
        {
            try
            {
                var data = _typeEditorService.GetStatuses();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get aspects
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
        /// Get object types
        /// </summary>
        /// <returns></returns>
        [HttpGet("objects")]
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
        /// Get RDS codes
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
                var data = _typeEditorService.GetPredefinedAttributes().ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get attribute types
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
        /// Get terminal types
        /// </summary>
        /// <returns></returns>
        [HttpGet("terminals")]
        [ProducesResponseType(typeof(ICollection<TerminalType>), StatusCodes.Status200OK)]
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
        /// Get terminal types by category
        /// </summary>
        /// <returns></returns>
        [HttpGet("terminalsByCategory")]
        [ProducesResponseType(typeof(Dictionary<string, TerminalType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult GetTerminalTypesByCategory()
        {
            try
            {
                var data = _typeEditorService.GetTerminalsByCategory().ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

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
                var createdAttribute = await _typeEditorService.CreateAttributeType(createAttributeType);
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

        /// <summary>
        /// Create a terminal type
        /// </summary>
        /// <param name="createTerminalType"></param>
        /// <returns></returns>
        [HttpPost("terminal")]
        [ProducesResponseType(typeof(AttributeType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateTerminalType([FromBody] CreateTerminalType createTerminalType)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdTerminalType = await _typeEditorService.CreateTerminalType(createTerminalType);
                if (createdTerminalType == null)
                    return BadRequest("The terminal type already exist");

                return Ok(createdTerminalType);
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
        /// <param name="libraryType"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(LibraryType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateLibraryType([FromBody] CreateLibraryType libraryType)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _typeEditorService.CreateLibraryType(libraryType);
                return Ok(data);
            }
            catch (ModelBuilderDuplicateException e)
            {
                ModelState.AddModelError("Duplicate", e.Message);
                return BadRequest(ModelState);
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
    }
}
