using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Data;
using Mb.Models.Settings;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Annotations;
using Mb.Models.Client;
using Mimirorg.TypeLibrary.Models.Client;
using Mimirorg.TypeLibrary.Models.Common;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Common services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Common")]
    public class CommonController : ControllerBase
    {
        private readonly ILogger<CommonController> _logger;
        private readonly ICommonService _commonService;
        private readonly IModuleService _moduleService;
        private readonly ICacheRepository _cacheRepository;
        private readonly ApplicationSetting _applicationSetting;

        public CommonController(ICommonService commonService, ILogger<CommonController> logger, IModuleService moduleService, ICacheRepository cacheRepository, IOptions<ApplicationSetting> applicationSetting)
        {
            _commonService = commonService;
            _logger = logger;
            _moduleService = moduleService;
            _cacheRepository = cacheRepository;
            _applicationSetting = applicationSetting?.Value;
        }

        /// <summary>
        /// Get all companies
        /// </summary>
        /// <returns></returns>
        [HttpGet("company")]
        [ProducesResponseType(typeof(ICollection<MimirorgCompanyCm>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetCompanies()
        {
            try
            {
                var data = await _commonService.GetAllCompanies();
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get current company
        /// </summary>
        /// <returns></returns>
        [HttpGet("company/current")]
        [ProducesResponseType(typeof(MimirorgCompanyCm), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Policy = "Read")]
        public async Task<IActionResult> GetCurrentCompany()
        {
            try
            {
                var data = await _commonService.GetCurrentCompany();
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
        [Authorize(Policy = "Read")]
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

        /// <summary>
        /// Get all registered parsers
        /// </summary>
        /// <returns></returns>
        [HttpGet("parser")]
        [ProducesResponseType(typeof(ICollection<ModuleDescription>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Policy = "Read")]
        public IActionResult GetParsers()
        {
            try
            {
                var data = _moduleService.Modules
                    .Where(x => x.Instance is IModelBuilderParser)
                    .Select(x => x.ModuleDescription)
                    .ToList();

                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Invalidate cache
        /// </summary>
        /// <returns>No content</returns>
        [HttpPost("cache/invalidate")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [AllowAnonymous]
        public async Task<IActionResult> InvalidateCache([FromBody] CacheInvalidation cacheInvalidation)
        {
            try
            {
                if (cacheInvalidation == null || string.IsNullOrWhiteSpace(cacheInvalidation.Secret) ||
                    _applicationSetting == null || string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret))
                    return new ForbidResult();

                if (!cacheInvalidation.Secret.Equals(_applicationSetting.TypeLibrarySecret))
                    return new ForbidResult();

                await _cacheRepository.DeleteCacheAsync(cacheInvalidation.Key.ToString());
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}