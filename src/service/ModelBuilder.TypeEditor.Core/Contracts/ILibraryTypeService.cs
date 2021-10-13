using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.TypeEditor.Core.Contracts
{
    public interface ILibraryTypeService
    {
        Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false);
        Task<IEnumerable<LibraryType>> CreateLibraryTypes(ICollection<CreateLibraryType> createLibraryTypes);
        Task<T> CreateLibraryType<T>(CreateLibraryType createLibraryType) where T : class, new();
        Task<T> UpdateLibraryType<T>(string id, CreateLibraryType createLibraryType) where T : class, new();
        IEnumerable<CreateLibraryType> GetAllTypes();
        Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter);
        Task DeleteType(string id);
    }
}
