using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.Services.Contracts
{
    public interface ILibraryService
    {
        Task<Library> GetLibTypes(string searchString);
        Task<ICollection<LibraryNodeItem>> GetNodeTypes();
        Task<ICollection<LibraryTransportItem>> GetTransportTypes();
        Task<ICollection<LibraryInterfaceItem>> GetInterfaceTypes();
        Task<ICollection<LibrarySubProjectItem>> GetSubProjects(string searchString = null);
    }
}
