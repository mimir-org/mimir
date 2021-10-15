using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application.Mimir;
using Mb.Models.Data;

namespace Mb.TypeEditor.Services.Contracts
{
    public interface IBlobDataService
    {
        Task<BlobData> CreateBlobData(BlobDataAm blobData, bool saveData = true);
        Task<IEnumerable<BlobData>> CreateBlobData(IEnumerable<BlobDataAm> blobDataList);
        Task<BlobData> UpdateBlobData(BlobDataAm blobData);
        IEnumerable<BlobDataAm> GetBlobData();
    }
}
