using System;
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
    /// <returns>The block</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the block does not exist</exception>
    Task<ConnectorResponse> Get(Guid id);
}