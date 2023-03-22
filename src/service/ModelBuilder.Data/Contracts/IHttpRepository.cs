using System.Threading.Tasks;
using Mimirorg.Common.Exceptions;

namespace Mb.Data.Contracts;

public interface IHttpRepository
{
    /// <summary>
    /// Get http data on given type
    /// </summary>
    /// <typeparam name="T">The response type</typeparam>
    /// <param name="uri">Uri or url to external service</param>
    /// <returns>Type T</returns>
    /// <exception cref="MimirorgInvalidOperationException">Throws if status code is not success or could not cast object as T</exception>
    Task<T> GetData<T>(string uri) where T : class, new();

    /// <summary>
    /// Post http data with given type and given return type
    /// </summary>
    /// <typeparam name="TRet">The response type</typeparam>
    /// <typeparam name="TObj">The type of object to send</typeparam>
    /// <param name="uri">Uri to service</param>
    /// <param name="data">Data to send</param>
    /// <returns>Type TRet</returns>
    /// <exception cref="MimirorgInvalidOperationException">Throws if status code is not success or could not cast object as TRet</exception>
    Task<TRet> PostData<TRet, TObj>(string uri, TObj data) where TRet : class, new() where TObj : class, new();

    /// <summary>
    /// Put http data with given type and given return type
    /// </summary>
    /// <typeparam name="TRet">The response type</typeparam>
    /// <typeparam name="TObj">The type of object to send</typeparam>
    /// <param name="uri">Uri to service</param>
    /// <param name="data">Data to send</param>
    /// <returns>Type TRet</returns>
    Task<TRet> PutData<TRet, TObj>(string uri, TObj data) where TRet : class, new() where TObj : class, new();

    /// <summary>
    /// Delete http data with given type and given return type
    /// </summary>
    /// <typeparam name="TRet">The response type</typeparam>
    /// <param name="uri">Uri to service</param>
    /// <returns>Type TRet</returns>
    Task<TRet> DeleteData<TRet>(string uri) where TRet : class, new();

    /// <summary>
    /// Delete http data with given type and given return type
    /// </summary>
    /// <typeparam name="TRet">The response type</typeparam>
    /// <param name="uri">Uri to service</param>
    /// <returns>Type TRet</returns>
    Task<TRet> DeleteDataStruct<TRet>(string uri) where TRet : struct;
}