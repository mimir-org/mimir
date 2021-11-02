using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.Services.Contracts
{
    public interface ILibraryService
    {
        Task<Library> GetLibTypes(string searchString);
        Task<IEnumerable<LibraryNodeItem>> GetNodeTypes();
        Task<IEnumerable<LibraryTransportItem>> GetTransportTypes();
        Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes();
        Task<IEnumerable<LibrarySubProjectItem>> GetSubProjects(string searchString = null);
    }
}
