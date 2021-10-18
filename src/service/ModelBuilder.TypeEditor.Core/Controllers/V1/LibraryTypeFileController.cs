﻿using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
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
    [SwaggerTag("Library type file services")]
    public class LibraryTypeFileController : ControllerBase
    {
        private readonly ILogger<LibraryTypeFileController> _logger;
        private readonly ILibraryTypeFileService _libraryTypeFileService;

        public LibraryTypeFileController(ILogger<LibraryTypeFileController> logger, ILibraryTypeFileService libraryTypeFileService)
        {
            _logger = logger;
            _libraryTypeFileService = libraryTypeFileService;
        }

        #region Get

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
                var data = _libraryTypeFileService.CreateFile();
                return File(data, "application/json", "types.json");
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
        /// Import from file
        /// </summary>
        /// <returns></returns>
        [HttpPost("import")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadTypes(IFormFile file, CancellationToken cancellationToken)
        {
            try
            {
                if (!file.ValidateJsonFile())
                    return BadRequest("Invalid file extension. The file must be a json file");

                await _libraryTypeFileService.LoadDataFromFile(file, cancellationToken);
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

        #endregion

        #region Delete



        #endregion
    }
}