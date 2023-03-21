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
using Version = Mb.Models.Data.VersionDm;
using Mb.Models.Client;

namespace Mb.Services.Services
{
    public class VersionService : IVersionService
    {
        private readonly IVersionRepository _versionRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IMapper _mapper;

        public VersionService(IVersionRepository versionRepository, IMapper mapper, IHttpContextAccessor contextAccessor)
        {
            _versionRepository = versionRepository;
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
        /// Get project from typeid and version
        /// </summary>
        /// <param name="typeId"></param>
        /// <param name="version"></param>
        /// <returns>Project</returns>
        public Task<ProjectDm> GetGetByVersion(string typeId, string version)
        {
            var projectData = _versionRepository.GetAll().FirstOrDefault(x => x.TypeId == typeId && x.Ver == version);
            if (projectData?.Data == null)
                return null;

            var project = JsonConvert.DeserializeObject<ProjectDm>(projectData.Data, DefaultSettings.SerializerSettings);
            return Task.FromResult(project);
        }

        /// <summary>
        /// Returns a specific version of a Project
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Project</returns>
        public async Task<ProjectDm> GetProject(int id)
        {
            var data = await Task.Run(() => _versionRepository.FindBy(x => x.Id == id)?.First()?.Data);

            if (data == null)
                throw new MimirorgInvalidOperationException("Version not found");

            return JsonConvert.DeserializeObject<ProjectDm>(data);
        }

        /// <summary>
        /// Create a new version of an existing Project. Returns the created VersionCm
        /// </summary>
        /// <param name="project"></param>
        /// <returns>VersionCm</returns>
        public async Task<VersionCm> CreateVersion(ProjectDm project)
        {
            if (project == null)
                throw new MimirorgInvalidOperationException("Can't save new project version. Project is null.");

            if (_versionRepository.GetAll().Any(x => x.TypeId == project.Id && x.Ver == project.Version))
                throw new MimirorgInvalidOperationException($"Project with id {project.Id} and version {project.Version} already exist");

            var version = new Version
            {
                Ver = project.Version,
                Type = nameof(ProjectDm),
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