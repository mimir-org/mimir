using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
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
