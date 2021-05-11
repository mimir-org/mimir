using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Services.Contracts
{
    public interface ITypeEditorService
    {
        Dictionary<int, string> GetAspects();
        Dictionary<int, string> GetObjectTypes();
        IEnumerable<Rds> GetRds(Aspect aspect);
        IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect);
        IEnumerable<Terminal> GetTerminals();
        Task<LibraryTypeComponent> CreateLibraryComponent(LibraryTypeComponent libraryTypeComponent);
        IEnumerable<LibraryTypeComponent> GetAllTypes();
        byte[] CreateFile();
        Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken);
        Task LoadDataFromFiles();

    }
}
