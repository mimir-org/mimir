using Mb.Models.Common;

namespace Mb.Data.Contracts
{
    public interface ICommonRepository
    {
        /// <summary>
        /// Get current domain
        /// </summary>
        /// <returns>A new created id</returns>
        string CreateId();

        /// <summary>
        /// Create an Id as an Iri
        /// </summary>
        /// <param name="serverEndpoint"></param>
        /// <returns></returns>
        string CreateId(string serverEndpoint);

        /// <summary>
        /// Get current domain
        /// </summary>
        /// <returns>Registered domain</returns>
        string GetDomain();

        /// <summary>
        /// Check if item has a valid id
        /// </summary>
        /// <param name="id">Id to validate</param>
        /// <returns>True if the id is valid</returns>
        /// <remarks>
        /// For an id to be valid, it should be of this format: {domain unique}_{item unique}
        /// </remarks>
        bool HasValidId(string id);

        /// <summary>
        /// Check if Iri is valid
        /// </summary>
        /// <param name="iri">string</param>
        /// <returns>bool</returns>
        /// <remarks>
        /// For an iri to be valid, it should be of this format: http(s)://xxx.yyy
        /// </remarks> 
        bool HasValidIri(string iri);

        /// <summary>
        /// Create an id if the id is not valid
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns>A valid id</returns>
        (string id, string iri) CreateOrUseIdAndIri(string id, string iri);

        /// <summary>
        /// Create an id if the id is not valid
        /// </summary>
        /// <param name="replacement"></param>
        /// <returns>A valid id</returns>
        ReplacementId CreateOrUseIdAndIri(ReplacementId replacement);
    }
}