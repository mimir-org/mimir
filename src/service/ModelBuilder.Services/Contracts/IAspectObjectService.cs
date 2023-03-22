using System.Threading.Tasks;
using Mb.Models.Client;
using Mimirorg.Common.Exceptions;

namespace Mb.Services.Contracts;

public interface IAspectObjectService
{
    /// <summary>
    /// Get an aspect object by Id. The aspect object will include all connectors and attributes.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The aspect object</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the aspect object does not exist</exception>
    Task<AspectObjectCm> Get(string id);
}