using Mb.Models.Attributes;
using VDS.RDF;

namespace ModelBuilder.Rdf.Repositories;

[Scope]
public interface IOntologyRepository
{
    /// <summary>
    /// Graph property
    /// </summary>
    IGraph Graph { get; }

    /// <summary>
    /// Triple store property
    /// </summary>
    TripleStore Store { get; }

    /// <summary>
    /// Build uri from IRI or a namespace
    /// </summary>
    /// <param name="value"></param>
    /// <returns>The URI from the graph namespace map. If IRI is valid, the URI from IRI is returned.</returns>
    /// <exception cref="NotSupportedException">Throws if URI does not contain : or there are more than one : in the IRI.</exception>
    Uri BuildUri(string value);

    /// <summary>
    /// Load graph data into TripleStore
    /// </summary>
    /// <param name="data">Data to be loaded</param>
    void LoadData(IGraph data);
}