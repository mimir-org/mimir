using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Microsoft.Extensions.Logging;
using Mimirorg.Common.Exceptions;
using Newtonsoft.Json;

namespace Mb.Data.Repositories
{
    public class HttpRepository : IHttpRepository
    {
        #region Private members

        private readonly HttpClient _httpClient;
        private readonly ILogger<HttpRepository> _logger;

        #endregion

        #region Constructors

        public HttpRepository(ILogger<HttpRepository> logger)
        {
            _logger = logger;
            _httpClient = new HttpClient();
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Get http data on given type
        /// </summary>
        /// <typeparam name="T">The response type</typeparam>
        /// <param name="uri">Uri or url to external service</param>
        /// <returns>Type T</returns>
        /// <exception cref="MimirorgInvalidOperationException">Throws if status code is not success or could not cast object as T</exception>
        public async Task<T> GetData<T>(string uri) where T : class, new()
        {
            using var response = await _httpClient.GetAsync(uri);
            if (!response.IsSuccessStatusCode)
                throw new MimirorgInvalidOperationException(
                    $"Could not get data from http on uri: {uri}. Response code: {response.StatusCode}, Response status: {response.ReasonPhrase}");
            try
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var obj = JsonConvert.DeserializeObject<T>(responseBody);
                // Need to cast object explicit, because json convert gives wrong assembly information for debugging.
                // ReSharper disable once RedundantCast
                return (T) obj;
            }
            catch (Exception e)
            {
                _logger.LogError($"Can't resolve objects from uri: {uri}. Error: {e.Message}");
                throw new MimirorgInvalidOperationException($"Can't resolve objects from uri: {uri}.");
            }
        }

        /// <summary>
        /// Post http data with given type and given return type
        /// </summary>
        /// <typeparam name="TRet">The response type</typeparam>
        /// <typeparam name="TObj">The type of object to send</typeparam>
        /// <param name="uri">Uri to service</param>
        /// <param name="data">Data to send</param>
        /// <returns>Type TRet</returns>
        /// <exception cref="MimirorgInvalidOperationException">Throws if status code is not success or could not cast object as TRet</exception>
        public async Task<TRet> PostData<TRet, TObj>(string uri, TObj data) where TRet : class, new() where TObj : class, new()
        {
            StringContent content = null;

            if (data != null)
            {
                var json = JsonConvert.SerializeObject(data);
                content = new StringContent(json, Encoding.UTF8, "application/json");
            }

            using var response = await _httpClient.PostAsync(uri, content);
            if (!response.IsSuccessStatusCode)
                throw new MimirorgInvalidOperationException(
                    $"Could not post data to http on uri: {uri}. Response code: {response.StatusCode}, Response status: {response.ReasonPhrase}");
            try
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var obj = JsonConvert.DeserializeObject<TRet>(responseBody);
                // Need to cast object explicit, because json convert gives wrong assembly information for debugging.
                // ReSharper disable once RedundantCast
                return (TRet) obj;
            }
            catch (Exception e)
            {
                _logger.LogError($"Can't resolve objects from uri: {uri}. Error: {e.Message}");
                throw new MimirorgInvalidOperationException($"Can't resolve objects from uri: {uri}.");
            }
        }

        

        #endregion
    }
}