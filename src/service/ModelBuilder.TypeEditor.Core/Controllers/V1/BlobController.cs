using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Application.Mimir;
using Mb.Models.Data.TypeEditor;
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
    public class BlobController : ControllerBase
    {
        private readonly ILogger<BlobController> _logger;
        private readonly IBlobDataService _blobDataService;

        public BlobController(ILogger<BlobController> logger, IBlobDataService blobDataService)
        {
            _logger = logger;
            _blobDataService = blobDataService;
        }

        #region Get
        
        /// <summary>
        /// Get blob data from category
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(ICollection<BlobDataAm>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetBlobData()
        {
            try
            {
                var blobs = _blobDataService.GetBlobData().ToList();
                return Ok(blobs);
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
        /// Create a new blob data object
        /// </summary>
        /// <param name="blobData"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(BlobData), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateOrUpdateBlob([FromBody] BlobDataAm blobData)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdBlob = await _blobDataService.CreateBlobData(blobData);
                return StatusCode(201, createdBlob);
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
