using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Data.Contracts;
using Mb.Models.Const;
using Mb.Models.Data;
using Mimirorg.Common.Exceptions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Mimirorg.Common.Extensions;
using Newtonsoft.Json;
using Version = Mb.Models.Data.Version;
using Mb.Models.Client;

namespace Mb.Services.Services
{
    public class VersionService : IVersionService
    {
        private readonly IVersionRepository _versionRepository;
        private readonly IProjectService _projectService;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IMapper _mapper;

        public VersionService(IVersionRepository versionRepository, IProjectService projectService, IMapper mapper, IHttpContextAccessor contextAccessor)
        {
            _versionRepository = versionRepository;
            _projectService = projectService;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
        }

        /// <summary>
        /// Returns a list with all versions
        /// </summary>
        /// <returns>List of VersionCm</returns>
        public async Task<IEnumerable<VersionCm>> GetAllVersions()
        {
            return await Task.Run(() => _versionRepository.GetAll()
                .ProjectTo<VersionCm>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.TypeId).ThenBy(y => y.Ver)
                .ToList());
        }

        /// <summary>
        /// Returns a VersionCm list of all versions for a specific type (param: version table 'typeId')
        /// </summary>
        /// <param name="typeId"></param>
        /// <returns>List of VersionCm</returns>
        public async Task<IEnumerable<VersionCm>> GetAllVersions(string typeId)
        {
            return await Task.Run(() => _versionRepository.GetAll()
                .Where(x => x.TypeId == typeId)
                .ProjectTo<VersionCm>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.TypeId).ThenBy(y => y.Ver)
                .ToList());
        }

        /// <summary>
        /// Returns a specific version of a Project
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Project</returns>
        public async Task<Project> GetProject(int id)
        {
            var data = await Task.Run(() => _versionRepository.FindBy(x => x.Id == id)?.First()?.Data);

            if (data == null)
                throw new MimirorgInvalidOperationException("Version not found");

            return JsonConvert.DeserializeObject<Project>(data);
        }

        /// <summary>
        /// Create a new version of an existing Project. Returns the created VersionCm
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>VersionCm</returns>
        public async Task<VersionCm> CreateVersion(string projectId)
        {
            if (string.IsNullOrWhiteSpace(projectId))
                throw new MimirorgInvalidOperationException("ProjectId can't be null or empty");

            var project = await _projectService.GetProject(projectId, null);

            if (string.IsNullOrWhiteSpace(project?.Id))
                throw new MimirorgInvalidOperationException("Project not found");

            if (_versionRepository.GetAll().Any(x => x.TypeId == project.Id && x.Ver == project.Version))
                throw new MimirorgInvalidOperationException($"Project with id {project.Id} and version {project.Version} already exist");

            var version = new Version
            {
                Ver = project.Version,
                Type = project.GetType().FullName,
                TypeId = project.Id,
                Name = project.Name,
                Created = DateTime.Now.ToUniversalTime(),
                CreatedBy = _contextAccessor.GetName(),
                Data = JsonConvert.SerializeObject(project, DefaultSettings.SerializerSettings)
            };

            await _versionRepository.CreateAsync(version);
            await _versionRepository.SaveAsync();

            version = await Task.Run(() => _versionRepository
                .FindBy(x => x.TypeId == project.Id && x.Ver == project.Version)
                .First());

            return _mapper.Map<VersionCm>(version);
        }

        /// <summary>
        /// Delete a version
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteVersion(int id)
        {
            await _versionRepository.Delete(id);
            await _versionRepository.SaveAsync();
        }
    }
}