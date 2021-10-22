using System.Collections.Generic;
using Mb.Models.Application;

namespace Mb.Services.Contracts
{
    public interface ILibraryService
    {
        Library GetLibTypes(string searchString);
        IEnumerable<LibraryNodeItem> GetNodeTypes();
        IEnumerable<LibraryTransportItem> GetTransportTypes();
        IEnumerable<LibraryInterfaceItem> GetInterfaceTypes();
        IEnumerable<LibrarySubProjectItem> GetSubProjects(string searchString = null);
    }
}
