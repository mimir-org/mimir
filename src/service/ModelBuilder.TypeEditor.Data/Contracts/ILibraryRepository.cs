using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface ILibraryRepository
    {
        Task<ICollection<LibraryNodeItem>> GetNodeTypes(string searchString = null);
        Task<ICollection<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null);
        Task<ICollection<LibraryTransportItem>> GetTransportTypes(string searchString = null);
        Task<T> GetLibraryItem<T>(string id) where T : class, new();
    }
}
