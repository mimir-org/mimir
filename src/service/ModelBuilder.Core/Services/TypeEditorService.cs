using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;
using AttributeCondition = Mb.Models.Data.Enums.AttributeCondition;

namespace Mb.Core.Services
{
    public class TypeEditorService : ITypeEditorService
    {
        public const string RdsFileName = "rds";
        public const string AttributeFileName = "attribute";
        public const string LibraryFileName = "library";
        public const string ContractorFileName = "contractor";
        public const string TerminalFileName = "terminal";
        public const string UnitFileName = "unit";
        public const string ConditionFileName = "condition";

        private readonly IFileRepository _fileRepository;
        private readonly IRdsRepository _rdsRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ILibraryTypeRepository _libraryTypeComponentRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IContractorRepository _contractorRepository;
        private readonly ITerminalTypeRepository _terminalTypeRepository;
        private readonly IEnumBaseRepository _enumBaseRepository;

        public TypeEditorService(IFileRepository fileRepository, IRdsRepository rdsRepository, IAttributeTypeRepository attributeTypeRepository, ILibraryTypeRepository libraryTypeComponentRepository, ICommonRepository commonRepository, IContractorRepository contractorRepository, ITerminalTypeRepository terminalTypeRepository, IEnumBaseRepository enumBaseRepository)
        {
            _fileRepository = fileRepository;
            _rdsRepository = rdsRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _commonRepository = commonRepository;
            _contractorRepository = contractorRepository;
            _terminalTypeRepository = terminalTypeRepository;
            _enumBaseRepository = enumBaseRepository;
        }

        #region Public methods

        /// <summary>
        /// Get type by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ignoreNotFound"></param>
        /// <returns></returns>
        public async Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false)
        {
            var libraryTypeComponent = await _libraryTypeComponentRepository.GetAsync(id);
            if (!ignoreNotFound && libraryTypeComponent == null)
                throw new ModelBuilderNotFoundException($"The type with id: {id} could not be found.");
            return libraryTypeComponent;
        }

        /// <summary>
        /// Get all type editor statuses
        /// </summary>
        /// <returns></returns>
        public Dictionary<int, string> GetStatuses()
        {
            return EnumExtensions.ToDictionary<Status>();
        }

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
        /// Get all units
        /// </summary>
        /// <returns></returns>
        public Dictionary<int, string> GetUnits()
        {
            return EnumExtensions.ToDictionary<Unit>();
        }

        /// <summary>
        /// Get all terminal ctaegories
        /// </summary>
        /// <returns></returns>
        public Dictionary<int, string> GetTerminalCategories()
        {
            return EnumExtensions.ToDictionary<TerminalCategory>();
        }

        /// <summary>
        /// Get all RDS by aspect
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        public IEnumerable<Rds> GetRds(Aspect aspect)
        {
            switch (aspect)
            {
                case Aspect.Function:
                    return _rdsRepository.FindBy(x => x.IsFunction).ToList();
                case Aspect.Location:
                    return _rdsRepository.FindBy(x => x.IsLocation).ToList();
                case Aspect.Product:
                    return _rdsRepository.FindBy(x => x.IsProduct).ToList();
                default:
                    return _rdsRepository.GetAll().ToList();
            }
        }

        /// <summary>
        /// Get all attribute files by aspect
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        public IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect)
        {
            switch (aspect)
            {
                case Aspect.Function:
                case Aspect.Location:
                case Aspect.Product:
                    return _attributeTypeRepository.FindBy(x => x.Aspect == aspect).ToList();
                default:
                    return _attributeTypeRepository.GetAll().ToList();
            }
        }

        /// <summary>
        /// Get all terminals
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TerminalType> GetTerminals()
        {
            var allTerminals = _terminalTypeRepository.GetAll().ToList();
            foreach (var terminal in allTerminals)
            {
                terminal.CreateFromJsonData();
                yield return terminal;
            }
        }


        /// <summary>
        /// Create a library component
        /// </summary>
        /// <param name="libraryTypeComponent"></param>
        /// <returns></returns>
        public async Task<LibraryType> CreateLibraryComponent(LibraryType libraryTypeComponent)
        {
            if (!string.IsNullOrEmpty(libraryTypeComponent.Id))
            {
                var existingType = await _libraryTypeComponentRepository.GetAsync(libraryTypeComponent.Id);
                if (existingType != null)
                    throw new ModelBuilderDuplicateException($"The type with id:{libraryTypeComponent.Id} already exist.");
            }

            libraryTypeComponent.CreateJsonData();
            libraryTypeComponent.Id = _commonRepository.CreateUniqueId();
            await _libraryTypeComponentRepository.CreateAsync(libraryTypeComponent);
            await _libraryTypeComponentRepository.SaveAsync();
            return libraryTypeComponent;
        }

        /// <summary>
        /// Get all library types
        /// </summary>
        /// <returns></returns>
        public IEnumerable<LibraryType> GetAllTypes()
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
        ///  Load types from file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken)
        {
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream, cancellationToken);
            var types = stream.ToArray().Deserialize<List<LibraryType>>();
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
            var contractorFiles = fileList.Where(x => x.ToLower().Contains(ContractorFileName)).ToList();
            var terminalFiles = fileList.Where(x => x.ToLower().Contains(TerminalFileName)).ToList();
            var unitFiles = fileList.Where(x => x.ToLower().Contains(UnitFileName)).ToList();
            var conditionFiles = fileList.Where(x => x.ToLower().Contains(ConditionFileName)).ToList();

            var libraries = _fileRepository.ReadAllFiles<LibraryType>(libraryFiles).ToList();
            var rds = _fileRepository.ReadAllFiles<Rds>(rdsFiles).ToList();
            var attributes = _fileRepository.ReadAllFiles<AttributeType>(attributeFiles).ToList();
            var contractors = _fileRepository.ReadAllFiles<Contractor>(contractorFiles).ToList();
            var terminals = _fileRepository.ReadAllFiles<TerminalType>(terminalFiles).ToList();
            var units = _fileRepository.ReadAllFiles<Mb.Models.Data.Enums.Unit>(unitFiles).ToList();
            var conditions = _fileRepository.ReadAllFiles<AttributeCondition>(conditionFiles).ToList();

            await CreateRdsAsync(rds);
            await CreateAttributeTypesAsync(attributes);
            await CreateTerminalTypesAsync(terminals);
            await CreateLibraryTypeComponentsAsync(libraries);
            await CreateContractorsAsync(contractors);
            await CreateUnitsAsync(units);
            await CreateConditionsAsync(conditions);
        }

        /// <summary>
        /// Delete a type
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteType(string id)
        {
            var existingType = await GetTypeById(id);
            if(existingType == null)
                throw new ModelBuilderNotFoundException($"Could not delete type with id: {id}. The type was not found.");

            await _libraryTypeComponentRepository.Delete(id);
            await _libraryTypeComponentRepository.SaveAsync();
        }

        /// <summary>
        /// Create an attribute type
        /// </summary>
        /// <param name="attributeType"></param>
        /// <returns></returns>
        public async Task<AttributeType> CreateAttributeType(AttributeType attributeType)
        {
            attributeType.Id = 0;
            await _attributeTypeRepository.CreateAsync(attributeType);
            await _attributeTypeRepository.SaveAsync();
            return attributeType;
        }

        /// <summary>
        /// Create a terminal type
        /// </summary>
        /// <param name="terminalType"></param>
        /// <returns></returns>
        public async Task<TerminalType> CreateTerminalType(TerminalType terminalType)
        {
            terminalType.Id = _commonRepository.CreateUniqueId();
            terminalType.CreateJsonData();
            await _terminalTypeRepository.CreateAsync(terminalType);
            await _terminalTypeRepository.SaveAsync();
            terminalType.CreateFromJsonData();
            return terminalType;
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

        private async Task CreateTerminalTypesAsync(IEnumerable<TerminalType> terminals)
        {
            var existingTypes = _terminalTypeRepository.GetAll().ToList();
            var notExistingTypes = terminals.Where(x => existingTypes.All(y => y.Id != x.Id)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                item.CreateJsonData();
                item.TerminalCategory = _commonRepository.GetCategory(item.Terminal);
                await _terminalTypeRepository.CreateAsync(item);
            }

            await _terminalTypeRepository.SaveAsync();
        }

        private async Task CreateLibraryTypeComponentsAsync(IEnumerable<LibraryType> libraryTypes)
        {
            var existingTypes = _libraryTypeComponentRepository.GetAll().ToList();
            var notExistingTypes = libraryTypes.Where(x => existingTypes.All(y => y.Id != x.Id)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                item.CreateJsonData();
                await _libraryTypeComponentRepository.CreateAsync(item);
            }

            await _libraryTypeComponentRepository.SaveAsync();
        }

        private async Task CreateContractorsAsync(IEnumerable<Contractor> contractors)
        {
            var existingTypes = _contractorRepository.GetAll().ToList();
            var notExistingTypes = contractors.Where(x => existingTypes.All(y => y.Id != x.Id)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                await _contractorRepository.CreateAsync(item);
            }

            await _contractorRepository.SaveAsync();
        }

        private async Task CreateConditionsAsync(List<AttributeCondition> conditions)
        {
            var exitingConditions = _enumBaseRepository.GetAll().OfType<AttributeCondition>().ToList();
            var notExistingCondition = conditions.Where(x => exitingConditions.All(y => y.Name != x.Name && y.InternalType != x.InternalType)).ToList();
            if (!notExistingCondition.Any())
                return;

            foreach (var condition in notExistingCondition)
            {
                await _enumBaseRepository.CreateAsync(condition);
            }

            await _enumBaseRepository.SaveAsync();
        }

        private async Task CreateUnitsAsync(List<Models.Data.Enums.Unit> units)
        {
            var exitingUnits = _enumBaseRepository.GetAll().OfType<Models.Data.Enums.Unit>().ToList();
            var notExistingUnits = units.Where(x => exitingUnits.All(y => y.Name != x.Name && y.InternalType != x.InternalType)).ToList();
            if (!notExistingUnits.Any())
                return;

            foreach (var unit in notExistingUnits)
            {
                await _enumBaseRepository.CreateAsync(unit);
            }

            await _enumBaseRepository.SaveAsync();
        }

        #endregion
    }
}
