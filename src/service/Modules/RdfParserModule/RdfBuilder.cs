using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using StringWriter = VDS.RDF.Writing.StringWriter;


namespace RdfParserModule
{
    public class RdfBuilder : IRdfBuilder
    {
        public Project Project;
        public IGraph Graph;        
        public Dictionary<string, IUriNode> Roots;



        private IGraph BaseGraph()
        {
            // IMF Ontology: https://raw.githubusercontent.com/Sirius-sfi/aas-imf/main/imf-ontology/imf-202109.owl
            var ontology = new OntologyGraph();

            // Loads base ontology directly from file. Maps all the namespaces automatically
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/ontologies.owl";
            ontology.LoadFromFile(filePath, new TurtleParser());

            return ontology;
        }

        private static string MimirIdToIri(string prefix, string id)
        {
            id = id.Replace("equinor.com_", "");
            var midfix = "ID#";
            return $"{prefix}{midfix}{id}";
        }


        public void BuildProject(Project project)
        {
            Project = project;
            Graph = BaseGraph();
            Roots = new Dictionary<string, IUriNode>();

            var id = Project.Id;
            var name = Project.Name;
            var version = Project.Version;

   
            // Node for the project (named after its ID)
            var projectNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, id));
            var label = Graph.CreateUriNode(Resources.label);

            var isVersion = Graph.CreateUriNode("owl:versionInfo");
            var projectName = Graph.CreateLiteralNode(name);
            var projectVersion = Graph.CreateLiteralNode(version);

            var type = Graph.CreateUriNode(Resources.type);

            if (Project.Description is not null)
            {
                Graph.Assert(new Triple(projectNode, Graph.CreateUriNode(Resources.desc), Graph.CreateLiteralNode(Project.Description)));
            }

            Graph.Assert(new Triple(projectNode, label, projectName));
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
                var nodeId = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, node.Id));
             
                if (node.IsRoot)
                {
                    Graph.Assert(new Triple(nodeId, Graph.CreateUriNode(Resources.isAspectOf),
                        Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, node.MasterProjectId))));
                    
                    Roots.Add(node.Aspect.ToString(), nodeId);
                    
                    Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(Project.Name + " " + node.Aspect)));
                    continue;
                }

                Graph.Assert(new Triple(nodeId, type, Graph.CreateUriNode(Resources.FSB)));


                Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(node.Rds + " " +node.Label)));

                // Modelling attributes
                var attributes = node.Attributes;

                if (attributes is null) { return; }


                foreach (var attribute in attributes)
                {
                    var value = attribute.Value;
                    if (value is null) continue;

                    // attribute type = attribute.AttributeTypeId
                    // Discipline = attribute.Discipline
                    // Id = attribute.Id
                    // Name = attribute.Key 
                    // attribute.SelectedUnitId

                    var attributeNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, attribute.Id));

                    var attributeTypeNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, attribute.AttributeTypeId));
                    Graph.Assert(new Triple(attributeTypeNode, Graph.CreateUriNode(Resources.subClassOf),
                        Graph.CreateUriNode(Resources.Attribute)));

                    Graph.Assert(new Triple(attributeTypeNode, label, Graph.CreateLiteralNode(attribute.Entity)));

                    Graph.Assert(new Triple(nodeId, Graph.CreateUriNode(Resources.hasAttribute), attributeNode));
                    // Using the AttributeTypeId as the IRI should probably not 
                    Graph.Assert(new Triple(attributeNode, type, attributeTypeNode));
                    Graph.Assert(new Triple(attributeNode, Graph.CreateUriNode(Resources.hasValue), Graph.CreateLiteralNode(value)));

                    Graph.Assert(new Triple(attributeNode, label, Graph.CreateLiteralNode(attribute.Entity)));

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


                foreach (var connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:
                            var nodeTerminal = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, terminal.Id));
                            var terminalIri = $"{Resources.mimirPrefix}Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}";
                            

                            var transmitter = Graph.CreateUriNode(terminalIri);
                            Graph.Assert(new Triple(nodeTerminal, type, transmitter));
                            Graph.Assert(new Triple(transmitter, type, Graph.CreateUriNode("imf:Transmitter")));

                            var hasTerminal = Graph.CreateUriNode("imf:has" + terminal.Type + "Terminal");


                            var terminalType = terminal.Type.ToString().Contains("In") ? "In" : "Out";

                            var terminalKey = Graph.CreateUriNode("imf:" + terminalType + "Terminal");
                            Graph.Assert(new Triple(nodeId, hasTerminal, nodeTerminal));
                            Graph.Assert(new Triple(nodeTerminal, type, terminalKey));

                            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            Graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            Graph.Assert(new Triple(nodeTerminal, type, Graph.CreateUriNode(Resources.FSBTerminal)));
                            break;
                    }
                }

                var nodeAspect = Graph.CreateUriNode(Resources.imfPrefix + node.Aspect);
                Graph.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (!string.IsNullOrEmpty(node.Rds))
                {
                    var qname = $"og{node.Rds.Length}:{node.Aspect}{node.Rds}";
                    var nodeRds = Graph.CreateUriNode(qname);

                    Graph.Assert(new Triple(nodeId, type, nodeRds));
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
                var fromNode = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.FromNodeId));
                var toNode = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.ToNodeId));

                if (edge.Transport != null)
                {
                    var transportNode = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.TransportId));
                    Graph.Assert(new Triple(transportNode, type, transport));

                    Graph.Assert(new Triple(transportNode, label, Graph.CreateLiteralNode(edge.Transport.Name)));

                    if (!Roots.TryGetValue(edge.FromNode.Aspect.ToString(), out var rootNode))
                    {
                        throw new NotImplementedException();
                    }
                    Graph.Assert(new Triple(transportNode, hasParent, rootNode));

                    var aspect = Graph.CreateUriNode($"imf:{edge.FromNode.Aspect}");
                    Graph.Assert(new Triple(transportNode, hasAspect, aspect));

                    if (edge.Transport.InputTerminal != null)
                    {
                        var terminal = edge.Transport.InputTerminal;
                        var transportIn =
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.Transport.InputTerminalId));
                        Graph.Assert(new Triple(transportIn, type, inTerminal));

                        Graph.Assert(new Triple(transportNode, hasInTerminal, transportIn));


                        Graph.Assert(new Triple(transportIn, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.FromConnectorId))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportIn, label, terminalLabel));

                    }
                    if (edge.Transport.OutputTerminal != null)
                    {
                        var terminal = edge.Transport.OutputTerminal;
                        var transportOut =
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.Transport.OutputTerminalId));
                        Graph.Assert(new Triple(transportOut, type, outTerminal));

                        Graph.Assert(new Triple(transportNode, hasOutTerminal, transportOut));

                        Graph.Assert(new Triple(transportOut, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.ToConnectorId))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportOut, label, terminalLabel));
                    }
                }

                if (edge.Interface != null)
                {
                    var interfaceNode = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.InterfaceId));
                    Graph.Assert(new Triple(interfaceNode, type, Graph.CreateUriNode(Resources.Interface)));
                    
                    if (!Roots.TryGetValue(edge.FromNode.Aspect.ToString(), out var rootNode))
                    {
                        throw new NotImplementedException();
                    }
                    Graph.Assert(new Triple(interfaceNode, hasParent, rootNode));

                    var aspect = Graph.CreateUriNode($"imf:{edge.FromNode.Aspect}");
                    Graph.Assert(new Triple(interfaceNode, hasAspect, aspect));



                    Graph.Assert(new Triple(interfaceNode, label, Graph.CreateLiteralNode(edge.Interface.Name)));

                    if (edge.Interface.InputTerminal != null)
                    {
                        var inter = edge.Interface.InputTerminal;
                        var interIn =
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.Interface.InputTerminalId));
                        Graph.Assert(new Triple(interIn, type, inTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasInTerminal, interIn));


                        Graph.Assert(new Triple(interIn, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.FromConnectorId))));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interIn, label, interfaceLabel));

                    }
                    if (edge.Interface.OutputTerminal != null)
                    {
                        var inter = edge.Interface.OutputTerminal;
                        var interOut =
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.Interface.OutputTerminalId));
                        Graph.Assert(new Triple(interOut, type, outTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasOutTerminal, interOut));


                        Graph.Assert(new Triple(interOut, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, edge.ToConnectorId))));

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

            return StringWriter.Write(Graph, writer);

        }
        public byte[] GetBytes<T>() where T : IRdfWriter, new()
        {
            var graphString = RdfToString<T>();
            var bytes = Encoding.UTF8.GetBytes(graphString);

            return bytes;
        }
    }
}
