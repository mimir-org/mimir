using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Data;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using VDS.RDF.Writing;


namespace RdfParserModule
{
    public class RdfBuilder
    {
        private static IDictionary<string, string> GetNamespaces()
        {
            IDictionary<string, string> namespaces = new Dictionary<string, string>()
            {
                {"imf", "http://example.com/imf#"},
                {"rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"},
                {"rdfs", "http://www.w3.org/2000/01/rdf-schema#"},
                {"xsd", "http://www.w3.org/2001/XMLSchema#"},
                {"owl", "http://www.w3.org/2002/07/owl#"},
                {"xml", "http://www.w3.org/XML/1998/namespace"}
            };

            return namespaces;
        }

        private static IGraph BaseGraph()
        {
            // IMF Ontology: https://raw.githubusercontent.com/Sirius-sfi/aas-imf/main/imf-ontology/imf-202109.owl
            OntologyGraph ontology = new OntologyGraph();
            IDictionary<string, string> namespaces = GetNamespaces();

            foreach(KeyValuePair<string, string> ns in namespaces)
            {
                var prefix = ns.Key;
                var uri = ns.Value;

                ontology.NamespaceMap.AddNamespace(prefix, new Uri(uri));
            }


            return ontology;
            
        }
        public static IGraph BuildNode(Project project)
        {
            IGraph g = BaseGraph();

            var id = project.Id;
            var name = project.Name;
            var version = project.Version;
            var desc = project.Description;


            // Node for the project (named after its ID)
            IUriNode projectNode = g.CreateUriNode("imf:" + id);
            IUriNode label = g.CreateUriNode("rdf:label");
            IUriNode hasId = g.CreateUriNode("imf:hasId");
            IUriNode hasName = g.CreateUriNode("imf:isType");
            IUriNode isVersion = g.CreateUriNode("imf:version");
            ILiteralNode projectName = g.CreateLiteralNode(name);
            ILiteralNode projectDesc = g.CreateLiteralNode(desc);

            ILiteralNode projectVersion = g.CreateLiteralNode(version);

            g.Assert(new Triple(projectNode, label, projectDesc));
            g.Assert(new Triple(projectNode, hasId, g.CreateLiteralNode(id)));
            g.Assert(new Triple(projectNode, hasName, projectName));
            g.Assert(new Triple(projectNode, isVersion, g.CreateLiteralNode(version)));



            var nodes = GetNodes(project);
            IUriNode hasNode = g.CreateUriNode("imf:hasNode");
            IUriNode hasAspect = g.CreateUriNode("imf:hasAspect");

            foreach (Node node in nodes)
            {
                var nodeId = node.Id;
                var aspect = node.Aspect;

                IUriNode nodeNode = g.CreateUriNode("imf:" + nodeId);

                g.Assert(new Triple(projectNode, hasNode, nodeNode));

                IUriNode aspectNode = g.CreateUriNode("imf:" + aspect);
                g.Assert(new Triple(nodeNode, hasAspect, aspectNode));

                // Name is actually type name. Not node name
                g.Assert(new Triple(nodeNode, hasName, g.CreateLiteralNode(node.Name)));

                // Label is Service Description
                g.Assert(new Triple(nodeNode, label, g.CreateLiteralNode(node.Label)));

            }

            var edges = GetEdges(project);

            foreach (Edge edge in edges)
            {
                IUriNode edgeNode = g.CreateUriNode("imf:" + edge.Id);
                IUriNode fromNode = g.CreateUriNode("imf:" + edge.FromNodeId);
                IUriNode toNode = g.CreateUriNode("imf:" + edge.ToNodeId);

                IUriNode hasConnection = g.CreateUriNode("imf:connectedTo");

                g.Assert(new Triple(fromNode, hasConnection, toNode));
                g.Assert(new Triple(toNode, hasConnection, fromNode));
            }


            return g;
        }

        private static ICollection<Node> GetNodes(Project project)
        {
            return project.Nodes;
        }

        private static ICollection<Edge> GetEdges(Project project)
        {
            return project.Edges;
        }

        private static string RdfToString(IGraph g)
        {
            TurtleWriter writer = new TurtleWriter();

            String data = VDS.RDF.Writing.StringWriter.Write(g, writer);

            return data;
        }
        public static byte[] GetBytes(IGraph g)
        {
            string graphString = RdfToString(g);
            byte[] bytes = Encoding.UTF8.GetBytes(graphString);

            return bytes;
        }
    }
}
