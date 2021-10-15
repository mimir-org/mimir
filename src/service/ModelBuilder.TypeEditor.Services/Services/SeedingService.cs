using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application.Mimir;
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

        public const string RdsFileName = "rds";
        public const string AttributeFileName = "attribute";
        public const string LibraryFileName = "library";
        public const string ContractorFileName = "contractor";
        public const string TerminalFileName = "terminal";
        public const string UnitFileName = "unit";
        public const string ConditionFileName = "condition";
        public const string QualifierFileName = "qualifier";
        public const string SourceFileName = "source";
        public const string RdsCategoryFileName = "rdscategory";
        public const string TerminalCategoryFileName = "termcategory";
        public const string AttributeFormatFileName = "format";
        public const string BuildStatusFileName = "buildstatus";
        public const string PredefinedAttributeCategoryFileName = "predefined_attribute_category";
        public const string PredefinedAttributeFileName = "predefined_attribute";
        public const string PurposeFileName = "purpose";
        public const string SymbolFileName = "symbol";

        private readonly IFileRepository _fileRepository;
        private readonly IEnumBaseRepository _enumBaseRepository;
        private readonly ILogger<SeedingService> _logger;
        //private readonly ICommonService _commonService;
        private readonly ITerminalTypeService _terminalTypeService;
        private readonly IAttributeTypeService _attributeTypeService;
        private readonly IRdsService _rdsService;
        private readonly IBlobDataService _blobDataService;

        public SeedingService(IFileRepository fileRepository, IEnumBaseRepository enumBaseRepository, IMapper mapper, ILogger<SeedingService> logger, ITerminalTypeService terminalTypeService, IAttributeTypeService attributeTypeService, IRdsService rdsService, IBlobDataService blobDataService)
        {
            _fileRepository = fileRepository;
            _enumBaseRepository = enumBaseRepository;
            _logger = logger;
            _terminalTypeService = terminalTypeService;
            _attributeTypeService = attributeTypeService;
            _rdsService = rdsService;
            _blobDataService = blobDataService;
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

                //var libraryFiles = fileList.Where(x => x.ToLower().Contains(LibraryFileName)).ToList();

                //Enums
                var unitFiles = fileList.Where(x => x.ToLower().Equals(UnitFileName)).ToList();
                var conditionFiles = fileList.Where(x => x.ToLower().Equals(ConditionFileName)).ToList();
                var qualifierFiles = fileList.Where(x => x.ToLower().Equals(QualifierFileName)).ToList();
                var sourceFiles = fileList.Where(x => x.ToLower().Equals(SourceFileName)).ToList();
                var rdsCategoryFiles = fileList.Where(x => x.ToLower().Equals(RdsCategoryFileName)).ToList();
                var terminalCategoryFiles = fileList.Where(x => x.ToLower().Equals(TerminalCategoryFileName)).ToList();
                var attributeFormatFiles = fileList.Where(x => x.ToLower().Equals(AttributeFormatFileName)).ToList();
                var buildStatusFiles = fileList.Where(x => x.ToLower().Equals(BuildStatusFileName)).ToList();
                var predefinedAttributeCategoryFiles = fileList.Where(x => x.ToLower().Equals(PredefinedAttributeCategoryFileName)).ToList();
                
                //Other
                var contractorFiles = fileList.Where(x => x.ToLower().Equals(ContractorFileName)).ToList();
                var attributeFiles = fileList.Where(x => x.ToLower().Equals(AttributeFileName)).ToList();
                var terminalFiles = fileList.Where(x => x.ToLower().Equals(TerminalFileName)).ToList();
                var rdsFiles = fileList.Where(x => x.ToLower().Equals(RdsFileName)).ToList();
                var predefinedAttributeFiles = fileList.Where(x => x.ToLower().Equals(PredefinedAttributeFileName)).ToList();
                var purposeFiles = fileList.Where(x => x.ToLower().Equals(PurposeFileName)).ToList();
                var symbolFileNames = fileList.Where(x => x.ToLower().Equals(SymbolFileName)).ToList();

                //var libraries = _fileRepository.ReadAllFiles<LibraryType>(libraryFiles).ToList();

                var units = _fileRepository.ReadAllFiles<Unit>(unitFiles).ToList();
                var conditions = _fileRepository.ReadAllFiles<AttributeCondition>(conditionFiles).ToList();
                var qualifiers = _fileRepository.ReadAllFiles<AttributeQualifier>(qualifierFiles).ToList();
                var sources = _fileRepository.ReadAllFiles<AttributeSource>(sourceFiles).ToList();
                var rdsCategories = _fileRepository.ReadAllFiles<RdsCategory>(rdsCategoryFiles).ToList();
                var terminalCategories = _fileRepository.ReadAllFiles<TerminalCategory>(terminalCategoryFiles).ToList();
                var attributeFormats = _fileRepository.ReadAllFiles<AttributeFormat>(attributeFormatFiles).ToList();
                var buildStatuses = _fileRepository.ReadAllFiles<BuildStatus>(buildStatusFiles).ToList();
                var predefinedCategories = _fileRepository.ReadAllFiles<PredefinedAttributeCategory>(predefinedAttributeCategoryFiles).ToList();
                var symbols = _fileRepository.ReadAllFiles<BlobDataAm>(symbolFileNames).ToList();

                //var contractors = _fileRepository.ReadAllFiles<Contractor>(contractorFiles).ToList();
                var attributes = _fileRepository.ReadAllFiles<CreateAttributeType>(attributeFiles).ToList();
                var terminals = _fileRepository.ReadAllFiles<CreateTerminalType>(terminalFiles).ToList();
                var rds = _fileRepository.ReadAllFiles<CreateRds>(rdsFiles).ToList();
                var predefinedAttributes = _fileRepository.ReadAllFiles<PredefinedAttribute>(predefinedAttributeFiles).ToList();
                var purposes = _fileRepository.ReadAllFiles<Purpose>(purposeFiles).ToList();


                //await CreateAttributeTypesAsync(attributes);
                //await CreateTerminalTypesAsync(terminals);
                //await CreateLibraryTypeComponentsAsync(libraries);

                await CreateEnumBase<Unit>(units);
                await CreateEnumBase<AttributeCondition>(conditions);
                await CreateEnumBase<AttributeQualifier>(qualifiers);
                await CreateEnumBase<AttributeSource>(sources);
                await CreateEnumBase<RdsCategory>(rdsCategories);
                await CreateEnumBase<TerminalCategory>(terminalCategories);
                await CreateEnumBase<AttributeFormat>(attributeFormats);
                await CreateEnumBase<BuildStatus>(buildStatuses);
                await CreateEnumBase<PredefinedAttributeCategory>(predefinedCategories);
                await CreateEnumBase<Purpose>(purposes);

                //await _commonService.CreateContractorsAsync(contractors);
                await _attributeTypeService.CreateAttributeTypes(attributes);
                await _terminalTypeService.CreateTerminalTypes(terminals);
                await _rdsService.CreateRdsAsync(rds);
                await _attributeTypeService.CreatePredefinedAttributes(predefinedAttributes);
                await _blobDataService.CreateBlobData(symbols);

            }
            catch (Exception e)
            {
                _logger.LogError($"Could not create initial data from file: error: {e.Message}");
            }
        }

        

        private async Task CreateEnumBase<T>(IEnumerable<T> items) where T : EnumBase
        {
            var exitingItems = _enumBaseRepository.GetAll().OfType<T>().ToList();
            var newItems = items.Select(x => { x.Id = x.Key.CreateMd5(); return x; }).ToList();
            var notExistingItems = newItems.Where(x => exitingItems.All(y => y.Id != x.Id)).ToList();

            if (!notExistingItems.Any())
                return;

            foreach (var item in notExistingItems)
            {
                item.Key.CreateMd5();
                await _enumBaseRepository.CreateAsync(item);
            }

            await _enumBaseRepository.SaveAsync();

            foreach (var notExistingItem in notExistingItems)
            {
                _enumBaseRepository.Detach(notExistingItem);
            }
        }
    }
}
