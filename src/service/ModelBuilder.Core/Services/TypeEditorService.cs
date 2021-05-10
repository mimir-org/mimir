using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Services
{
    public class TypeEditorService : ITypeEditorService
    {
        public const string RdsFileName = "rds";
        public const string AttributeFileName = "attribute";
        public const string LibraryFileName = "library";

        private readonly IFileRepository _fileRepository;
        private readonly IRdsRepository _rdsRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ILibraryTypeComponentRepository _libraryTypeComponentRepository;
        private readonly ICommonRepository _generateIdRepository;

        public TypeEditorService(IFileRepository fileRepository, IRdsRepository rdsRepository, IAttributeTypeRepository attributeTypeRepository, ILibraryTypeComponentRepository libraryTypeComponentRepository, ICommonRepository generateIdRepository)
        {
            _fileRepository = fileRepository;
            _rdsRepository = rdsRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _generateIdRepository = generateIdRepository;
        }

        #region Public methods

        /// <summary>
        /// Get all aspects
        /// </summary>
        /// <returns></returns>
        public Dictionary<int, string> GetAspects()
        {
            return EnumExtensions.ToDictionary<Aspect>();
        }

        /// <summary>
        /// Get all object types
        /// </summary>
        /// <returns></returns>
        public Dictionary<int, string> GetObjectTypes()
        {
            return EnumExtensions.ToDictionary<ObjectType>();
        }

        /// <summary>
        /// Get all RDS
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Rds> GetRds()
        {
            return _fileRepository.ReadFile<Rds>(RdsFileName);
        }

        /// <summary>
        /// Get all attribute files
        /// </summary>
        /// <returns></returns>
        public IEnumerable<AttributeType> GetAttributeTypes()
        {
            return _fileRepository.ReadFile<AttributeType>(AttributeFileName);
        }

        /// <summary>
        /// Get all terminals
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Terminal> GetTerminals()
        {
            var terminals = EnumExtensions.GetEnumList<TerminalType>().Where(x => x != TerminalType.NotSet).ToList();
            foreach (var terminalType in terminals)
            {
                yield return new Terminal
                {
                    TerminalType = terminalType,
                    ConnectorType = ConnectorType.Input
                };

                yield return new Terminal
                {
                    TerminalType = terminalType,
                    ConnectorType = ConnectorType.Output
                };
            }
        }


        /// <summary>
        /// Create a library component
        /// </summary>
        /// <param name="libraryTypeComponent"></param>
        /// <returns></returns>
        public async Task<LibraryTypeComponent> CreateLibraryComponent(LibraryTypeComponent libraryTypeComponent)
        {
            libraryTypeComponent.CreateJsonData();
            libraryTypeComponent.Id = _generateIdRepository.CreateUniqueId();
            await _libraryTypeComponentRepository.CreateAsync(libraryTypeComponent);
            await _libraryTypeComponentRepository.SaveAsync();
            return libraryTypeComponent;
        }

        /// <summary>
        /// Get all library type components
        /// </summary>
        /// <returns></returns>
        public IEnumerable<LibraryTypeComponent> GetAllTypes()
        {
            var types = _libraryTypeComponentRepository.GetAll().ToList();
            foreach (var component in types)
            {
                component.CreateFromJsonData();
                yield return component;
            }
        }

        /// <summary>
        /// Create a json byte array of all types
        /// </summary>
        /// <returns></returns>
        public byte[] CreateFile()
        {
            var types = GetAllTypes().ToList();
            return types.Serialize();
        }

        /// <summary>
        /// Load types from file
        /// </summary>
        /// <returns></returns>
        public async Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken)
        {
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream, cancellationToken);
            var types = stream.ToArray().Deserialize<List<LibraryTypeComponent>>();
            await CreateLibraryTypeComponentsAsync(types);
        }

        /// <summary>
        /// Load all initial data from files
        /// </summary>
        /// <returns></returns>
        public async Task LoadDataFromFiles()
        {
            var fileList = _fileRepository.ReadJsonFileList().ToList();
            
            if (!fileList.Any())
                return;

            var libraryFiles = fileList.Where(x => x.ToLower().Contains(LibraryFileName)).ToList();
            var rdsFiles = fileList.Where(x => x.ToLower().Contains(RdsFileName)).ToList();
            var attributeFiles = fileList.Where(x => x.ToLower().Contains(AttributeFileName)).ToList();

            var libraries = _fileRepository.ReadAllFiles<LibraryTypeComponent>(libraryFiles).ToList();
            var rds = _fileRepository.ReadAllFiles<Rds>(rdsFiles).ToList();
            var attributes = _fileRepository.ReadAllFiles<AttributeType>(attributeFiles).ToList();

            await CreateRdsAsync(rds);
            await CreateAttributeTypesAsync(attributes);
            await CreateLibraryTypeComponentsAsync(libraries);
        }

        #endregion

        #region Private methods

        private async Task CreateRdsAsync(IEnumerable<Rds> rds)
        {
            var existingRds = _rdsRepository.GetAll().ToList();
            var notExistRds = rds.Where(x => existingRds.All(y => y.Code == x.Code && y.Category == x.Category)).ToList();
            if(!notExistRds.Any())
                return;

            foreach (var item in notExistRds)
            {
                await _rdsRepository.CreateAsync(item);
            }

            await _rdsRepository.SaveAsync();
        }

        private async Task CreateAttributeTypesAsync(IEnumerable<AttributeType> attributeTypes)
        {
            var existingTypes = _attributeTypeRepository.GetAll().ToList();
            var notExistingTypes = attributeTypes.Where(x => !existingTypes.Any(x.Equals)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                await _attributeTypeRepository.CreateAsync(item);
            }

            await _attributeTypeRepository.SaveAsync();
        }

        private async Task CreateLibraryTypeComponentsAsync(IEnumerable<LibraryTypeComponent> libraryTypeComponents)
        {
            var existingTypes = _libraryTypeComponentRepository.GetAll().ToList();
            var notExistingTypes = libraryTypeComponents.Where(x => !existingTypes.Any(x.Equals)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                item.CreateJsonData();
                await _libraryTypeComponentRepository.CreateAsync(item);
            }

            await _libraryTypeComponentRepository.SaveAsync();
        }

        #endregion
    }
}
