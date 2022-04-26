using System.Threading.Tasks;
using Mimirorg.Common.Exceptions;

namespace Mb.Data.Contracts
{
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
    }
}