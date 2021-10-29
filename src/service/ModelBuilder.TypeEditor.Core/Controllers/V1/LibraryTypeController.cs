using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.TypeEditor.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

// ReSharper disable StringLiteralTypo
namespace Mb.TypeEditor.Core.Controllers.V1
{
    /// <summary>
    /// Library type services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("LibraryType")]
    public class LibraryTypeController : ControllerBase
    {
        private readonly ILogger<LibraryTypeController> _logger;
        private readonly ILibraryTypeService _libraryTypeService;

        public LibraryTypeController(ILogger<LibraryTypeController> logger, ILibraryTypeService libraryTypeService)
        {
            _logger = logger;
            _libraryTypeService = libraryTypeService;
        }

        #region Get

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
                var allTypes = _libraryTypeService.GetAllTypes().ToList();
                return Ok(allTypes);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get CreateLibraryType from LibraryTypeId
        /// </summary>
        /// <param name="id"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet("{id}/{filter}")]
        [ProducesResponseType(typeof(CreateLibraryType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateLibraryType([Required] string id, [Required] LibraryFilter filter)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _libraryTypeService.ConvertToCreateLibraryType(id, filter);
                return Ok(data);
            }
            catch (ModelBuilderNotFoundException e)
            {
                ModelState.AddModelError("Not found", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderInvalidOperationException e)
            {
                ModelState.AddModelError("Invalid value", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get all composite types
        /// </summary>
        /// <returns></returns>
        [HttpGet("compositeType")]
        [ProducesResponseType(typeof(IEnumerable<CompositeType>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetCompositeTypes()
        {
            try
            {
                var types = _libraryTypeService.GetCompositeTypes().ToList();
                return Ok(types);
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
                if (libraryType.Aspect == Aspect.Location)
                {
                    libraryType.ObjectType = ObjectType.ObjectBlock;
                }

                switch (libraryType.ObjectType)
                {
                    case ObjectType.ObjectBlock:
                        var ob = await _libraryTypeService.CreateLibraryType<LibraryNodeItem>(libraryType);
                        return Ok(ob);
                    case ObjectType.Transport:
                        var ln = await _libraryTypeService.CreateLibraryType<LibraryTransportItem>(libraryType);
                        return Ok(ln);
                    case ObjectType.Interface:
                        var libraryInterfaceItem =
                            await _libraryTypeService.CreateLibraryType<LibraryInterfaceItem>(libraryType);
                        return Ok(libraryInterfaceItem);
                    default:
                        throw new ModelBuilderInvalidOperationException(
                            $"Can't create type of: {libraryType.ObjectType}");
                }
            }
            catch (ModelBuilderDuplicateException e)
            {
                ModelState.AddModelError("Duplicate", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderNullReferenceException e)
            {
                ModelState.AddModelError("Duplicate", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderInvalidOperationException e)
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
        /// Update a library type
        /// </summary>
        /// <param name="id"></param>
        /// <param name="libraryType"></param>
        /// <param name="updateMajorVersion"></param>
        /// <param name="updateMinorVersion"></param>
        /// <returns></returns>
        [HttpPost("{id}")]
        [ProducesResponseType(typeof(LibraryType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateLibraryType(string id, [FromBody] CreateLibraryType libraryType, bool updateMajorVersion = false, bool updateMinorVersion = false)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                switch (libraryType.ObjectType)
                {
                    case ObjectType.ObjectBlock:
                        var ob = await _libraryTypeService.UpdateLibraryType<LibraryNodeItem>(id, libraryType, updateMajorVersion, updateMinorVersion);
                        return Ok(ob);
                    case ObjectType.Transport:
                        var ln = await _libraryTypeService.UpdateLibraryType<LibraryTransportItem>(id, libraryType, updateMajorVersion, updateMinorVersion);
                        return Ok(ln);
                    case ObjectType.Interface:
                        var libraryInterfaceItem =
                            await _libraryTypeService.UpdateLibraryType<LibraryInterfaceItem>(id, libraryType, updateMajorVersion, updateMinorVersion);
                        return Ok(libraryInterfaceItem);
                    default:
                        throw new ModelBuilderInvalidOperationException(
                            $"Can't create type of: {libraryType.ObjectType}");
                }
            }
            catch (ModelBuilderNullReferenceException e)
            {
                ModelState.AddModelError("Bad request", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderNotFoundException e)
            {
                ModelState.AddModelError("Bad request", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Create a simple type
        /// </summary>
        /// <returns></returns>
        [HttpPost("compositeType")]
        [ProducesResponseType(typeof(IEnumerable<LibraryType>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateCompositeType(CompositeTypeAm compositeType)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var createdType = await _libraryTypeService.CreateCompositeType(compositeType);
                return StatusCode(201, createdType);
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

        #endregion

        #region Delete

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
                await _libraryTypeService.DeleteType(id);
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

        #endregion
    }
}
