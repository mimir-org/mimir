using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Mb.TypeEditor.Core.Contracts
{
    public interface ILibraryTypeFileService
    {
        Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken);
        byte[] CreateFile();
    }
}
