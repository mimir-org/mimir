namespace Mb.Data.Contracts
{
    public interface ICommonRepository
    {
        string CreateUniqueId();
        string GetDomain();
        bool HasValidId(string id);
        string CreateOrUseId(string id);
        
        /// <summary>
        /// Provides an option to derive an ID based on an IRI.
        /// If the ID is valid it will be returned.
        /// If the ID is invalid it will be resolved based on the IRI.
        /// </summary>
        /// <param name="id">ID to validate</param>
        /// <param name="iri">IRI to derive ID from</param>
        /// <returns>A valid ID which can be used as a primary key, null if value could not be resolved</returns>
        /// <exception cref="ModelBuilderInvalidOperationException">
        /// Will throw an exception if the IRI could not be resolved to an ID
        /// </exception>
        /// <remarks>
        /// For an IRI to be resolved the host portion e.g sub.domain.com,
        /// must be registered with a CollaborationPartner in their list of IRIs
        /// </remarks>
        string ResolveId(string id, string iri);
        
        /// <summary>
        /// Provides an option to derive an IRI based on an ID.
        /// If an IRI is present it will be returned.
        /// If an IRI is not present it will be resolved based on the ID.
        /// </summary>
        /// <param name="id">ID to derive IRI from</param>
        /// <param name="iri">IRI to validate</param>
        /// <returns>A valid IRI, null if value could not be resolved</returns>
        string ResolveIri(string id, string iri);
    }
}
