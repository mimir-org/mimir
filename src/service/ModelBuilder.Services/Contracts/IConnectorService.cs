using System.Threading.Tasks;
using Mb.Models.Client;
using Mimirorg.Common.Exceptions;

namespace Mb.Services.Contracts;

public interface IConnectorService
{
    /// <summary>
    /// Get a connector by Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The aspect object</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the aspect object does not exist</exception>
    Task<ConnectorCm> Get(string id);
}