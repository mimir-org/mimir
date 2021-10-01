using System;
using System.Collections.Generic;
using System.Text;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using RdfParserModule.Properties;
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

        public IUriNode FunctionRoot;
        public IUriNode LocationRoot;
        public IUriNode ProductRoot;


        private IDictionary<string, string> GetNamespaces()
        {
            IDictionary<string, string> namespaces = new Dictionary<string, string>()
            {
                // Kanskje midlertidig ontologi for RDS-klassar (for Mimir)
                {Resources.mimirPrefix.Replace(":", ""), "http://equinor.com/mimir#"}, // String range removes ':' from prefix which is needed elsewhere
                {Resources.equinorPrefix.Replace(":", ""), "http://equinor.com#"},
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

        private string IDtoIRI(string prefix, string id, string qualifier = "")
        {
            id = id.Replace("equinor.com_", "");
            //id = id.Replace("_", "/");
            if (string.IsNullOrEmpty(qualifier))
            {
                return prefix + "ID" + id;
            }
            else
            {
                return prefix + "ID" + id + "/" + qualifier;
            }
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
            var projectNode = Graph.CreateUriNode(IDtoIRI(Resources.mimirPrefix, id));
            var label = Graph.CreateUriNode(Resources.label);
            var isVersion = Graph.CreateUriNode("owl:versionInfo");
            var projectName = Graph.CreateLiteralNode(name);
            var projectDesc = Graph.CreateLiteralNode(desc);
            var projectVersion = Graph.CreateLiteralNode(version);

            var type = Graph.CreateUriNode(Resources.type);

            Graph.Assert(new Triple(projectNode, label, projectName));
            Graph.Assert(new Triple(projectNode, label, projectDesc));
            Graph.Assert(new Triple(projectNode, isVersion, projectVersion));
            Graph.Assert(new Triple(projectNode, type, Graph.CreateUriNode(Resources.project)));
            Graph.Assert(new Triple(projectNode, type, Graph.CreateUriNode(Resources.IntegratedObject)));

            BuildNodes();
            BuildEdges();
        }

        private void BuildNodes()
        {
            var label = Graph.CreateUriNode(Resources.label);
            var type = Graph.CreateUriNode(Resources.type);
            var hasAspect = Graph.CreateUriNode(Resources.hasAspect);


            foreach (Node node in Project.Nodes)
            {
                IUriNode nodeId = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, node.Id));              


                if (node.IsRoot)
                {
                    Graph.Assert(new Triple(nodeId, Graph.CreateUriNode(Resources.isAspectOf),
                        Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, node.MasterProjectId))));

                    switch (node.Aspect)
                    {
                        case Aspect.Function:
                            FunctionRoot = nodeId;
                            break;
                        case Aspect.Location:
                            LocationRoot = nodeId;
                            break;
                        case Aspect.Product:
                            ProductRoot = nodeId;
                            break;
                    }

                    Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(Project.Name + " " + node.Aspect)));

                    continue;
                }

                Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(node.Rds + " " +node.Label)));

                

                foreach (Connector connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:
                            //TODO Check if this can actually be called 'transmitter'
                            var transmitter = Graph.CreateUriNode(Resources.mimirPrefix + terminal.Name.Replace(" ", "-") + "Transmitter");

                            var hasTerminal = Graph.CreateUriNode("imf:has" + terminal.Type + "Terminal");

                            var terminalType = "";
                            if (terminal.Type.ToString().Contains("In"))
                            {
                                terminalType = "In";
                            }
                            else
                            {
                                terminalType = "Out";
                            }
                            var terminalKey = Graph.CreateUriNode("imf:" + terminalType + "Terminal");
                            var nodeTerminal = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, terminal.Id, "node"));
                            Graph.Assert(new Triple(nodeId, hasTerminal, nodeTerminal));
                            Graph.Assert(new Triple(nodeTerminal, type, terminalKey));

                            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            Graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            Graph.Assert(new Triple(nodeTerminal, type, transmitter));
                            Graph.Assert(new Triple(nodeTerminal, type, Graph.CreateUriNode(Resources.FSBTerminal)));
                            break;
                    }
                }

                var nodeAspect = Graph.CreateUriNode(Resources.imfPrefix + node.Aspect);
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
                    var attributeNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, attribute.Id));

                    var attributeTypeNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, attribute.AttributeTypeId));
                    Graph.Assert(new Triple(attributeTypeNode, Graph.CreateUriNode(Resources.subClassOf),
                        Graph.CreateUriNode(Resources.Attribute)));

                    Graph.Assert(new Triple(attributeTypeNode, label, Graph.CreateLiteralNode(attribute.Key)));

                    Graph.Assert(new Triple(nodeId, Graph.CreateUriNode(Resources.hasAttribute), attributeNode));
                    // Using the AttributeTypeId as the IRI should probably not 
                    Graph.Assert(new Triple(attributeNode, type, attributeTypeNode));
                    Graph.Assert(new Triple(attributeNode, Graph.CreateUriNode(Resources.hasValue), Graph.CreateLiteralNode(value)));

                    Graph.Assert(new Triple(attributeNode, label, Graph.CreateLiteralNode(attribute.Key)));

                    //TODO Fix this, but here is at least the Unit ID for the selected Unit. Just have to find out what the name of the selected unit is
                    Graph.Assert(new Triple(attributeTypeNode, Graph.CreateUriNode(Resources.selectedUnit), Graph.CreateLiteralNode(
                        attribute.SelectedUnitId)));

                    // UnitString ikkje Units
                    var units = attribute.Units;
                    foreach (Unit unit in units)
                    {
                        var unitName = unit.Name;

                        Graph.Assert(new Triple(attributeNode, Graph.CreateUriNode(Resources.allowedUnit),
                            Graph.CreateLiteralNode(unitName)));
                    }
                }
            }
        }


        private void BuildEdges()
        {
            var edges = Project.Edges;
            var type = Graph.CreateUriNode(Resources.type);
            var hasParent = Graph.CreateUriNode(Resources.hasParent);
            var label = Graph.CreateUriNode(Resources.label);
            var connectedTo = Graph.CreateUriNode(Resources.connectedTo);

            foreach (Edge edge in edges)
            {
                var fromNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.FromNodeId));
                var toNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.ToNodeId));


                switch (edge.FromConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO Breaks if it should be a hasChild relation. We only explicitly state hasParent .
                        if (relationString.ToLower().Contains("partof"))
                        {
                            break;
                        }
                        var relationFromNode = Graph.CreateUriNode("imf:" + relationString);
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
                    var transportNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.TransportId));
                    Graph.Assert(new Triple(transportNode, type, Graph.CreateUriNode("imf:Transport")));



                    //Temporary logic to create terminals for Transports
                    var transportIn = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.TransportId, "transportInput"));
                    var transportOut = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.TransportId, "transportOutput"));
                    var streamTerminal = Graph.CreateUriNode(Resources.StreamTerminal);
                    
                    Graph.Assert(new Triple(transportIn, type, streamTerminal));
                    Graph.Assert(new Triple(transportOut, type, streamTerminal));
                    Graph.Assert(new Triple(transportIn, type,
                        Graph.CreateUriNode(Resources.InputTerminal)));
                    Graph.Assert(new Triple(transportOut, type,
                        Graph.CreateUriNode(Resources.OutputTerminal)));

                    Graph.Assert(new Triple(transportNode, Graph.CreateUriNode(Resources.hasInputTerminal), transportIn));
                    Graph.Assert(new Triple(transportNode, Graph.CreateUriNode(Resources.hasOutputTerminal), transportOut));



                    Graph.Assert(new Triple(transportIn, connectedTo,
                        Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.FromConnectorId, "node"))));
                    Graph.Assert(new Triple(transportOut, connectedTo,
                        Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.ToConnectorId, "node"))));

                    Graph.Assert(new Triple(Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.FromConnectorId, "node")), connectedTo,
                        transportIn));
                    Graph.Assert(new Triple(Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.ToConnectorId, "node")), connectedTo,
                        transportOut));


                    switch (edge.FromNode.Aspect)
                    {
                        case Aspect.Function:
                            Graph.Assert(new Triple(transportNode, hasParent, FunctionRoot));
                            break;
                        case Aspect.Location:
                            Graph.Assert(new Triple(transportNode, hasParent, LocationRoot));
                            break;
                        case Aspect.Product:
                            Graph.Assert(new Triple(transportNode, hasParent, ProductRoot));
                            break;
                    }

                    Graph.Assert(new Triple(transportNode, label, Graph.CreateLiteralNode(edge.Transport.Name)));


                }
                if (!string.IsNullOrEmpty(edge.InterfaceId))
                {
                    var interfaceNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.InterfaceId));
                    Graph.Assert(new Triple(interfaceNode, type, Graph.CreateUriNode(Resources.Interface)));

                    switch (edge.FromNode.Aspect)
                    {
                        case Aspect.Function:
                            Graph.Assert(new Triple(interfaceNode, hasParent, FunctionRoot));
                            break;
                        case Aspect.Location:
                            Graph.Assert(new Triple(interfaceNode, hasParent, LocationRoot));
                            break;
                        case Aspect.Product:
                            Graph.Assert(new Triple(interfaceNode, hasParent, ProductRoot));
                            break;
                    }
                    Graph.Assert(new Triple(interfaceNode, label, Graph.CreateLiteralNode(edge.Interface.Name)));

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
