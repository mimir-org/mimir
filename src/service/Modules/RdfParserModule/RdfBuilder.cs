using System;
using System.Collections.Generic;
using System.Text;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Writing;
using Attribute = Mb.Models.Data.Attribute;


namespace RdfParserModule
{
    public class RdfBuilder : IRdfBuilder
    {
        public Project Project;
        public IGraph Graph;
        


        private IDictionary<string, string> GetNamespaces()
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

        private IGraph BaseGraph()
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


        public void BuildProject(Project project)
        {
            Project = project;
            Graph = BaseGraph();
            
            var id = Project.Id;
            var name = Project.Name;
            var version = Project.Version;
            var desc = Project.Description;


            // Node for the project (named after its ID)
            var projectNode = Graph.CreateUriNode("mimir:" + id);
            var label = Graph.CreateUriNode("rdfs:label");
            var isVersion = Graph.CreateUriNode("owl:versionInfo");
            var projectName = Graph.CreateLiteralNode(name);
            var projectDesc = Graph.CreateLiteralNode(desc);
            var projectVersion = Graph.CreateLiteralNode(version);

            Graph.Assert(new Triple(projectNode, label, projectName));
            Graph.Assert(new Triple(projectNode, label, projectDesc));
            Graph.Assert(new Triple(projectNode, isVersion, projectVersion));
            Graph.Assert(new Triple(projectNode, Graph.CreateUriNode("rdf:type"), Graph.CreateUriNode("mimir:Project")));
            Graph.Assert(new Triple(projectNode, Graph.CreateUriNode("rdf:type"), Graph.CreateUriNode("imf:IntegratedObject")));

            BuildNodes();
            BuildEdges();
        }

        private void BuildNodes()
        {
            var label = Graph.CreateUriNode("rdfs:label");
            var type = Graph.CreateUriNode("rdf:type");
            var hasAspect = Graph.CreateUriNode("imf:hasAspect");

            foreach (Node node in Project.Nodes)
            {
                IUriNode nodeId = Graph.CreateUriNode("mimir:" + node.Id);              


                if (node.IsRoot)
                {
                    Graph.Assert(new Triple(nodeId, Graph.CreateUriNode("imf:isAspectOf"),
                        Graph.CreateUriNode("mimir:" + node.MasterProjectId)));

                    Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(Project.Name + " " + node.Aspect)));

                    continue;
                }

                Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(node.Rds + " " +node.Label)));

                var hasTerminal = Graph.CreateUriNode("imf:hasTerminal");

                foreach (Connector connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:
                            //TODO Check if this can actually be called 'transmitter'
                            var transmitter = Graph.CreateUriNode("imf:" + terminal.Name + "Transmitter");
                            

                            var terminalKey = Graph.CreateUriNode("imf:" + terminal.Type + "Terminal");
                            var nodeTerminal = Graph.CreateUriNode("mimir:" + terminal.Id + "_node");
                            Graph.Assert(new Triple(nodeId, hasTerminal, nodeTerminal));
                            Graph.Assert(new Triple(nodeTerminal, type, terminalKey));

                            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            Graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            Graph.Assert(new Triple(nodeTerminal, type, transmitter));

                            break;
                    }
                }

                var nodeAspect = Graph.CreateUriNode("imf:" + node.Aspect);
                Graph.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (!string.IsNullOrEmpty(node.Rds))
                {
                    var prefix = "";
                    switch (node.Aspect)
                    {
                        case Aspect.Function:
                            prefix = "=";
                            break;
                        case Aspect.Product:
                            prefix = "-";
                            break;
                        case Aspect.Location:
                            prefix = "+";
                            break;
                    }

                    var qname = "og" + node.Rds.Length + ":" + prefix + node.Rds;
                    var nodeRds = Graph.CreateUriNode(qname);
                    Graph.Assert(new Triple(nodeId, type, nodeRds));
                }


                // Modelling attributes
                ICollection<Attribute> attributes = node.Attributes;

                if (attributes is null) { return; }



                foreach (Attribute attribute in attributes)
                {
                    var value = attribute.Value;
                    if (value is null)
                    {
                        continue;
                    }
                    var attributeNode = Graph.CreateUriNode("mimir:" + attribute.Id);

                    var attributeTypeNode = Graph.CreateUriNode("mimir:" + attribute.AttributeTypeId);
                    Graph.Assert(new Triple(attributeTypeNode, Graph.CreateUriNode("rdfs:subClassOf"),
                        Graph.CreateUriNode("imf:Attribute")));

                    Graph.Assert(new Triple(attributeTypeNode, label, Graph.CreateLiteralNode(attribute.Key)));

                    Graph.Assert(new Triple(nodeId, Graph.CreateUriNode("imf:hasAttribute"), attributeNode));
                    // Using the AttributeTypeId as the IRI should probably not 
                    Graph.Assert(new Triple(attributeNode, type, attributeTypeNode));
                    Graph.Assert(new Triple(attributeNode, Graph.CreateUriNode("imf:hasValue"), Graph.CreateLiteralNode(value)));

                    Graph.Assert(new Triple(attributeNode, label, Graph.CreateLiteralNode(attribute.Key)));

                    //TODO Fix this, but here is at least the Unit ID for the selected Unit. Just have to find out what the name of the selected unit is
                    Graph.Assert(new Triple(attributeTypeNode, Graph.CreateUriNode("imf:selectedUnit"), Graph.CreateLiteralNode(
                        attribute.SelectedUnitId)));

                    // UnitString ikkje Units
                    var units = attribute.Units;
                    foreach (Unit unit in units)
                    {
                        var unitName = unit.Name;

                        Graph.Assert(new Triple(attributeNode, Graph.CreateUriNode("imf:allowedUnit"),
                            Graph.CreateLiteralNode(unitName)));
                    }
                }
            }
        }


        private void BuildEdges()
        {
            var edges = Project.Edges;
            var type = Graph.CreateUriNode("rdf:type");
            


            foreach (Edge edge in edges)
            {
                var fromNode = Graph.CreateUriNode("mimir:" + edge.FromNodeId);
                var toNode = Graph.CreateUriNode("mimir:" + edge.ToNodeId);


                switch (edge.FromConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO If relation is PartOf, put it to hasChild
                        if (relationString.ToLower().Contains("partof"))
                        {
                            relationString = "hasChild";
                        }
                        IUriNode relationFromNode = Graph.CreateUriNode("imf:" + relationString);
                        Graph.Assert(new Triple(fromNode, relationFromNode, toNode));
                        break;
                }

                switch (edge.ToConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO Can be removed when Mimir has correct IMF relation names
                        if (relationString.ToLower().Contains("partof"))
                        {
                            relationString = "hasParent";
                        }
                        relationString = relationString.Substring(0, 1).ToLower() + relationString.Substring(1);


                        var relationToNode = Graph.CreateUriNode("imf:" + relationString);
                        Graph.Assert(new Triple(toNode, relationToNode, fromNode));
                        break;
                }


                if (!string.IsNullOrEmpty(edge.TransportId))
                {
                    var transportNode = Graph.CreateUriNode("mimir:" + edge.TransportId);
                    Graph.Assert(new Triple(transportNode, type, Graph.CreateUriNode("imf:Transport")));
                    Graph.Assert(new Triple(transportNode, Graph.CreateUriNode("imf:childOf"), Graph.CreateUriNode("mimir:" + Project.Id)));
                }
                if (!string.IsNullOrEmpty(edge.InterfaceId))
                {
                    var transportNode = Graph.CreateUriNode("mimir:" + edge.InterfaceId);
                    Graph.Assert(new Triple(transportNode, type, Graph.CreateUriNode("imf:Interface")));
                    Graph.Assert(new Triple(transportNode, Graph.CreateUriNode("imf:childOf"), Graph.CreateUriNode("mimir:" + Project.Id)));
                }
            }
        }

        public string RdfToString<T>() where T : IRdfWriter, new()
        {
            var writer = new T();

            var data = StringWriter.Write(Graph, writer);

            return data;
        }
        public byte[] GetBytes<T>() where T : IRdfWriter, new()
        {
            var graphString = RdfToString<T>();
            var bytes = Encoding.UTF8.GetBytes(graphString);

            return bytes;
        }
    }
}
