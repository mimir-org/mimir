using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.TypeEditor;

namespace Mb.TypeEditor.Services.Contracts
{
    public interface IRdsService
    {
        IEnumerable<Rds> GetRds();
        Task<Rds> CreateRds(CreateRds createRds);
        Task<List<Rds>> CreateRdsAsync(List<CreateRds> createRds);
    }
}