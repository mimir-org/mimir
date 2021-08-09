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
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Mb.Core.Services
{
    public class TypeEditorService : ITypeEditorService
    {
        private readonly IRdsRepository _rdsRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ILibraryTypeRepository _libraryTypeComponentRepository;
        private readonly IContractorRepository _contractorRepository;
        private readonly ITerminalTypeRepository _terminalTypeRepository;
        private readonly IEnumBaseRepository _enumBaseRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TypeEditorService> _logger;
        private readonly IPredefinedAttributeRepository _predefinedAttributeRepository;

        public TypeEditorService(IRdsRepository rdsRepository, IAttributeTypeRepository attributeTypeRepository, ILibraryTypeRepository libraryTypeComponentRepository, IContractorRepository contractorRepository, ITerminalTypeRepository terminalTypeRepository, IEnumBaseRepository enumBaseRepository, IMapper mapper, ILogger<TypeEditorService> logger, IPredefinedAttributeRepository predefinedAttributeRepository)
        {
            _rdsRepository = rdsRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _contractorRepository = contractorRepository;
            _terminalTypeRepository = terminalTypeRepository;
            _enumBaseRepository = enumBaseRepository;
            _mapper = mapper;
            _logger = logger;
            _predefinedAttributeRepository = predefinedAttributeRepository;
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
        /// Get predefined attributes
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PredefinedAttributeAm> GetPredefinedAttributes()
        {
            var all = _predefinedAttributeRepository.GetAll().ToList();
            return _mapper.Map<List<PredefinedAttributeAm>>(all);
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
                .Include(x => x.Units)
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
        /// Get all terminals
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, List<TerminalType>> GetTerminalsByCategory()
        {
            return _terminalTypeRepository.GetAll()
                .Include(x => x.TerminalCategory)
                .Include(x => x.Attributes)
                .AsEnumerable()
                .GroupBy(x => x.TerminalCategory.Name)
                .ToDictionary(g => g.Key, g => g.ToList());
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
        /// Update a library type based on id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<LibraryType> UpdateLibraryType(string id, CreateLibraryType createLibraryType)
        {
            if (string.IsNullOrEmpty(id))
                throw new ModelBuilderNullReferenceException("Can't update a type without an id");

            if (createLibraryType == null)
                throw new ModelBuilderNullReferenceException("Can't update a null type");

            var existingType = await GetTypeById(id);
            if (existingType == null)
                throw new ModelBuilderNotFoundException($"There is no type with id:{id} to update.");

            await DeleteType(id);
            var createdType = await CreateLibraryType(createLibraryType);
            return createdType;
        }

        /// <summary>
        /// Create library components
        /// </summary>
        /// <param name="createLibraryTypes"></param>
        /// <returns></returns>
        public async Task<IEnumerable<LibraryType>> CreateLibraryTypes(ICollection<CreateLibraryType> createLibraryTypes)
        {
            var createdLibraryTypes = new List<LibraryType>();

            if (createLibraryTypes == null || !createLibraryTypes.Any())
                return createdLibraryTypes;

            foreach (var createLibraryType in createLibraryTypes)
            {
                if (createLibraryType.Aspect == Aspect.Location)
                    createLibraryType.ObjectType = ObjectType.ObjectBlock;

                LibraryType libraryType = createLibraryType.ObjectType switch
                {
                    ObjectType.ObjectBlock => _mapper.Map<NodeType>(createLibraryType),
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
                    case NodeType nt:
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
        public IEnumerable<CreateLibraryType> GetAllTypes()
        {
            var nodeTypes = _libraryTypeComponentRepository
                .GetAll()
                .OfType<NodeType>()
                .Include(x => x.TerminalTypes)
                .Include(x => x.AttributeTypes)
                .ToList();

            var transportTypes = _libraryTypeComponentRepository
                .GetAll()
                .OfType<TransportType>()
                .Include(x => x.AttributeTypes)
                .ToList();

            var interfaceType = _libraryTypeComponentRepository
                .GetAll()
                .OfType<InterfaceType>()
                .ToList();

            foreach (var clt in nodeTypes.Select(x => _mapper.Map<CreateLibraryType>(x)))
            {
                yield return clt;
            }

            foreach (var clt in transportTypes.Select(x => _mapper.Map<CreateLibraryType>(x)))
            {
                yield return clt;
            }

            foreach (var clt in interfaceType.Select(x => _mapper.Map<CreateLibraryType>(x)))
            {
                yield return clt;
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

        /// <summary>
        /// Create Predefined attributes from a list
        /// </summary>
        /// <param name="attributes"></param>
        /// <returns></returns>
        public async Task<List<PredefinedAttribute>> CreatePredefinedAttributes(List<PredefinedAttribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return new List<PredefinedAttribute>();

            var existing = _predefinedAttributeRepository.GetAll().ToList();
            var notExisting = attributes.Where(x => existing.All(y => y.Key != x.Key)).ToList();

            if (!notExisting.Any())
                return new List<PredefinedAttribute>();

            foreach (var entity in notExisting)
            {
                await _predefinedAttributeRepository.CreateAsync(entity);
            }
            await _predefinedAttributeRepository.SaveAsync();
            return attributes;
        }

        public async Task CreateContractorsAsync(IEnumerable<Contractor> contractors)
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

        #endregion
    }
}
