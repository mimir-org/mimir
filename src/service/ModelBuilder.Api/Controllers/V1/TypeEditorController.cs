using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Core.Models;
using Mb.Core.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Api.Controllers.V1
{
    /// <summary>
    /// Project services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Type Editor")]
    public class TypeEditorController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly IFileRepository _fileRepository;

        public TypeEditorController(ILogger<ProjectController> logger, IFileRepository fileRepository)
        {
            _logger = logger;
            _fileRepository = fileRepository;
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
                var data = _fileRepository.ReadFile<Rds>("RDS").ToList();
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
