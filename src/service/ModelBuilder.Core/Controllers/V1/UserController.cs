using System;
using System.Linq;
using System.Security.Claims;
using Mb.Models.Application;
using Mb.Models.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// User services
    /// </summary>
    [Produces("application/json")]
    [Authorize]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("User Service")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<CommitController> _logger;

        public UserController(ILogger<CommitController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Get current user data
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(IActionResult), StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult GetUserData()
        {
            try
            {
                var roles = User.Claims.Where(x => x.Type == ClaimsIdentity.DefaultRoleClaimType);
                var user = new UserData
                {
                    Name = User.Identity?.Name,
                    Email = string.Empty,
                    Roles = roles.Select(x => x.Value.ResolveNameFromRoleClaim()).ToList()
                };

                return Ok(user);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
