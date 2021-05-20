using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<Contractor> GetAllContractors();
    }
}
