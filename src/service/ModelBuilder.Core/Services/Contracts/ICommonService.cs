using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.Mimir;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<Contractor> GetAllContractors();
        Task<BlobData> CreateBlobData(BlobDataAm blobData, bool saveData = true);
        Task<IEnumerable<BlobData>> CreateBlobData(IEnumerable<BlobDataAm> blobDataList);
        Task<BlobData> UpdateBlobData(BlobDataAm blobData);
        IEnumerable<BlobDataAm> GetBlobData();
        IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters();
    }
}
