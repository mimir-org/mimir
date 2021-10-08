using System;
using System.Collections.Generic;
using System.Text;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using VDS.RDF.Writing;


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
        private IGraph BaseGraph()
        {
            // IMF Ontology: https://raw.githubusercontent.com/Sirius-sfi/aas-imf/main/imf-ontology/imf-202109.owl
            var ontology = new OntologyGraph();

            // Loads base ontology directly from file. Maps all the namespaces automatically
            ontology.LoadFromFile("C:\\Git\\ti-spine-modelbuilder\\src\\service\\Modules\\RdfParserModule\\ontologies.owl", new TurtleParser());


            //IDictionary<string, string> namespaces = GetNamespaces();

            //foreach(KeyValuePair<string, string> ns in namespaces)
            //{
            //    var prefix = ns.Key;
            //    var uri = ns.Value;

            //    ontology.NamespaceMap.AddNamespace(prefix, new Uri(uri));
            //}


            return ontology;

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




        public void BuildProject(Project project)
        {
            Project = project;
            Graph = BaseGraph();

            var id = Project.Id;
            var name = Project.Name;
            var version = Project.Version;
            var desc = Project.Description ?? Project.Name;


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


            foreach (var node in Project.Nodes)
            {
                var nodeId = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, node.Id));              


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

                

                foreach (var connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:

                            var transmitter = Graph.CreateUriNode(Resources.mimirPrefix + terminal.Name.Replace(" ", "-") + "Transmitter");

                            var hasTerminal = Graph.CreateUriNode("imf:has" + terminal.Type + "Terminal");

                            var terminalType = terminal.Type.ToString().Contains("In") ? "In" : "Out";

                            var terminalKey = Graph.CreateUriNode("imf:" + terminalType + "Terminal");
                            var nodeTerminal = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, terminal.Id));
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
                            prefix = "Function";
                            break;
                        case Aspect.Product:
                            prefix = "Product";
                            break;
                        case Aspect.Location:
                            prefix = "Location";
                            break;
                    }

                    var qname = "og" + node.Rds.Length + ":" + prefix + node.Rds;
                    var nodeRds = Graph.CreateUriNode(qname);
                    Graph.Assert(new Triple(nodeId, type, nodeRds));
                }


                // Modelling attributes
                var attributes = node.Attributes;

                if (attributes is null) { return; }



                foreach (var attribute in attributes)
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
                    foreach (var unit in units)
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
            var transport = Graph.CreateUriNode(Resources.Transport);
            var inTerminal = Graph.CreateUriNode(Resources.InputTerminal);
            var hasInTerminal = Graph.CreateUriNode(Resources.hasInputTerminal);
            var hasOutTerminal = Graph.CreateUriNode(Resources.hasOutputTerminal);
            var outTerminal = Graph.CreateUriNode(Resources.OutputTerminal);
            var hasAspect = Graph.CreateUriNode(Resources.hasAspect);

            foreach (var edge in edges)
            {
                var fromNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.FromNodeId));
                var toNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.ToNodeId));

                if (edge.Transport != null)
                {
                    var transportNode = Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.TransportId));
                    Graph.Assert(new Triple(transportNode, type, transport));

                    Graph.Assert(new Triple(transportNode, label, Graph.CreateLiteralNode(edge.Transport.Name)));

                    switch (edge.FromNode.Aspect)
                    {
                        case Aspect.Function:
                            Graph.Assert(new Triple(transportNode, hasParent, FunctionRoot));
                            Graph.Assert(new Triple(transportNode, hasAspect, Graph.CreateUriNode("imf:Function")));
                            break;
                        case Aspect.Location:
                            Graph.Assert(new Triple(transportNode, hasParent, LocationRoot));
                            Graph.Assert(new Triple(transportNode, hasAspect, Graph.CreateUriNode("imf:Location")));
                            break;
                        case Aspect.Product:
                            Graph.Assert(new Triple(transportNode, hasParent, ProductRoot));
                            Graph.Assert(new Triple(transportNode, hasAspect, Graph.CreateUriNode("imf:Product")));
                            break;
                    }

                    if (edge.Transport.InputTerminal != null)
                    {
                        var terminal = edge.Transport.InputTerminal;
                        var transportIn =
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.Transport.InputTerminalId));
                        Graph.Assert(new Triple(transportIn, type, inTerminal));

                        Graph.Assert(new Triple(transportNode, hasInTerminal, transportIn));


                        Graph.Assert(new Triple(transportIn, connectedTo,
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.FromConnectorId))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportIn, label, terminalLabel));

                    }
                    if (edge.Transport.OutputTerminal != null)
                    {
                        var terminal = edge.Transport.OutputTerminal;
                        var transportOut =
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.Transport.OutputTerminalId));
                        Graph.Assert(new Triple(transportOut, type, outTerminal));

                        Graph.Assert(new Triple(transportNode, hasOutTerminal, transportOut));

                        Graph.Assert(new Triple(transportOut, connectedTo,
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.ToConnectorId))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportOut, label, terminalLabel));
                    }
                }

                if (edge.Interface != null)
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

                    if (edge.Interface.InputTerminal != null)
                    {
                        var inter = edge.Interface.InputTerminal;
                        var interIn =
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.Interface.InputTerminalId));
                        Graph.Assert(new Triple(interIn, type, inTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasInTerminal, interIn));


                        Graph.Assert(new Triple(interIn, connectedTo,
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.FromConnectorId))));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interIn, label, interfaceLabel));

                    }
                    if (edge.Interface.OutputTerminal != null)
                    {
                        var inter = edge.Interface.OutputTerminal;
                        var interOut =
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.Interface.OutputTerminalId));
                        Graph.Assert(new Triple(interOut, type, outTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasOutTerminal, interOut));


                        Graph.Assert(new Triple(interOut, connectedTo,
                            Graph.CreateUriNode(IDtoIRI(Resources.equinorPrefix, edge.ToConnectorId))));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interOut, label, interfaceLabel));
                    }
                }


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
