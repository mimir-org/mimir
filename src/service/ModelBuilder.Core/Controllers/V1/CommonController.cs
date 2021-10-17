using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Common services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Common")]
    public class CommonController : ControllerBase
    {
        private readonly ILogger<CommonController> _logger;
        private readonly ICommonService _commonService;

        public CommonController(ICommonService commonService, ILogger<CommonController> logger)
        {
            _commonService = commonService;
            _logger = logger;
        }

        /// <summary>
        /// Get all contractors
        /// </summary>
        /// <returns></returns>
        [HttpGet("contractors")]
        [ProducesResponseType(typeof(ICollection<Contractor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetContractors()
        {
            try
            {
                var data = _commonService.GetAllContractors().ToList();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Returns a list of all combined attributes
        /// </summary>
        /// <returns>List of combined attributes></returns>
        [HttpGet("attribute-filter")]
        [ProducesResponseType(typeof(ICollection<CombinedAttributeFilter>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetCombinedAttributes()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _commonService.GetAllCombinedAttributeFilters().ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}