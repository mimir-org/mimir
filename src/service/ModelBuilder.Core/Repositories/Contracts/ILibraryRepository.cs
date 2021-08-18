using System.Collections.Generic;
using Mb.Models.Application;

namespace Mb.Core.Repositories.Contracts
{
    public interface ILibraryRepository
    {
        IEnumerable<LibraryNodeItem> GetNodeTypes(string searchString = null);
        IEnumerable<LibraryInterfaceItem> GetInterfaceTypes(string searchString = null);
        IEnumerable<LibraryTransportItem> GetTransportTypes(string searchString = null);
    }
}
