using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
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
                {"og3", "http://example.com/rds/og3#"},
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

            g.Assert(new Triple(projectNode, label, projectName));
            g.Assert(new Triple(projectNode, label, projectDesc));
            g.Assert(new Triple(projectNode, isVersion, projectVersion));
            g.Assert(new Triple(projectNode, g.CreateUriNode("rdf:type"), g.CreateUriNode("mimir:Project")));
            g.Assert(new Triple(projectNode, g.CreateUriNode("rdf:type"), g.CreateUriNode("imf:IntegratedObject")));

            g = BuildNodes(g, _project);
            g = BuildEdges(g, _project);

            return g;
        }


        private static IGraph BuildNodes(IGraph g, Project _project)
        {
            var label = g.CreateUriNode("rdfs:label");
            var type = g.CreateUriNode("rdf:type");
            var hasAspect = g.CreateUriNode("imf:hasAspect");

            foreach (Node node in _project.Nodes)
            {
                IUriNode nodeId = g.CreateUriNode("mimir:" + node.Id);              


                if (node.IsRoot)
                {
                    g.Assert(new Triple(nodeId, g.CreateUriNode("imf:isAspectOf"),
                        g.CreateUriNode("mimir:" + node.MasterProjectId)));

                    g.Assert(new Triple(nodeId, label, g.CreateLiteralNode(_project.Name + " " + node.Aspect)));

                    continue;
                }
                
                g.Assert(new Triple(nodeId, label, g.CreateLiteralNode(node.Rds + " " +node.Label)));

                var hasTerminal = g.CreateUriNode("imf:hasTerminal");
                var isTerminal = g.CreateUriNode("imf:Terminal");

                foreach (Connector connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:
                            //TODO Check if this can actually be called 'transmitter'
                            var transmitter = g.CreateUriNode("imf:" + terminal.Name + "Transmitter");
                            

                            var terminalKey = g.CreateUriNode("imf:" + terminal.Type + "Terminal");
                            var nodeTerminal = g.CreateUriNode("mimir:" + terminal.Id + "_node");
                            g.Assert(new Triple(nodeId, hasTerminal, nodeTerminal));
                            g.Assert(new Triple(nodeTerminal, type, terminalKey));

                            var terminalLabel = g.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            g.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            g.Assert(new Triple(nodeTerminal, type, transmitter));

                            break;
                    }
                }

                var nodeAspect = g.CreateUriNode("imf:" + node.Aspect);
                g.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (!string.IsNullOrEmpty(node.Rds))
                {
                    var prefix = "";
                    switch (node.Aspect)
                    {
                        case (Aspect)2:
                            prefix = "=";
                            break;
                        case (Aspect)4:
                            prefix = "-";
                            break;
                        case (Aspect)8:
                            prefix = "+";
                            break;
                    }
                    var qname = "og" + node.Rds.Length + ":" + prefix + node.Rds;
                    var nodeRds = g.CreateUriNode(qname);
                    g.Assert(new Triple(nodeId, type, nodeRds));
                }


                // Modelling attributes
                ICollection<Attribute> attributes = node.Attributes;

                if (attributes is null) { return g; }



                foreach (Attribute attribute in attributes)
                {
                    var value = attribute.Value;
                    if (value is null)
                    {
                        continue;
                    }
                    var attributeNode = g.CreateUriNode("mimir:" + attribute.Id);

                    var attributeTypeNode = g.CreateUriNode("mimir:" + attribute.AttributeTypeId);
                    g.Assert(new Triple(attributeTypeNode, g.CreateUriNode("rdfs:subClassOf"),
                        g.CreateUriNode("imf:Attribute")));

                    g.Assert(new Triple(attributeTypeNode, label, g.CreateLiteralNode(attribute.Key)));

                    g.Assert(new Triple(nodeId, g.CreateUriNode("imf:hasAttribute"), attributeNode));
                    // Using the AttributeTypeId as the IRI should probably not 
                    g.Assert(new Triple(attributeNode, g.CreateUriNode("rdf:type"), attributeTypeNode));
                    g.Assert(new Triple(attributeNode, g.CreateUriNode("imf:hasValue"), g.CreateLiteralNode(value)));

                    g.Assert(new Triple(attributeNode, label, g.CreateLiteralNode(attribute.Key)));

                    //TODO Fix this, but here is at least the Unit ID for the selected Unit. Just have to find out what the name of the selected unit is
                    g.Assert(new Triple(attributeTypeNode, g.CreateUriNode("imf:selectedUnit"), g.CreateLiteralNode(
                        attribute.SelectedUnitId)));

                    // UnitString ikkje Units
                    var units = attribute.Units;
                    foreach (Unit unit in units)
                    {
                        var unitName = unit.Name;

                        g.Assert(new Triple(attributeNode, g.CreateUriNode("imf:allowedUnit"),
                            g.CreateLiteralNode(unitName)));
                    }
                }
            }

            return g;
        }


        private static IGraph BuildEdges(IGraph g, Project _project)
        {
            var edges = _project.Edges;
            var label = g.CreateUriNode("rdfs:label");
            var type = g.CreateUriNode("rdf:type");
            var hasAspect = g.CreateUriNode("imf:hasAspect");
            


            foreach (Edge edge in edges)
            {
                var fromNode = g.CreateUriNode("mimir:" + edge.FromNodeId);
                var toNode = g.CreateUriNode("mimir:" + edge.ToNodeId);


                switch (edge.FromConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO If relation is PartOf, ignore this direction
                        if (relationString.ToLower().Contains("partof")) { break; }
                        IUriNode relationFromNode = g.CreateUriNode("imf:" + relationString);
                        g.Assert(new Triple(fromNode, relationFromNode, toNode));
                        break;
                }

                switch (edge.ToConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO Can be removed when Mimir has correct IMF relation names
                        relationString = relationString.Substring(0, 1).ToLower() + relationString.Substring(1);


                        IUriNode relationToNode = g.CreateUriNode("imf:" + relationString);
                        g.Assert(new Triple(toNode, relationToNode, fromNode));
                        break;
                }


                if (!string.IsNullOrEmpty(edge.TransportId))
                {
                    var transportNode = g.CreateUriNode("mimir:" + edge.TransportId);
                    g.Assert(new Triple(transportNode, type, g.CreateUriNode("imf:Transport")));

                    
                }
                if (!string.IsNullOrEmpty(edge.InterfaceId))
                {
                    var transportNode = g.CreateUriNode("mimir:" + edge.InterfaceId);
                    g.Assert(new Triple(transportNode, type, g.CreateUriNode("imf:Interface")));
                }
            }


            return g;
        }


        private static string RdfToString(IGraph g)
        {
            //NTriplesWriter writer = new NTriplesWriter();
            CompressingTurtleWriter writer = new CompressingTurtleWriter();

            string data = StringWriter.Write(g, writer);

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
