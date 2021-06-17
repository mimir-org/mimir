using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        public const string QualifierFileName = "qualifier";
        public const string SourceFileName = "source";
        public const string RdsCategoryFileName = "rdscategory";
        public const string TerminalCategoryFileName = "termcategory";
        public const string AttributeFormatFileName = "format";
        public const string BuildStatusFileName = "buildstatus";

        private readonly IFileRepository _fileRepository;
        private readonly IRdsRepository _rdsRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ILibraryTypeRepository _libraryTypeComponentRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IContractorRepository _contractorRepository;
        private readonly ITerminalTypeRepository _terminalTypeRepository;
        private readonly IEnumBaseRepository _enumBaseRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TypeEditorService> _logger;

        public TypeEditorService(IFileRepository fileRepository, IRdsRepository rdsRepository, IAttributeTypeRepository attributeTypeRepository, ILibraryTypeRepository libraryTypeComponentRepository, ICommonRepository commonRepository, IContractorRepository contractorRepository, ITerminalTypeRepository terminalTypeRepository, IEnumBaseRepository enumBaseRepository, IMapper mapper, ILogger<TypeEditorService> logger)
        {
            _fileRepository = fileRepository;
            _rdsRepository = rdsRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _commonRepository = commonRepository;
            _contractorRepository = contractorRepository;
            _terminalTypeRepository = terminalTypeRepository;
            _enumBaseRepository = enumBaseRepository;
            _mapper = mapper;
            _logger = logger;
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
        /// Get all RDS by aspect
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        public IEnumerable<Rds> GetRds(Aspect aspect)
        {
            var all = _rdsRepository.GetAll().Include(x => x.RdsCategory).ToList();
            return aspect == Aspect.NotSet ?
                all :
                all.Where(x => x.Aspect.HasFlag(aspect));
        }

        /// <summary>
        /// Get all attribute files by aspect
        /// </summary>
        /// <param name="aspect"></param>
        /// <returns></returns>
        public IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect)
        {
            var all = _attributeTypeRepository.GetAll()
                .Include(x => x.Qualifier)
                .Include(x => x.Source)
                .Include(x => x.Condition)
                .Include(x => x.Format)
                .ToList();
            return aspect == Aspect.NotSet ?
                all :
                all.Where(x => x.Aspect.HasFlag(aspect));
        }

        /// <summary>
        /// Get all terminals
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TerminalType> GetTerminals()
        {
            return _terminalTypeRepository.GetAll()
                .Include(x => x.TerminalCategory)
                .Include(x => x.Attributes)
                .ToList();
        }


        /// <summary>
        /// Create a library component
        /// </summary>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryType> CreateLibraryType(CreateLibraryType createLibraryType)
        {
            if (createLibraryType == null)
                return null;

            var data = await CreateLibraryTypes(new List<CreateLibraryType> {createLibraryType});
            return data?.SingleOrDefault();
        }

        /// <summary>
        /// Create library components
        /// </summary>
        /// <param name="createLibraryTypes"></param>
        /// <returns></returns>
        public async Task<IEnumerable<LibraryType>> CreateLibraryTypes(List<CreateLibraryType> createLibraryTypes)
        {
            var createdLibraryTypes = new List<LibraryType>();

            if (createLibraryTypes == null || !createLibraryTypes.Any())
                return createdLibraryTypes;

            foreach (var createLibraryType in createLibraryTypes)
            {
                LibraryType libraryType = createLibraryType.ObjectType switch
                {
                    ObjectType.ObjectBlock => _mapper.Map<Models.Data.NodeType>(createLibraryType),
                    ObjectType.Interface => _mapper.Map<InterfaceType>(createLibraryType),
                    ObjectType.Transport => _mapper.Map<TransportType>(createLibraryType),
                    _ => null
                };

                if (libraryType?.Id == null)
                    return null;

                var existingType = await _libraryTypeComponentRepository.GetAsync(libraryType.Id);
                if (existingType != null)
                    throw new ModelBuilderDuplicateException($"The type with id:{libraryType.Id} already exist.");

                switch (libraryType)
                {
                    case Models.Data.NodeType nt:
                    {
                        foreach (var attributeType in nt.AttributeTypes)
                        {
                            _attributeTypeRepository.Attach(attributeType, EntityState.Unchanged);
                        }

                        await _libraryTypeComponentRepository.CreateAsync(nt);
                        await _libraryTypeComponentRepository.SaveAsync();

                        foreach (var attributeType in nt.AttributeTypes)
                        {
                            _attributeTypeRepository.Detach(attributeType);
                        }

                        createdLibraryTypes.Add(nt);
                        continue;
                    }
                    case InterfaceType it:
                        await _libraryTypeComponentRepository.CreateAsync(it);
                        await _libraryTypeComponentRepository.SaveAsync();
                        createdLibraryTypes.Add(it);
                        continue;
                    case TransportType tt:
                    {
                        foreach (var attributeType in tt.AttributeTypes)
                        {
                            _attributeTypeRepository.Attach(attributeType, EntityState.Unchanged);
                        }

                        await _libraryTypeComponentRepository.CreateAsync(tt);
                        await _libraryTypeComponentRepository.SaveAsync();

                        foreach (var attributeType in tt.AttributeTypes)
                        {
                            _attributeTypeRepository.Detach(attributeType);
                        }

                        createdLibraryTypes.Add(tt);
                        continue;
                    }
                    default:
                        continue;
                }
            }

            return createdLibraryTypes;
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
                //component.CreateFromJsonData(); // TODO: Fix this
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
            try
            {
                var fileList = _fileRepository.ReadJsonFileList().ToList();

                if (!fileList.Any())
                    return;

                //var libraryFiles = fileList.Where(x => x.ToLower().Contains(LibraryFileName)).ToList();

                var unitFiles = fileList.Where(x => x.ToLower().Contains(UnitFileName)).ToList();
                var conditionFiles = fileList.Where(x => x.ToLower().Contains(ConditionFileName)).ToList();
                var qualifierFiles = fileList.Where(x => x.ToLower().Contains(QualifierFileName)).ToList();
                var sourceFiles = fileList.Where(x => x.ToLower().Contains(SourceFileName)).ToList();
                var rdsCategoryFiles = fileList.Where(x => x.ToLower().Contains(RdsCategoryFileName)).ToList();
                var terminalCategoryFiles = fileList.Where(x => x.ToLower().Contains(TerminalCategoryFileName)).ToList();
                var attributeFormatFiles = fileList.Where(x => x.ToLower().Contains(AttributeFormatFileName)).ToList();
                var buildStatusFiles = fileList.Where(x => x.ToLower().Contains(BuildStatusFileName)).ToList();



                var contractorFiles = fileList.Where(x => x.ToLower().Contains(ContractorFileName)).ToList();
                var attributeFiles = fileList.Where(x => x.ToLower().Contains(AttributeFileName)).ToList();
                var terminalFiles = fileList.Where(x => x.ToLower().Contains(TerminalFileName)).ToList();
                var rdsFiles = fileList.Where(x => x.ToLower().Equals(RdsFileName)).ToList();

                //var libraries = _fileRepository.ReadAllFiles<LibraryType>(libraryFiles).ToList();

                var units = _fileRepository.ReadAllFiles<Unit>(unitFiles).ToList();
                var conditions = _fileRepository.ReadAllFiles<AttributeCondition>(conditionFiles).ToList();
                var qualifiers = _fileRepository.ReadAllFiles<AttributeQualifier>(qualifierFiles).ToList();
                var sources = _fileRepository.ReadAllFiles<AttributeSource>(sourceFiles).ToList();
                var rdsCategories = _fileRepository.ReadAllFiles<RdsCategory>(rdsCategoryFiles).ToList();
                var terminalCategories = _fileRepository.ReadAllFiles<TerminalCategory>(terminalCategoryFiles).ToList();
                var attributeFormats = _fileRepository.ReadAllFiles<AttributeFormat>(attributeFormatFiles).ToList();
                var buildStatuses = _fileRepository.ReadAllFiles<BuildStatus>(buildStatusFiles).ToList();



                var contractors = _fileRepository.ReadAllFiles<Contractor>(contractorFiles).ToList();
                var attributes = _fileRepository.ReadAllFiles<CreateAttributeType>(attributeFiles).ToList();
                var terminals = _fileRepository.ReadAllFiles<CreateTerminalType>(terminalFiles).ToList();
                var rds = _fileRepository.ReadAllFiles<CreateRds>(rdsFiles).ToList();


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

                await CreateContractorsAsync(contractors);
                await CreateAttributeTypes(attributes);
                await CreateTerminalTypes(terminals);
                await CreateRdsAsync(rds);
            }
            catch (Exception e)
            {
                _logger.LogError($"Could not create initial data from file: error: {e.Message}");
            }
        }

        /// <summary>
        /// Delete a type
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteType(string id)
        {
            var existingType = await GetTypeById(id);
            if (existingType == null)
                throw new ModelBuilderNotFoundException($"Could not delete type with id: {id}. The type was not found.");

            await _libraryTypeComponentRepository.Delete(id);
            await _libraryTypeComponentRepository.SaveAsync();
        }

        /// <summary>
        /// Create an attribute type
        /// </summary>
        /// <param name="createAttributeType"></param>
        /// <returns></returns>
        public async Task<AttributeType> CreateAttributeType(CreateAttributeType createAttributeType)
        {
            var data = await CreateAttributeTypes(new List<CreateAttributeType> { createAttributeType });
            return data.SingleOrDefault();
        }

        /// <summary>
        /// Create from a list of attribute types
        /// </summary>
        /// <param name="createAttributeTypes"></param>
        /// <returns></returns>
        public async Task<List<AttributeType>> CreateAttributeTypes(List<CreateAttributeType> createAttributeTypes)
        {
            if (createAttributeTypes == null || !createAttributeTypes.Any())
                return new List<AttributeType>();

            var data = _mapper.Map<List<AttributeType>>(createAttributeTypes);
            var existing = _attributeTypeRepository.GetAll().ToList();
            var notExisting = data.Where(x => existing.All(y => y.Id != x.Id)).ToList();

            if (!notExisting.Any())
                return new List<AttributeType>();

            foreach (var entity in notExisting)
            {
                foreach (var entityUnit in entity.Units)
                {
                    _enumBaseRepository.Attach(entityUnit, EntityState.Unchanged);
                }

                await _attributeTypeRepository.CreateAsync(entity);
                await _attributeTypeRepository.SaveAsync();

                foreach (var entityUnit in entity.Units)
                {
                    _enumBaseRepository.Detach(entityUnit);
                }
            }

            foreach (var notExistingItem in notExisting)
            {
                _attributeTypeRepository.Detach(notExistingItem);
            }

            return data;
        }

        /// <summary>
        /// Create a terminal type
        /// </summary>
        /// <param name="createTerminalType"></param>
        /// <returns></returns>
        public async Task<TerminalType> CreateTerminalType(CreateTerminalType createTerminalType)
        {
            var data = await CreateTerminalTypes(new List<CreateTerminalType> { createTerminalType });
            return data.SingleOrDefault();
        }

        /// <summary>
        /// Create from a list of terminal types
        /// </summary>
        /// <param name="createTerminalTypes"></param>
        /// <returns></returns>
        public async Task<List<TerminalType>> CreateTerminalTypes(List<CreateTerminalType> createTerminalTypes)
        {
            if (createTerminalTypes == null || !createTerminalTypes.Any())
                return new List<TerminalType>();

            var data = _mapper.Map<List<TerminalType>>(createTerminalTypes);
            var existing = _terminalTypeRepository.GetAll().ToList();
            var notExisting = data.Where(x => existing.All(y => y.Id != x.Id)).ToList();

            if (!notExisting.Any())
                return new List<TerminalType>();

            foreach (var entity in notExisting)
            {
                foreach (var entityAttribute in entity.Attributes)
                {
                    _attributeTypeRepository.Attach(entityAttribute, EntityState.Unchanged);
                }

                await _terminalTypeRepository.CreateAsync(entity);
                await _terminalTypeRepository.SaveAsync();

                foreach (var entityAttribute in entity.Attributes)
                {
                    _attributeTypeRepository.Detach(entityAttribute);
                }
            }

            return data;
        }

        /// <summary>
        /// Create a RDS
        /// </summary>
        /// <param name="createRds"></param>
        /// <returns></returns>
        public async Task<Rds> CreateRds(CreateRds createRds)
        {
            var data = await CreateRdsAsync(new List<CreateRds> { createRds });
            return data.SingleOrDefault();
        }

        /// <summary>
        /// Create RDS from a list
        /// </summary>
        /// <param name="createRds"></param>
        /// <returns></returns>
        public async Task<List<Rds>> CreateRdsAsync(List<CreateRds> createRds)
        {
            if (createRds == null || !createRds.Any())
                return new List<Rds>();

            var data = _mapper.Map<List<Rds>>(createRds);

            var existing = _rdsRepository.GetAll().ToList();
            var notExisting = data.Where(x => existing.All(y => y.Id != x.Id)).ToList();

            if (!notExisting.Any())
                return new List<Rds>();

            foreach (var entity in notExisting)
            {
                await _rdsRepository.CreateAsync(entity);
            }
            await _rdsRepository.SaveAsync();
            return data;
        }

        #endregion

        #region Private methods

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
                //item.CreateJsonData(); // TODO: Fix this
                //item.TerminalCategory = _commonRepository.GetCategory(item.Terminal); // TODO: Fix this
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
                //item.CreateJsonData(); // TODO: Fix this
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

        #endregion
    }
}
