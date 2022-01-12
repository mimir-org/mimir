using System.Collections.Generic;
using System.IO;
using System.Reflection;
using RdfParserModule.Extensions;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;

namespace RdfParserModule.Repositories
{
    public class OntologyRepository : IOntologyRepository
    {
        public IGraph Graph => _graph ??= CreateOntologyGraph();
        public Dictionary<string, string> Namespaces => _namespaces ??= CreateNamespaces();

        #region Public methods

        /// <summary>
        /// Build an iri from segments
        /// </summary>
        /// <param name="prefix"></param>
        /// <param name="suffix"></param>
        /// <param name="midFix"></param>
        /// <returns></returns>
        public string BuildIri(string prefix, string suffix, string midFix = "")
        {
            if (Namespaces.TryGetValue(prefix, out var fullNamespace))
            {
                return $"{fullNamespace}{midFix}{suffix}";
            }

            if (prefix.ValidPrefix(Graph))
            {
                return $"{prefix}{midFix}{suffix}";
            }

            if (prefix.ValidNamespace())
            {
                return $"{prefix}/{midFix}{suffix}";
            }

            return $"{prefix}{midFix}{suffix}";
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Create an ontology graph
        /// </summary>
        /// <returns></returns>
        private static IGraph CreateOntologyGraph()
        {
            var graph = new OntologyGraph();
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/ontologies.owl";
            graph.LoadFromFile(filePath, new TurtleParser());
            return graph;
        }

        /// <summary>
        /// Initialize namespaces
        /// </summary>
        /// <returns></returns>
        private static Dictionary<string, string> CreateNamespaces()
        {
            return new Dictionary<string, string>
            {
                {"owl", "http://www.w3.org/2002/07/owl#"},
                {"rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"},
                {"rdfs", "http://www.w3.org/2000/01/rdf-schema#"},
                {"xml", "http://www.w3.org/XML/1998/namespace"},
                {"xsd", "http://www.w3.org/2001/XMLSchema#"},
                {"imf", "http://example.com/imf#"},
                {"mimir", "http://example.com/mimir#"},
                {"lis", "http://standards.iso.org/iso/15926/part14/"},
                {"sor", "https://rdf.equinor.com/sor/mimir/"},
                {"eq", "https://rdf.equinor.com/raw/mimir/"}
            };
        }

        #endregion

        #region Private members

        private IGraph _graph;
        private Dictionary<string, string> _namespaces;

        #endregion

    }
}