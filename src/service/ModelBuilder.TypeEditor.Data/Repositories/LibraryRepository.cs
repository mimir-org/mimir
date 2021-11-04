﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application;
using Mb.TypeEditor.Data.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.TypeEditor.Data.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly ITransportTypeRepository _transportTypeRepository;
        private readonly IInterfaceTypeRepository _interfaceTypeRepository;
        private readonly INodeTypeRepository _nodeTypeRepository;
        private readonly IMapper _mapper;

        public LibraryRepository(IMapper mapper, ITransportTypeRepository transportTypeRepository,
            IInterfaceTypeRepository interfaceTypeRepository, INodeTypeRepository nodeTypeRepository)
        {
            _mapper = mapper;
            _transportTypeRepository = transportTypeRepository;
            _interfaceTypeRepository = interfaceTypeRepository;
            _nodeTypeRepository = nodeTypeRepository;
        }

        public async Task<IEnumerable<LibraryNodeItem>> GetNodeTypes(string searchString = null)
        {
            var nodeTypes = await _nodeTypeRepository.GetAll()
                .Include(x => x.AttributeTypes)
                .Include("AttributeTypes.Units")
                .Include(x => x.TerminalTypes)
                .Include("TerminalTypes.TerminalType")
                .Include("TerminalTypes.TerminalType.TerminalCategory")
                .Include("TerminalTypes.TerminalType.Attributes")
                .Include("TerminalTypes.TerminalType.Attributes.Units")
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .Include(x => x.CompositeTypes)
                .Include("CompositeTypes.AttributeTypes")
                .Include("CompositeTypes.AttributeTypes.Units")
                .Include(x => x.Purpose)
                .AsSplitQuery()
                .ToArrayAsync();

            if (!string.IsNullOrWhiteSpace(searchString))
                nodeTypes = nodeTypes.Where(x => x.Name.ToLower().Contains(searchString.ToLower())).ToArray();

            var libraryNodeItems = new List<LibraryNodeItem>();

            Parallel.ForEach(nodeTypes, x =>
            {
                libraryNodeItems.Add(_mapper.Map<LibraryNodeItem>(x));
            });

            return libraryNodeItems;
        }

        public async Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null)
        {

            var interfaceTypes = await _interfaceTypeRepository.GetAll()
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .Include(x => x.Purpose)
                .OrderBy(x => x.Name)
                .AsSplitQuery()
                .ToArrayAsync();

            if (!string.IsNullOrWhiteSpace(searchString))
                interfaceTypes = interfaceTypes.Where(x => x.Name.ToLower().Contains(searchString.ToLower())).ToArray();

            var libraryInterfaceItem = new List<LibraryInterfaceItem>();

            Parallel.ForEach(interfaceTypes, x =>
            {
                libraryInterfaceItem.Add(_mapper.Map<LibraryInterfaceItem>(x));
            });

            return libraryInterfaceItem;
        }

        public async Task<IEnumerable<LibraryTransportItem>> GetTransportTypes(string searchString = null)
        {
            var transportTypes = await _transportTypeRepository.GetAll()
                .Include(x => x.AttributeTypes)
                .Include(x => x.Rds)
                .Include("Rds.RdsCategory")
                .Include(x => x.Purpose)
                .OrderBy(x => x.Name)
                .AsSplitQuery()
                .ToArrayAsync();

            if (!string.IsNullOrWhiteSpace(searchString))
                transportTypes = transportTypes.Where(x => x.Name.ToLower().Contains(searchString.ToLower())).ToArray();

            var libraryTransportItems = new List<LibraryTransportItem>();

            Parallel.ForEach(transportTypes, x =>
            {
                libraryTransportItems.Add(_mapper.Map<LibraryTransportItem>(x));
            });

            return libraryTransportItems;
        }

        public async Task<T> GetLibraryItem<T>(string id) where T : class, new()
        {
            if (typeof(LibraryNodeItem).IsAssignableFrom(typeof(T)))
            {
                var nodeType = await _nodeTypeRepository.FindBy(x => x.Id == id)
                    .Include(x => x.AttributeTypes)
                    .Include("AttributeTypes.Units")
                    .Include(x => x.TerminalTypes)
                    .Include("TerminalTypes.TerminalType")
                    .Include("TerminalTypes.TerminalType.TerminalCategory")
                    .Include("TerminalTypes.TerminalType.Attributes")
                    .Include("TerminalTypes.TerminalType.Attributes.Units")
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.CompositeTypes)
                    .Include("CompositeTypes.AttributeTypes")
                    .Include("CompositeTypes.AttributeTypes.Units")
                    .Include(x => x.Purpose)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                return _mapper.Map<T>(nodeType);
            }

            if (typeof(LibraryInterfaceItem).IsAssignableFrom(typeof(T)))
            {
                var interfaceType = await _interfaceTypeRepository.FindBy(x => x.Id == id)
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.Purpose)
                    .OrderBy(x => x.Name)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                return _mapper.Map<T>(interfaceType);
            }

            if (typeof(LibraryTransportItem).IsAssignableFrom(typeof(T)))
            {
                var transportType = await _transportTypeRepository.FindBy(x => x.Id == id)
                    .Include(x => x.AttributeTypes)
                    .Include(x => x.Rds)
                    .Include("Rds.RdsCategory")
                    .Include(x => x.Purpose)
                    .OrderBy(x => x.Name)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync();

                return _mapper.Map<T>(transportType);
            }

            return null;
        }
    }
}