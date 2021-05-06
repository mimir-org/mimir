using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models;

namespace Mb.Core.Services
{
    public interface ITypeEditorService
    {
        Dictionary<int, string> GetAspects();
        Dictionary<int, string> GetObjectTypes();
        IEnumerable<Rds> GetRds();
        IEnumerable<AttributeType> GetAttributeTypes();
        IEnumerable<Terminal> GetTerminals();
        Task<LibraryTypeComponent> CreateLibraryComponent(LibraryTypeComponent libraryTypeComponent);

        Task LoadDataFromFiles();

    }
}
