using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Extensions;
using Mb.TypeEditor.Data.Contracts;
using Mb.TypeEditor.Services.Contracts;
using Microsoft.Extensions.Logging;

namespace Mb.TypeEditor.Services.Services
{
    public class SeedingService : ISeedingService
    {
        private const string RdsFileName = "rds";
        private const string AttributeFileName = "attribute";
        private const string TerminalFileName = "terminal";
        private const string TransportFileName = "transport";
        private const string UnitFileName = "unit";
        private const string ConditionFileName = "condition";
        private const string QualifierFileName = "qualifier";
        private const string SourceFileName = "source";
        private const string TerminalCategoryFileName = "termcategory";
        private const string AttributeFormatFileName = "format";
        private const string BuildStatusFileName = "buildstatus";
        private const string TypeAttributeFileName = "type_attribute";
        private const string PredefinedAttributeFileName = "predefined_attribute";
        private const string PurposeFileName = "purpose";
        private const string SymbolFileName = "symbol";
        private const string SimpleTypeFileName = "simple_type";

        private readonly IFileRepository _fileRepository;
        private readonly IEnumBaseRepository _enumBaseRepository;
        private readonly ILogger<SeedingService> _logger;
        private readonly ITerminalTypeService _terminalTypeService;
        private readonly IAttributeTypeService _attributeTypeService;
        private readonly IRdsService _rdsService;
        private readonly IBlobDataService _blobDataService;
        private readonly ILibraryTypeService _libraryTypeService;

        public SeedingService(IFileRepository fileRepository, IEnumBaseRepository enumBaseRepository, ILogger<SeedingService> logger, ITerminalTypeService terminalTypeService, IAttributeTypeService attributeTypeService, IRdsService rdsService, IBlobDataService blobDataService, ILibraryTypeService libraryTypeService)
        {
            _fileRepository = fileRepository;
            _enumBaseRepository = enumBaseRepository;
            _logger = logger;
            _terminalTypeService = terminalTypeService;
            _attributeTypeService = attributeTypeService;
            _rdsService = rdsService;
            _blobDataService = blobDataService;
            _libraryTypeService = libraryTypeService;
        }

        /// <summary>
        /// Load all initial data from files
        /// </summary>
        /// <returns></returns>
        public async Task LoadDataFromFiles()
        {
            try
            {
                var fileList = _fileRepository.ReadJsonFileList().ToList();

                if (!fileList.Any())
                    return;

                //Enums
                var unitFiles = fileList.Where(x => x.ToLower().Equals(UnitFileName)).ToList();
                var conditionFiles = fileList.Where(x => x.ToLower().Equals(ConditionFileName)).ToList();
                var qualifierFiles = fileList.Where(x => x.ToLower().Equals(QualifierFileName)).ToList();
                var sourceFiles = fileList.Where(x => x.ToLower().Equals(SourceFileName)).ToList();
                var terminalCategoryFiles = fileList.Where(x => x.ToLower().Equals(TerminalCategoryFileName)).ToList();
                var attributeFormatFiles = fileList.Where(x => x.ToLower().Equals(AttributeFormatFileName)).ToList();
                var buildStatusFiles = fileList.Where(x => x.ToLower().Equals(BuildStatusFileName)).ToList();
                var typeAttributeFiles = fileList.Where(x => x.ToLower().Equals(TypeAttributeFileName)).ToList();

                //Other
                var attributeFiles = fileList.Where(x => x.ToLower().Equals(AttributeFileName)).ToList();
                var terminalFiles = fileList.Where(x => x.ToLower().Equals(TerminalFileName)).ToList();
                var transportFiles = fileList.Where(x => x.ToLower().Equals(TransportFileName)).ToList();
                var rdsFiles = fileList.Where(x => x.ToLower().Equals(RdsFileName)).ToList();
                var predefinedAttributeFiles = fileList.Where(x => x.ToLower().Equals(PredefinedAttributeFileName)).ToList();
                var purposeFiles = fileList.Where(x => x.ToLower().Equals(PurposeFileName)).ToList();
                var symbolFileNames = fileList.Where(x => x.ToLower().Equals(SymbolFileName)).ToList();
                var simpleTypeFileNames = fileList.Where(x => x.ToLower().Equals(SimpleTypeFileName)).ToList();

                var units = _fileRepository.ReadAllFiles<Unit>(unitFiles).ToList();
                var conditions = _fileRepository.ReadAllFiles<AttributeCondition>(conditionFiles).ToList();
                var qualifiers = _fileRepository.ReadAllFiles<AttributeQualifier>(qualifierFiles).ToList();
                var sources = _fileRepository.ReadAllFiles<AttributeSource>(sourceFiles).ToList();
                var terminalCategories = _fileRepository.ReadAllFiles<TerminalCategory>(terminalCategoryFiles).ToList();
                var attributeFormats = _fileRepository.ReadAllFiles<AttributeFormat>(attributeFormatFiles).ToList();
                var buildStatuses = _fileRepository.ReadAllFiles<BuildStatus>(buildStatusFiles).ToList();
                var typeAttributes = _fileRepository.ReadAllFiles<TypeAttribute>(typeAttributeFiles).ToList();
                var symbols = _fileRepository.ReadAllFiles<BlobDataAm>(symbolFileNames).ToList();
                var simpleTypes = _fileRepository.ReadAllFiles<SimpleTypeAm>(simpleTypeFileNames).ToList();

                var attributes = _fileRepository.ReadAllFiles<AttributeTypeAm>(attributeFiles).ToList();
                var terminals = _fileRepository.ReadAllFiles<CreateTerminalType>(terminalFiles).ToList();
                var transports = _fileRepository.ReadAllFiles<CreateLibraryType>(transportFiles).ToList();
                var rds = _fileRepository.ReadAllFiles<CreateRds>(rdsFiles).ToList();
                var predefinedAttributes = _fileRepository.ReadAllFiles<PredefinedAttribute>(predefinedAttributeFiles).ToList();
                var purposes = _fileRepository.ReadAllFiles<Purpose>(purposeFiles).ToList();

                await CreateEnumBase(units);
                await CreateEnumBase(conditions);
                await CreateEnumBase(qualifiers);
                await CreateEnumBase(sources);
                await CreateEnumBase(terminalCategories);
                await CreateEnumBase(attributeFormats);
                await CreateEnumBase(buildStatuses);
                await CreateEnumBase(typeAttributes);
                await CreateEnumBase(purposes);

                await _attributeTypeService.CreateAttributeTypes(attributes);
                await _terminalTypeService.CreateTerminalTypes(terminals);
                await _rdsService.CreateRdsAsync(rds);
                await _attributeTypeService.CreatePredefinedAttributes(predefinedAttributes);
                await _blobDataService.CreateBlobData(symbols);
                await _libraryTypeService.CreateSimpleTypes(simpleTypes);

                var existingLibraryTypes = _libraryTypeService.GetAllTypes().ToList();
                transports = transports.Where(x => existingLibraryTypes.All(y => y.Key != x.Key)).ToList();
                _libraryTypeService.ClearAllChangeTracker();
                await _libraryTypeService.CreateLibraryTypes(transports);
            }
            catch (Exception e)
            {
                _logger.LogError($"Could not create initial data from file: error: {e.Message}");
            }
        }


        private async Task CreateEnumBase<T>(IEnumerable<T> items) where T : EnumBase
        {
            var exitingItems = _enumBaseRepository.GetAll().OfType<T>().ToList();
            var newItems = items.Select(x =>
            {
                x.Id = x.Key.CreateMd5();
                return x;
            }).ToList();
            var notExistingItems = newItems.Where(x => exitingItems.All(y => y.Id != x.Id)).ToList();

            if (!notExistingItems.Any())
                return;

            var parents = notExistingItems.Where(x => string.IsNullOrEmpty(x.ParentId)).ToList();
            var children = notExistingItems.Where(x => !string.IsNullOrEmpty(x.ParentId)).ToList();

            foreach (var item in parents)
            {
                item.Key.CreateMd5();
                await _enumBaseRepository.CreateAsync(item);
            }

            await _enumBaseRepository.SaveAsync();

            foreach (var item in parents)
            {
                _enumBaseRepository.Detach(item);
            }

            foreach (var item in children)
            {
                item.Key.CreateMd5();
                await _enumBaseRepository.CreateAsync(item);
            }

            await _enumBaseRepository.SaveAsync();

            foreach (var item in children)
            {
                _enumBaseRepository.Detach(item);
            }
        }
    }
}