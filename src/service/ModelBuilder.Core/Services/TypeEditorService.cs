using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models;
using Mb.Models.Enums;

namespace Mb.Core.Services
{
    public class TypeEditorService : ITypeEditorService
    {
        public const string RdsFileName = "rds";
        public const string AttributeFileName = "attribute";
        public const string LibraryFileName = "library";

        private readonly IMapper _mapper;
        private readonly IFileRepository _fileRepository;
        private readonly IRdsRepository _rdsRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ILibraryTypeComponentRepository _libraryTypeComponentRepository;
        private readonly IGenerateIdRepository _generateIdRepository;

        public TypeEditorService(IMapper mapper, IFileRepository fileRepository, IRdsRepository rdsRepository, IAttributeTypeRepository attributeTypeRepository, ILibraryTypeComponentRepository libraryTypeComponentRepository, IGenerateIdRepository generateIdRepository)
        {
            _mapper = mapper;
            _fileRepository = fileRepository;
            _rdsRepository = rdsRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _generateIdRepository = generateIdRepository;
        }

        public Dictionary<int, string> GetAspects()
        {
            return EnumExtensions.ToDictionary<Aspect>();
        }

        public Dictionary<int, string> GetObjectTypes()
        {
            return EnumExtensions.ToDictionary<ObjectType>();
        }

        public IEnumerable<Rds> GetRds()
        {
            return _fileRepository.ReadFile<Rds>(RdsFileName);
        }

        public IEnumerable<AttributeType> GetAttributeTypes()
        {
            return _fileRepository.ReadFile<AttributeType>(AttributeFileName);
        }

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

        public async Task<LibraryTypeComponent> CreateLibraryComponent(LibraryTypeComponent libraryTypeComponent)
        {
            libraryTypeComponent.CreateJsonData();
            libraryTypeComponent.Id = _generateIdRepository.CreateUniqueId(libraryTypeComponent.Version, "t");
            await _libraryTypeComponentRepository.CreateAsync(libraryTypeComponent);
            await _libraryTypeComponentRepository.SaveAsync();
            return libraryTypeComponent;
        }

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
    }
}
