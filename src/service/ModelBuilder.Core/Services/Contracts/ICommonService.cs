using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<Contractor> GetAllContractors();
        Task<BlobDataAm> CreateBlobData(BlobDataAm blobData);
        Task<BlobDataAm> UpdateBlobData(BlobDataAm blobData);
        IEnumerable<BlobDataAm> GetBlobData();
    }
}
