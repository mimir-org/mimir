using System.Threading.Tasks;
using Mb.Models.Client;
using Mimirorg.Common.Exceptions;

namespace Mb.Services.Contracts;

public interface IBlockService
{
    /// <summary>
    /// Get an block by Id. The block will include all connectors and attributes.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The block</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the block does not exist</exception>
    Task<BlockCm> Get(string id);
}