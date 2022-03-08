using System;
using System.IO;
using System.Reflection;
using Mb.Models.Extensions;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;

namespace RdfParserModule.Repositories
{
    public class OntologyRepository : IOntologyRepository
    {
        public IGraph Graph => _graph ??= CreateOntologyGraph();
        public TripleStore Store => _store ??= CreateTripleStore();

        #region Public methods

        /// <summary>
        /// Build uri from IRI or a namespace
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        /// <exception cref="NotSupportedException"></exception>
        public Uri BuildUri(string value)
        {
            if (value.IsValidIri())
                return new Uri(value);

            var split = value.Split(':', StringSplitOptions.RemoveEmptyEntries);
            if (split.Length != 2)
                throw new NotSupportedException($"There is noe support for building Uri from {value}");

            var hasNameSpace = Graph.NamespaceMap.HasNamespace(split[0]);
            if (!hasNameSpace)
                throw new NotSupportedException($"There is noe support for building Uri from {value}. Namespace {split[0]} is missing.");

            var iri = $"{Graph.NamespaceMap.GetNamespaceUri(split[0])}{split[1]}";
            return new Uri(iri);
        }

        /// <summary>
        /// Load graph data into TripleStore
        /// </summary>
        /// <param name="data"></param>
        public void LoadData(string data)
        {
            _graph = CreateOntologyGraph();
            _store = CreateTripleStore();

            if (string.IsNullOrWhiteSpace(data))
                return;

            IGraph graph = new Graph();
            graph.LoadFromString(data);
            _graph.Merge(graph);
            _store.Add(_graph);
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Create an ontology graph
        /// </summary>
        /// <returns>IGraph</returns>
        private static IGraph CreateOntologyGraph()
        {
            var graph = new OntologyGraph();
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/ontologies.owl";
            graph.LoadFromFile(filePath, new TurtleParser());
            return graph;
        }

        /// <summary>
        /// Create a new instance of a TripleStore
        /// </summary>
        /// <returns>TripleStore</returns>
        private static TripleStore CreateTripleStore()
        {
            var store = new TripleStore();
            return store;
        }

        #endregion

        #region Private members

        private IGraph _graph;
        private TripleStore _store;

        #endregion

    }
}