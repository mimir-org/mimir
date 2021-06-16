using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Extensions;
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
        private readonly IFileRepository _fileRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ITerminalTypeRepository _terminalTypeRepository;

        public CommonController(ICommonService commonService, ILogger<CommonController> logger, IFileRepository fileRepository, IAttributeTypeRepository attributeTypeRepository, ITerminalTypeRepository terminalTypeRepository)
        {
            _commonService = commonService;
            _logger = logger;
            _fileRepository = fileRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _terminalTypeRepository = terminalTypeRepository;
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
                const string libraryFileName = "library";
                var fileList = _fileRepository.ReadJsonFileList().ToList();
                var libraryFiles = fileList.Where(x => x.ToLower().Contains(libraryFileName)).ToList();
                var libraries = _fileRepository.ReadAllFiles<OldLib>(libraryFiles).ToList();

                var newLibs = new List<CreateLibraryType>();

                var attributes = _attributeTypeRepository.GetAll()
                    .Include(x => x.Qualifier)
                    .Include(x => x.Condition)
                    .Include(x => x.Source)
                    .ToList();

                foreach (var lib in libraries)
                {
                    foreach (var attribute in lib.Attributes)
                    {
                        var newAttributes = attributes.Where(x =>
                            x.Condition.Name == attribute.Condition.ToString() &&
                            x.Qualifier.Name == attribute.Qualifier.ToString() &&
                            x.Source.Name == attribute.Source.ToString() &&
                            x.Aspect == attribute.Aspect &&
                            x.Entity == attribute.Entity
                        ).ToList();
                        var test = "";
                    }

                    


                    var item = new CreateLibraryType
                    {
                        Aspect = lib.Aspect,
                        AttributeTypes = new List<string>(),
                        Name = lib.TypeName,
                        TerminalTypes = new List<TerminalTypeItem> {},
                        ObjectType = lib.ObjectType,
                        TerminalTypeId = null,
                        RdsId = lib.Rds,
                        SemanticReference = null,
                        Status = lib.Status
                    };
                }



                var data = _commonService.GetAllContractors().ToList();
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