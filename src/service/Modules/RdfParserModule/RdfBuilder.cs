using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using VDS.RDF.Writing;
using Attribute = Mb.Models.Data.Attribute;


namespace RdfParserModule
{
    public class RdfBuilder
    {
        private static Project _project;

        public RdfBuilder(Project project)
        {
            _project = project;
        }
        
        private static IDictionary<string, string> GetNamespaces()
        {
            IDictionary<string, string> namespaces = new Dictionary<string, string>()
            {
                // Kanskje midlertidig ontologi for RDS-klassar (for Mimir)
                {"mimir", "http://example.com/mimir#"},
                {"imf", "http://example.com/imf#"},
                {"rds", "http://example.com/rds"},
                {"cw", "http://example.com/rds/cw#"},
                {"og1", "http://example.com/rds/og1#"},
                {"og2", "http://example.com/rds/og2#"},
                {"ps", "http://example.com/rds/ps#"},
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
        public static IGraph BuildProject(Project _project)
        {
            IGraph g = BaseGraph();
            
            var id = _project.Id;
            var name = _project.Name;
            var version = _project.Version;
            var desc = _project.Description;


            // Node for the project (named after its ID)
            IUriNode projectNode = g.CreateUriNode("mimir:" + id);
            IUriNode label = g.CreateUriNode("rdfs:label");
            IUriNode isVersion = g.CreateUriNode("owl:versionInfo");
            ILiteralNode projectName = g.CreateLiteralNode(name);
            ILiteralNode projectDesc = g.CreateLiteralNode(desc);

            ILiteralNode projectVersion = g.CreateLiteralNode(version);

            g.Assert(new Triple(projectNode, label, projectDesc));
            g.Assert(new Triple(projectNode, isVersion, g.CreateLiteralNode(version)));
            g.Assert(new Triple(projectNode, g.CreateUriNode("rdf:type"), g.CreateUriNode("mimir:Project")));
            g.Assert(new Triple(projectNode, g.CreateUriNode("rdf:type"), g.CreateUriNode("imf:IntegratedObject")));

            //g = BuildNodes(g, project);
            g = GetConnections(g, _project);

            return g;
        }


        private static IGraph BuildNodes(IGraph g, Project _project)
        {
            foreach (Node node in _project.Nodes)
            {
                IUriNode nodeId = g.CreateUriNode("mimir:" + node.Id);
                
            }

            return g;
        }


        private static IGraph GetConnections(IGraph g, Project _project)
        {
            var edges = _project.Edges;

            foreach(Edge edge in edges)
            {
                g = CreateNodesFromEdge(g, edge);
            }


            return g;
        }

        private static IGraph CreateAttributesFromEdge(IGraph g, Edge edge)
        {
            var nodes = new List<Node> {edge.FromNode, edge.ToNode};

            foreach (Node node in nodes)
            {
                ICollection<Attribute> attributes = node.Attributes;

                if (attributes is null)
                {
                    return g;
                }

                var rdfNode = g.CreateUriNode("mimir:" + node.Id);


                foreach (Attribute attribute in attributes)
                {
                    var attributeNode = g.CreateUriNode("mimir:" + attribute.Id);
                    var value = attribute.Value;
                    var attributeTypeNode = g.CreateUriNode("mimir:" + attribute.AttributeTypeId);

                    g.Assert(new Triple(rdfNode, g.CreateUriNode("imf:hasAttribute"), attributeNode));
                    g.Assert(new Triple(attributeNode, g.CreateUriNode("rdf:type"), attributeTypeNode));
                    g.Assert(new Triple(attributeNode, g.CreateUriNode("imf:hasValue"), g.CreateLiteralNode(value)));

                    // UnitString ikkje Units
                    var units = attribute.Units;
                    foreach (Unit unit in units)
                    {
                        var allowedUnit = unit.Key;
                        var unitDesc = unit.Description;
                    }
                }
                
            }

            
            return g;
        }

        private static IGraph CreateNodesFromEdge(IGraph g, Edge edge)
        {
            IUriNode fromNode = g.CreateUriNode("mimir:" + edge.FromNodeId);
            IUriNode toNode = g.CreateUriNode("mimir:" + edge.ToNodeId);
            IUriNode label = g.CreateUriNode("rdfs:label");

            if (edge.FromNode.IsRoot)
            {
                g.Assert(new Triple(fromNode, g.CreateUriNode("imf:isAspectOf"),
                    g.CreateUriNode("mimir:" + edge.MasterProjectId)));

                g.Assert(new Triple(fromNode, label, g.CreateLiteralNode("Project " + edge.FromNode.Aspect)));

                return g;
            }


            var type = g.CreateUriNode("rdf:type");

            var hasTerminal = g.CreateUriNode("imf:hasTerminal");

            if (!string.IsNullOrEmpty(edge.TransportId))
            {
                var transportNode = g.CreateUriNode("mimir:" + edge.TransportId);
                g.Assert(new Triple(transportNode, type, g.CreateUriNode("imf:Transport")));
                g.Assert(new Triple(transportNode, hasTerminal,g.CreateUriNode("mimir:" + edge.FromConnectorId +"_transport")));
                g.Assert(new Triple(transportNode, hasTerminal, g.CreateUriNode("mimir:" + edge.ToConnectorId + "_transport")));

                g.Assert(new Triple(fromNode, hasTerminal, g.CreateUriNode("mimir:" + edge.FromConnectorId + "_node")));
                g.Assert(new Triple(toNode, hasTerminal, g.CreateUriNode("mimir:" + edge.ToConnectorId +"_node")));
            }
            if (!string.IsNullOrEmpty(edge.InterfaceId))
            {
                var transportNode = g.CreateUriNode("mimir:" + edge.InterfaceId);
                g.Assert(new Triple(transportNode, type, g.CreateUriNode("imf:Interface")));
            }
            

   


            var fromTerminal = g.CreateUriNode("mimir:" + edge.FromConnectorId);
            var toTerminal = g.CreateUriNode("mimir:" + edge.ToConnectorId);
            //var connectedTo = g.CreateUriNode("imf:connectedTo");


            //g.Assert(new Triple(fromTerminal, connectedTo, toTerminal));

            g.Assert(new Triple(fromTerminal, type, g.CreateUriNode("imf:Terminal")));
            g.Assert(new Triple(toTerminal, type, g.CreateUriNode("imf:Terminal")));

            switch (edge.FromConnector)
            {
                case Terminal terminal:
                    IUriNode terminalNode = g.CreateUriNode("mimir:" + terminal.Id);
                    g.Assert(new Triple(fromNode, hasTerminal, terminalNode));
                    break;
                case Relation relation:
                    IUriNode relationFromNode = g.CreateUriNode("imf:" + relation.RelationType.ToString());
                    g.Assert(new Triple(fromNode, relationFromNode, toNode));
                    break;
            }

            switch (edge.ToConnector)
            {
                case Terminal terminal:
                    IUriNode terminalNode = g.CreateUriNode("mimir:" + terminal.Id);
                    g.Assert(new Triple(toNode, hasTerminal, terminalNode));
                    break;
                case Relation relation:
                    //TODO If relation is PartOf, ignore this direction
                    IUriNode relationToNode = g.CreateUriNode("imf:" + relation.RelationType.ToString());
                    g.Assert(new Triple(toNode, relationToNode, fromNode));
                    break;
            }

            var fromNodeAspect = g.CreateUriNode("imf:" + edge.FromNode.Aspect);
            var toNodeAspect = g.CreateUriNode("imf:" + edge.ToNode.Aspect);
            var hasAspect = g.CreateUriNode("imf:hasAspect");


            g.Assert(new Triple(fromNode, hasAspect, fromNodeAspect));
            g.Assert(new Triple(toNode, hasAspect, toNodeAspect));



            g.Assert(new Triple(fromNode, label, g.CreateLiteralNode(edge.FromNode.Label)));
            g.Assert(new Triple(toNode, label, g.CreateLiteralNode(edge.ToNode.Label)));

            if (!string.IsNullOrEmpty(edge.FromNode.Rds))
            {
                var qname = "og" + edge.FromNode.Rds.Length + ":" + edge.FromNode.Rds;
                var fromNodeRds = g.CreateUriNode(qname);
                g.Assert(new Triple(fromNode, type, fromNodeRds));
            }

            if (!string.IsNullOrEmpty(edge.ToNode.Rds))
            {
                var qname = "og" + edge.ToNode.Rds.Length + ":" + edge.ToNode.Rds;
                var toNodeRds = g.CreateUriNode(qname);
                g.Assert(new Triple(toNode, type, toNodeRds));
            }

            g = CreateAttributesFromEdge(g, edge);


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

            string data = VDS.RDF.Writing.StringWriter.Write(g, writer);

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
