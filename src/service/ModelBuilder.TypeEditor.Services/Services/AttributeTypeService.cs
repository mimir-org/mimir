﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mb.TypeEditor.Data.Contracts;
using Mb.TypeEditor.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.TypeEditor.Services.Services
{
    public class AttributeTypeService : IAttributeTypeService
    {
        private readonly IMapper _mapper;
        private readonly IPredefinedAttributeRepository _predefinedAttributeRepository;
        private readonly IAttributeTypeRepository _attributeTypeRepository;
        private readonly IEnumBaseRepository _enumBaseRepository;

        public AttributeTypeService(IMapper mapper, IPredefinedAttributeRepository predefinedAttributeRepository, IAttributeTypeRepository attributeTypeRepository, IEnumBaseRepository enumBaseRepository)
        {
            _mapper = mapper;
            _predefinedAttributeRepository = predefinedAttributeRepository;
            _attributeTypeRepository = attributeTypeRepository;
            _enumBaseRepository = enumBaseRepository;
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
                all.Where(x => x.Aspect.HasFlag(aspect)).ToList();
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
        public async Task<ICollection<AttributeType>> CreateAttributeTypes(List<CreateAttributeType> createAttributeTypes)
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
        /// Get predefined attributes
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PredefinedAttributeAm> GetPredefinedAttributes()
        {
            var all = _predefinedAttributeRepository.GetAll().ToList();
            return _mapper.Map<List<PredefinedAttributeAm>>(all);
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
    }
}
