using System.Collections.Generic;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
{
    public interface ILibraryService
    {
        IEnumerable<LibraryNodeItem> GetLibNodes(string searchString);
        IEnumerable<LibraryTransportItem> GetTransportTypes();
        IEnumerable<LibraryInterfaceItem> GetInterfaceTypes();
    }
}
