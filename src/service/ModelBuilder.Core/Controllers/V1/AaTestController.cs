﻿using Mb.Models.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Mb.Services.Contracts;

namespace Mb.Core.Controllers.V1
{
    /// <summary>
    /// Common services
    /// </summary>
    [Produces("application/json")]
    [ApiController]
    [ApiVersion("0.1")]
    [Route("V{version:apiVersion}/[controller]")]
    [SwaggerTag("Markus' Super Quick Testing")]
    public class AaTestController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ILogger<AaTestController> _logger;

        public AaTestController(IProjectService projectService, ILogger<AaTestController> logger)
        {
            _projectService = projectService;
            _logger = logger;
        }

        /// <summary>
        /// Get project by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("The id can not be null or empty");

            try
            {
                var data = await _projectService.GetProject(id);
                return Ok(data);
            }
            catch (ModelBuilderNotFoundException)
            {
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Upload a project from file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        [HttpPost("testupload")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadProject(IFormFile file, CancellationToken cancellationToken)
        {

            var parser = "rdfparser";

            try
            {
                if (!file.ValidateJsonFile())
                    return BadRequest("Invalid file extension. The file must be a json file");

                var createdProject = await _projectService.CreateFromFile(file, cancellationToken, parser);
                return CreatedAtAction(nameof(GetById), new { id = createdProject.Id }, createdProject);
            }
            catch (ModelBuilderModuleException e)
            {
                ModelState.AddModelError("UploadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderDuplicateException e)
            {
                ModelState.AddModelError("UploadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Download a project to file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        [HttpGet("Download Mimir built project")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DownloadProject()
        {
            try
            {
                var id = "equinor.com_385834d5-1c1e-4ec2-9865-4f232b38966d";
                var parser = "rdfparser";

                var (file, format) = await _projectService.CreateFile(id, parser);
                return File(file, format.ContentType, $"project_{id}.{format.FileExtension}");
            }
            catch (ModelBuilderModuleException e)
            {
                ModelState.AddModelError("DownloadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderNotFoundException e)
            {
                ModelState.AddModelError("DownloadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Download a project to file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="parser"></param>
        /// <returns></returns>
        [HttpGet("download project imported as rdf")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DownloadProject2()
        {
            try
            {
                var id = "equinor.com_mimirID16857111-7c79-45f2-b2d9-b9d67e52ca9e";
                var parser = "rdfparser";

                var (file, format) = await _projectService.CreateFile(id, parser);
                return File(file, format.ContentType, $"project_{id}.{format.FileExtension}");
            }
            catch (ModelBuilderModuleException e)
            {
                ModelState.AddModelError("DownloadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (ModelBuilderNotFoundException e)
            {
                ModelState.AddModelError("DownloadProject", e.Message);
                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Internal Server Error: Error: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}