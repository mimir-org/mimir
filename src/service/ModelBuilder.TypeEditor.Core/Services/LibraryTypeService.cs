﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.TypeEditor.Core.Contracts;
using Mb.TypeEditor.Data.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.TypeEditor.Core.Services
{
    public class LibraryTypeService : ILibraryTypeService
    {
        private readonly INodeTypeTerminalTypeRepository _nodeTypeTerminalTypeRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly ILibraryTypeRepository _libraryTypeComponentRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly ICompositeTypeRepository _compositeTypeRepository;
        private readonly IMapper _mapper;

        public LibraryTypeService(INodeTypeTerminalTypeRepository nodeTypeTerminalTypeRepository, ILibraryRepository libraryRepository, ILibraryTypeRepository libraryTypeComponentRepository, IAttributeTypeRepository attributeTypeRepository, ICompositeTypeRepository compositeTypeRepository, IMapper mapper)
        {
            _nodeTypeTerminalTypeRepository = nodeTypeTerminalTypeRepository;
            _libraryRepository = libraryRepository;
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _mapper = mapper;
            _attributeTypeRepository = attributeTypeRepository;
            _compositeTypeRepository = compositeTypeRepository;
        }

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

            if (libraryTypeComponent is NodeType)
            {
                return await _libraryTypeComponentRepository.FindBy(x => x.Id == id)
                    .OfType<NodeType>()
                    .Include(x => x.TerminalTypes)
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.CompositeTypes)
                    .ThenInclude(y => y.AttributeTypes)
                    .FirstOrDefaultAsync();
            }
            else if (libraryTypeComponent is TransportType)
            {
                return await _libraryTypeComponentRepository.FindBy(x => x.Id == id)
                    .OfType<TransportType>()
                    .Include(x => x.TerminalType)
                    .Include(x => x.AttributeTypes)
                    .FirstOrDefaultAsync();
            }
            else if (libraryTypeComponent is InterfaceType)
            {
                return await _libraryTypeComponentRepository.FindBy(x => x.Id == id)
                    .OfType<InterfaceType>()
                    .Include(x => x.TerminalType)
                    .FirstOrDefaultAsync();
            }

            return libraryTypeComponent;
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
                            if (nt.AttributeTypes != null && nt.AttributeTypes.Any())
                            {
                                foreach (var attributeType in nt.AttributeTypes)
                                {
                                    _attributeTypeRepository.Attach(attributeType, EntityState.Unchanged);
                                }
                            }

                            if (nt.CompositeTypes != null && nt.CompositeTypes.Any())
                            {
                                foreach (var compositeType in nt.CompositeTypes)
                                {
                                    _compositeTypeRepository.Attach(compositeType, EntityState.Unchanged);
                                }
                            }

                            await _libraryTypeComponentRepository.CreateAsync(nt);
                            await _libraryTypeComponentRepository.SaveAsync();

                            if (nt.AttributeTypes != null && nt.AttributeTypes.Any())
                            {
                                foreach (var attributeType in nt.AttributeTypes)
                                {
                                    _attributeTypeRepository.Detach(attributeType);
                                }
                            }

                            if (nt.CompositeTypes != null && nt.CompositeTypes.Any())
                            {
                                foreach (var compositeType in nt.CompositeTypes)
                                {
                                    _compositeTypeRepository.Detach(compositeType);
                                }
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
                            if (tt.AttributeTypes != null && tt.AttributeTypes.Any())
                            {
                                foreach (var attributeType in tt.AttributeTypes)
                                {
                                    _attributeTypeRepository.Attach(attributeType, EntityState.Unchanged);
                                }
                            }

                            await _libraryTypeComponentRepository.CreateAsync(tt);
                            await _libraryTypeComponentRepository.SaveAsync();

                            if (tt.AttributeTypes != null && tt.AttributeTypes.Any())
                            {
                                foreach (var attributeType in tt.AttributeTypes)
                                {
                                    _attributeTypeRepository.Detach(attributeType);
                                }
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
        /// Create a library component
        /// </summary>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<T> CreateLibraryType<T>(CreateLibraryType createLibraryType) where T : class, new()
        {
            if (createLibraryType == null)
                return null;

            var data = (await CreateLibraryTypes(new List<CreateLibraryType> { createLibraryType }))?.FirstOrDefault();
            if (data == null)
                throw new ModelBuilderNullReferenceException("Could not create type");

            var obj = await _libraryRepository.GetLibraryItem<T>(data.Id);
            return obj;
        }

        /// <summary>
        /// Update a library type based on id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="createLibraryType"></param>
        /// <returns></returns>
        public async Task<T> UpdateLibraryType<T>(string id, CreateLibraryType createLibraryType) where T : class, new()
        {
            if (string.IsNullOrEmpty(id))
                throw new ModelBuilderNullReferenceException("Can't update a type without an id");

            if (createLibraryType == null)
                throw new ModelBuilderNullReferenceException("Can't update a null type");

            var existingType = await GetTypeById(id);
            if (existingType == null)
                throw new ModelBuilderNotFoundException($"There is no type with id:{id} to update.");

            await DeleteType(id);
            return await CreateLibraryType<T>(createLibraryType);
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
                .Include("TerminalTypes.TerminalType")
                .Include(x => x.AttributeTypes)
                .Include(x => x.CompositeTypes)
                .ThenInclude(y => y.AttributeTypes)
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
        /// Convert a LibraryType to CreateLibraryType
        /// </summary>
        /// <param name="id"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        public async Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter)
        {
            switch (filter)
            {
                case LibraryFilter.Node:
                    var nodeItem = await _libraryTypeComponentRepository
                        .FindBy(x => x.Id == id)
                        .OfType<NodeType>()
                        .Include(x => x.TerminalTypes)
                        .Include("TerminalTypes.TerminalType")
                        .Include(x => x.AttributeTypes)
                        .Include(x => x.CompositeTypes)
                        .FirstOrDefaultAsync();

                    if (nodeItem == null)
                        throw new ModelBuilderNotFoundException($"There is no type with id: {id} and filter: {filter}");

                    return _mapper.Map<CreateLibraryType>(nodeItem);

                case LibraryFilter.Interface:
                    var interfaceItem = await _libraryTypeComponentRepository
                        .FindBy(x => x.Id == id)
                        .OfType<InterfaceType>()
                        .FirstOrDefaultAsync();

                    if (interfaceItem == null)
                        throw new ModelBuilderNotFoundException($"There is no type with id: {id} and filter: {filter}");

                    return _mapper.Map<CreateLibraryType>(interfaceItem);

                case LibraryFilter.Transport:
                    var transportItem = await _libraryTypeComponentRepository
                        .FindBy(x => x.Id == id)
                        .OfType<TransportType>()
                        .Include(x => x.AttributeTypes)
                        .FirstOrDefaultAsync();

                    if (transportItem == null)
                        throw new ModelBuilderNotFoundException($"There is no type with id: {id} and filter: {filter}");

                    return _mapper.Map<CreateLibraryType>(transportItem);

                default:
                    throw new ModelBuilderInvalidOperationException("Filter type mismatch");
            }
        }

        /// <summary>
        /// Create a simple type
        /// </summary>
        /// <param name="compositeType"></param>
        /// <returns></returns>
        public async Task<CompositeType> CreateCompositeType(CompositeTypeAm compositeType)
        {
            var newType = _mapper.Map<CompositeType>(compositeType);
            var existingType = await _compositeTypeRepository.GetAsync(newType.Id);
            if (existingType != null)
                throw new ModelBuilderDuplicateException($"Type with name {compositeType.Name} already exist.");

            foreach (var attribute in newType.AttributeTypes)
            {
                _attributeTypeRepository.Attach(attribute, EntityState.Unchanged);
            }

            await _compositeTypeRepository.CreateAsync(newType);
            await _compositeTypeRepository.SaveAsync();
            return newType;
        }

        /// <summary>
        /// Get all simple types
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CompositeType> GetCompositeTypes()
        {
            var types = _compositeTypeRepository.GetAll().Include(x => x.AttributeTypes).ToList();
            return types;
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

            if (existingType is NodeType typeToDelete)
            {
                foreach (var terminalType in typeToDelete.TerminalTypes)
                {
                    _nodeTypeTerminalTypeRepository.Attach(terminalType, EntityState.Deleted);
                }

                await _nodeTypeTerminalTypeRepository.SaveAsync();
            }

            //_libraryTypeComponentRepository.Attach(existingType, EntityState.Deleted);
            await _libraryTypeComponentRepository.Delete(existingType.Id);
            await _libraryTypeComponentRepository.SaveAsync();
        }

        
    }
}
