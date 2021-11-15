using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Newtonsoft.Json;
using RdfParserModule.Properties;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using Attribute = Mb.Models.Data.Attribute;
using StringWriter = VDS.RDF.Writing.StringWriter;


namespace RdfParserModule
{
    public class RdfBuilder : IRdfBuilder
    {
        public Project Project;
        public IGraph Graph;        
        public Dictionary<string, IUriNode> Roots;
        
        // Namespaces
        private string Owl;
        private string Rdf;
        private string Rdfs;
        private string Xsd;
        private string Xml;

        //private IDictionary<string>



        private IGraph BaseGraph(string uri)
        {
            var ontology = new OntologyGraph();

            // /Data/ontologies.owl is used to define the base graph with all the prefixes and namespaces you might wish to use
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/ontologies.owl";
            ontology.LoadFromFile(filePath, new TurtleParser());
            ontology.BaseUri = null;

            return ontology;
        }



        [Obsolete("You should use your IRI directly")]
        private static string MimirIdToIri(string prefix, string id, string midfix = "ID")
        {
            id = id.Replace("equinor.com_", "");
            return $"{prefix}{midfix}{id}";
        }

        private string RdsString(Node node)
        {
            if (node.IsRoot)
            {
                return $"<{Project.Name.ToUpper()}>";
            }

            var prefix = node.Aspect switch
            {
                Aspect.Function => "=",
                Aspect.Location => "+",
                Aspect.Product => "-",
                Aspect.NotSet => throw new NotImplementedException(),
                Aspect.None => throw new NotImplementedException(),
                _ => string.Empty
            };

            var parent = node.GetParent(Project);
            var rds = node.Rds;

            return parent is not null ? $"{RdsString(parent)}{prefix}{rds}" : $"{prefix}{rds}";
        }


        private void InitaliseNamespaces()
        {
            Owl = "http://www.w3.org/2002/07/owl#";
            Rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
            Rdfs = "http://www.w3.org/2000/01/rdf-schema#";
            Xsd = "http://www.w3.org/2001/XMLSchema#";
            Xml = "http://www.w3.org/XML/1998/namespace";
        }

        private string BuildIri(string ns, string id)
        {
            return $"{ns}{id}";
        }

        private void AddNamespace(string prefix, string iri)
        {
            Graph.NamespaceMap.AddNamespace(prefix, new Uri(iri));
        }

        private void AddNamespaces(IDictionary<string, string> dictionary)
        {
            foreach (var (prefix, iri) in dictionary)
            {
                AddNamespace(prefix, iri);
            }
        }


        public void BuildProject(Project project)
        {
            InitaliseNamespaces();
            Project = project;
            Graph = BaseGraph("http://rdf.equinor.com/");

            var namespaces = new Dictionary<string, string>
            {
                {"mimir", "http://rdf.equinor.com/sor/mimir/"},
                {"eq", "http://rdf.equinor.com/"}
            };
            AddNamespaces(namespaces);

            Roots = new Dictionary<string, IUriNode>();

            var id = Project.Id;
            var name = Project.Name;
            var version = Project.Version;

   
            // Node for the project (named after its ID)
            var projectNode = GetOrCreateUriNode(MimirIdToIri(Resources.mimirPrefix, id));
            var label = GetOrCreateUriNode(Resources.label);

            var isVersion = GetOrCreateUriNode(BuildIri(Owl, "versionInfo"));
            var projectName = Graph.CreateLiteralNode(name);
            var projectVersion = Graph.CreateLiteralNode(version);

            var type = GetOrCreateUriNode(Resources.type);

            if (Project.Description is not null)
            {
                Graph.Assert(new Triple(projectNode, GetOrCreateUriNode(Resources.desc), Graph.CreateLiteralNode(Project.Description)));
            }

            Graph.Assert(new Triple(projectNode, label, projectName));
            Graph.Assert(new Triple(projectNode, isVersion, projectVersion));
            Graph.Assert(new Triple(projectNode, type, GetOrCreateUriNode(Resources.project)));
            Graph.Assert(new Triple(projectNode, type, GetOrCreateUriNode(Resources.IntegratedObject)));

            BuildNodes();
            BuildEdges();
        }

        private INode GetOrCreateUriNode(string iri)
        {
            var isHttpRegex = new Regex(@"http(s)*");

            if (!isHttpRegex.IsMatch(iri)) return Graph.GetUriNode(iri) ?? Graph.CreateUriNode(iri);

            var uri = new Uri(iri);
            return Graph.GetUriNode(uri) ?? Graph.CreateUriNode(uri);
        }

        private void BuildAttributes(INode node, IEnumerable<Attribute> attributes)
        {
            var label = Graph.CreateUriNode(Resources.label);
            var type = Graph.CreateUriNode(Resources.type);

            var hasPhysicalQuantity = Graph.CreateUriNode("lis:hasPhysicalQuantity");
            var physicalQuantity = Graph.CreateUriNode("lis:PhysicalQuantity");

            var qualityQuantifiedAs = Graph.CreateUriNode("lis:qualityQuantifiedAs");

            var quantityDatum = Graph.CreateUriNode("lis:QuantityDatum");
            var datumUOM = Graph.CreateUriNode("lis:datumUOM");
            var datumValue = Graph.CreateUriNode("lis:datumValue");

            var unitOfMeasure = Graph.CreateUriNode("lis:UnitOfMeasure");


            foreach (var attribute in attributes)
            {
                var value = attribute.Value;

                var attributeType = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, attribute.AttributeTypeId));
                Graph.Assert(new Triple(attributeType, label, Graph.CreateLiteralNode(attribute.Key)));

                var attributeNode = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, attribute.Id));
                Graph.Assert(new Triple(attributeNode, label, Graph.CreateLiteralNode(attribute.Key)));
                Graph.Assert(new Triple(attributeNode, type, physicalQuantity));
                Graph.Assert(new Triple(attributeNode, type, attributeType));

                Graph.Assert(new Triple(node, hasPhysicalQuantity, attributeNode));


                var datum = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, attribute.Id, "datum"));

                if (value is not null)
                {
                    Graph.Assert(new Triple(datum, datumValue, Graph.CreateLiteralNode(value)));
                }

                Graph.Assert(new Triple(datum, type, quantityDatum));

                Graph.Assert(new Triple(attributeNode, qualityQuantifiedAs, datum));

                var units = JsonConvert.DeserializeObject<List<Unit>>(attribute.UnitString);

                // units.count can be 0 even if there is a value
                // uncertain how to handle this if this should actually be allowed
                if (units.Count == 0)
                {
                    continue;
                }

                var unitName = string.Empty;

                if (attribute.SelectedUnitId == null) continue;

                foreach (var unit in units.Where(unit => unit.Id == attribute.SelectedUnitId))
                {
                    unitName = unit.Name;
                }
                var unitNode = Graph.CreateUriNode(MimirIdToIri(Resources.equinorPrefix, attribute.SelectedUnitId));
                Graph.Assert(new Triple(unitNode, type, unitOfMeasure));
                Graph.Assert(new Triple(unitNode, label, Graph.CreateLiteralNode(unitName)));
                Graph.Assert(new Triple(datum, datumUOM, unitNode));

            }
        }

        private void BuildNodes()
        {
            var label = Graph.CreateUriNode(Resources.label);
            var type = Graph.CreateUriNode(Resources.type);
            var hasAspect = Graph.CreateUriNode(Resources.hasAspect);
            var comment = Graph.CreateUriNode(Resources.desc);


            foreach (var node in Project.Nodes)
            {
                var nodeId = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, node.Id));
                if (node.Description is not null)
                {
                    Graph.Assert(new Triple(nodeId, comment, Graph.CreateLiteralNode(node.Description)));
                }

                var rds = GetOrCreateUriNode("imf:rds");
                var rdsString = Graph.CreateLiteralNode(RdsString(node));
                Graph.Assert(new Triple(nodeId, rds, rdsString));
             
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
                

                if (node.Attributes.Count > 0)
                {
                    BuildAttributes(nodeId, node.Attributes);
                }


                foreach (var connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:
                            var nodeTerminal = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, terminal.Id));
                            var terminalIri = $"{Resources.equinorPrefix}Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}";
                            

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
                            
                            if (terminal.Attributes.Count > 0)
                            {
                                BuildAttributes(nodeTerminal, terminal.Attributes);
                            }
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
                var fromNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.FromNodeId));
                var toNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.ToNodeId));

                if (edge.Transport != null)
                {
                    var transportNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.TransportId));
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
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.Transport.InputTerminalId));
                        Graph.Assert(new Triple(transportIn, type, inTerminal));

                        Graph.Assert(new Triple(transportNode, hasInTerminal, transportIn));


                        Graph.Assert(new Triple(transportIn, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.FromConnectorId))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportIn, label, terminalLabel));

                    }
                    if (edge.Transport.OutputTerminal != null)
                    {
                        var terminal = edge.Transport.OutputTerminal;
                        var transportOut =
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.Transport.OutputTerminalId));
                        Graph.Assert(new Triple(transportOut, type, outTerminal));

                        Graph.Assert(new Triple(transportNode, hasOutTerminal, transportOut));

                        Graph.Assert(new Triple(transportOut, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.ToConnectorId))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportOut, label, terminalLabel));
                    }

                    if (edge.Transport.Attributes.Count > 0)
                    {
                        BuildAttributes(transportNode, edge.Transport.Attributes);
                    }
                }

                if (edge.Interface != null)
                {
                    var interfaceNode = Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.InterfaceId));
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
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.Interface.InputTerminalId));
                        Graph.Assert(new Triple(interIn, type, inTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasInTerminal, interIn));


                        Graph.Assert(new Triple(interIn, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.FromConnectorId))));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interIn, label, interfaceLabel));

                    }
                    if (edge.Interface.OutputTerminal != null)
                    {
                        var inter = edge.Interface.OutputTerminal;
                        var interOut =
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.Interface.OutputTerminalId));
                        Graph.Assert(new Triple(interOut, type, outTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasOutTerminal, interOut));


                        Graph.Assert(new Triple(interOut, connectedTo,
                            Graph.CreateUriNode(MimirIdToIri(Resources.mimirPrefix, edge.ToConnectorId))));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interOut, label, interfaceLabel));
                    }
                    if (edge.Interface.Attributes.Count > 0)
                    {
                        BuildAttributes(interfaceNode, edge.Interface.Attributes);
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

    public static class NodeExtension
    {
        public static Node GetParent(this Node node, Project project)
        {
            foreach (var edge in project.Edges)
            {
                if (edge.ToNodeId == node.Id)
                {
                    if (edge.ToConnector.IsPartOf())
                    {
                        if (edge.ToConnector.IsConnected(project))
                        {
                            return edge.FromNode;
                        }
                    }
                }
            }

            return null;
        }

        public static string StrippedRds(this Node node)
        {
            var rx = @"\d+";
            return Regex.Replace(node.Rds, rx, string.Empty);
        }
    }

    public static class ConnectorExtension
    {
        public static bool IsPartOf(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf };
        }

        public static Connector ConnectedTo(this Connector c, Project project)
        {
            return (from edge in project.Edges where edge.FromConnectorId == c.Id select edge.ToConnector).FirstOrDefault();
        }

        public static bool IsConnected(this Connector c, Project project)
        {
            return project.Edges.Any(edge => edge.FromConnectorId == c.Id || edge.ToConnectorId == c.Id);
        }
    }
}
