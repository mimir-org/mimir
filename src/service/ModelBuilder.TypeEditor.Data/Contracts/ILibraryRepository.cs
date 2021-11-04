﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface ILibraryRepository
    {
        Task<IEnumerable<LibraryNodeItem>> GetNodeTypes(string searchString = null);
        Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null);
        Task<IEnumerable<LibraryTransportItem>> GetTransportTypes(string searchString = null);
        Task<T> GetLibraryItem<T>(string id) where T : class, new();
    }
}
