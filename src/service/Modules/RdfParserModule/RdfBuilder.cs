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
        public Dictionary<string, INode> Roots;
        private Dictionary<string, string> _namespaces;
        private string _domain;

        //private IDictionary<string>



        private IGraph BaseGraph(string uri)
        {
            var ontology = new OntologyGraph();

            // /Data/ontologies.owl is used to define the base graph with all the prefixes and namespaces you might wish to use
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/ontologies.owl";
            ontology.LoadFromFile(filePath, new TurtleParser());
            ontology.BaseUri = new Uri(uri);

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


        private void InitaliseNamespaces(IDictionary<string, string> namespaces = null)
        {
            _namespaces = new Dictionary<string, string>
            {
                {"owl", "http://www.w3.org/2002/07/owl#"},
                {"rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"},
                {"rdfs", "http://www.w3.org/2000/01/rdf-schema#"},
                {"xml", "http://www.w3.org/XML/1998/namespace"},
                {"xsd", "http://www.w3.org/2001/XMLSchema#"},
                {"imf", "http://example.com/imf#"}
            };

            if (namespaces is not null)
            {
                AddNamespaces(namespaces);
            }
        }

        private static string BuildIri(string ns, string id)
        {
            return $"{ns}{id}";
        }

        private void AddNamespace(string prefix, string iri)
        {
            _namespaces.Add(prefix, iri);
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
            var namespaces = new Dictionary<string, string>
            {
                {"sor", "https://rdf.equinor.com/sor/mimir/"},
                {"eq", "https://rdf.equinor.com/"}
            };
            
            Project = project;
            Graph = BaseGraph("http://rdf.equinor.com/");
            InitaliseNamespaces(namespaces);

            _domain = project.Domain;

            Roots = new Dictionary<string, INode>();

            var iri = Project.Iri;
            var name = Project.Name;
            var version = Project.Version;

   
            // Node for the project (named after its ID)
            var projectNode = GetOrCreateUriNode(iri);
            var label = GetOrCreateUriNode(Resources.label);

            var isVersion = GetOrCreateUriNode(BuildIri(_namespaces["owl"], "versionInfo"));
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

        private INode GetOrCreateUriNode(string iri, IGraph g = null)
        {
            g ??= Graph;

            var isHttpRegex = new Regex(@"http(s)*");

            if (!isHttpRegex.IsMatch(iri)) return g.GetUriNode(iri) ?? g.CreateUriNode(iri);

            var uri = new Uri(iri);
            return g.GetUriNode(uri) ?? g.CreateUriNode(uri);
        }

        private void AddPositionData(Node node, IGraph g = null)
        {
            g ??= Graph;

            var rdfNode = GetOrCreateUriNode(node.Iri);

            var data = new Dictionary<INode, decimal>
            {
                {GetOrCreateUriNode("mimir:hasPosX", g), node.PositionX},
                {GetOrCreateUriNode("mimir:hasPosY", g), node.PositionY},
                {GetOrCreateUriNode("mimir:hasBlockPosX", g), node.PositionBlockX},
                {GetOrCreateUriNode("mimir:hasBlockPosY", g), node.PositionBlockY},
            };

            foreach (var (predicate, value) in data)
            {
                g.Assert(new Triple(rdfNode, predicate, g.CreateLiteralNode($"{value}", new Uri(BuildIri(_namespaces["xsd"], "float")))));
            }
        }

        private void BuildAttributes(INode node, IEnumerable<Attribute> attributes)
        {
            var label = GetOrCreateUriNode(Resources.label);
            var type = GetOrCreateUriNode(Resources.type);

            var hasPhysicalQuantity = GetOrCreateUriNode("lis:hasPhysicalQuantity");
            var physicalQuantity = GetOrCreateUriNode("lis:PhysicalQuantity");

            var qualityQuantifiedAs = GetOrCreateUriNode("lis:qualityQuantifiedAs");

            var quantityDatum = GetOrCreateUriNode("lis:QuantityDatum");
            var datumUom = GetOrCreateUriNode("lis:datumUOM");
            var datumValue = GetOrCreateUriNode("lis:datumValue");

            var unitOfMeasure = GetOrCreateUriNode("lis:UnitOfMeasure");


            foreach (var attribute in attributes)
            {
                var value = attribute.Value;

                var attributeType = GetOrCreateUriNode(MimirIdToIri(_namespaces["eq"], attribute.AttributeTypeId));
                Graph.Assert(new Triple(attributeType, label, Graph.CreateLiteralNode(attribute.Key)));

                var attributeNode = GetOrCreateUriNode(attribute.Iri);
                Graph.Assert(new Triple(attributeNode, label, Graph.CreateLiteralNode(attribute.Key)));
                Graph.Assert(new Triple(attributeNode, type, physicalQuantity));
                Graph.Assert(new Triple(attributeNode, type, attributeType));

                Graph.Assert(new Triple(node, hasPhysicalQuantity, attributeNode));


                var datum = GetOrCreateUriNode(attribute.Iri + "-datum");

                if (value is not null)
                {
                    ILiteralNode literal;
                    if (double.TryParse(value, out var v))
                    {
                        literal = Graph.CreateLiteralNode(value, new Uri(BuildIri(_namespaces["xsd"], "float")));
                    }
                    else if (int.TryParse(value, out var i))
                    {
                        literal = Graph.CreateLiteralNode(value, new Uri(BuildIri(_namespaces["xsd"], "int")));
                    }
                    else
                    {
                        literal = Graph.CreateLiteralNode(value);
                    }
                    Graph.Assert(new Triple(datum, datumValue, literal));
                }

                Graph.Assert(new Triple(datum, type, quantityDatum));

                Graph.Assert(new Triple(attributeNode, qualityQuantifiedAs, datum));

                var units = JsonConvert.DeserializeObject<List<Unit>>(attribute.UnitString);

                // units.count can be 0 even if there is a value
                // uncertain how to handle this if this should actually be allowed
                if (units?.Count == 0)
                {
                    continue;
                }

                var unitName = string.Empty;

                if (attribute.SelectedUnitId == null) continue;

                if (units != null)
                    foreach (var unit in units.Where(unit => unit.Id == attribute.SelectedUnitId))
                    {
                        unitName = unit.Name;
                    }

                var unitNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["eq"], attribute.SelectedUnitId));
                Graph.Assert(new Triple(unitNode, type, unitOfMeasure));
                Graph.Assert(new Triple(unitNode, label, Graph.CreateLiteralNode(unitName)));
                Graph.Assert(new Triple(datum, datumUom, unitNode));

            }
        }

        private void BuildNodes()
        {
            var label = GetOrCreateUriNode(Resources.label);
            var type = GetOrCreateUriNode(Resources.type);
            var hasAspect = GetOrCreateUriNode(Resources.hasAspect);
            var comment = GetOrCreateUriNode(Resources.desc);

            var hasInTerminal = GetOrCreateUriNode("imf:hasInTerminal");
            var hasOutTerminal = GetOrCreateUriNode("imf:hasOutTerminal");

            var inTerminal = GetOrCreateUriNode("imf:InTerminal");
            var outTerminal = GetOrCreateUriNode("imf:OutTerminal");


            foreach (var node in Project.Nodes)
            {
                var nodeId = GetOrCreateUriNode(node.Iri);
                if (node.Description is not null)
                {
                    Graph.Assert(new Triple(nodeId, comment, Graph.CreateLiteralNode(node.Description)));
                }

                var rds = GetOrCreateUriNode("imf:rds");
                var rdsString = Graph.CreateLiteralNode(RdsString(node));
                Graph.Assert(new Triple(nodeId, rds, rdsString));

                AddPositionData(node);
             
                if (node.IsRoot)
                {
                    Graph.Assert(new Triple(nodeId, GetOrCreateUriNode(Resources.isAspectOf), GetOrCreateUriNode(node.MasterProjectIri)));
                    
                    Roots.Add(node.Aspect.ToString(), nodeId);
                    
                    Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(Project.Name + " " + node.Aspect)));
                    Graph.Assert(new Triple(nodeId, hasAspect, GetOrCreateUriNode("imf:" + node.Aspect)));
                    continue;
                }

                Graph.Assert(new Triple(nodeId, type, GetOrCreateUriNode(Resources.FSB)));
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
                            var nodeTerminal = GetOrCreateUriNode(terminal.Iri);
                            var terminalIri = $"{_namespaces["eq"]}Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}";
                            

                            var transmitter = GetOrCreateUriNode(terminalIri);
                            Graph.Assert(new Triple(nodeTerminal, type, transmitter));
                            Graph.Assert(new Triple(transmitter, type, GetOrCreateUriNode("imf:Transmitter")));

                            switch (terminal.Type)
                            {
                                case ConnectorType.Input:
                                    Graph.Assert(new Triple(nodeId, hasInTerminal, nodeTerminal));
                                    Graph.Assert(new Triple(nodeTerminal, type, inTerminal));
                                    break;
                                case ConnectorType.Output:
                                    Graph.Assert(new Triple(nodeId, hasOutTerminal, nodeTerminal));
                                    Graph.Assert(new Triple(nodeTerminal, type, outTerminal));
                                    break;
                            }

                            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            Graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            Graph.Assert(new Triple(nodeTerminal, type, GetOrCreateUriNode(Resources.FSBTerminal)));
                            
                            if (terminal.Attributes.Count > 0)
                            {
                                BuildAttributes(nodeTerminal, terminal.Attributes);
                            }
                            break;
                    }
                }

                var nodeAspect = GetOrCreateUriNode(_namespaces["imf"] + node.Aspect);
                Graph.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (!string.IsNullOrEmpty(node.Rds))
                {
                    var qname = $"og{node.Rds.Length}:{node.Aspect}{node.Rds}";
                    var nodeRds = GetOrCreateUriNode(qname);

                    Graph.Assert(new Triple(nodeId, type, nodeRds));
                }


            }
        }


        private void BuildEdges()
        {
            var edges = Project.Edges;
            var type = GetOrCreateUriNode(Resources.type);
            var hasParent = GetOrCreateUriNode(Resources.hasParent);
            var label = GetOrCreateUriNode(Resources.label);
            var connectedTo = GetOrCreateUriNode(Resources.connectedTo);
            var transport = GetOrCreateUriNode(Resources.Transport);
            var inTerminal = GetOrCreateUriNode(Resources.InputTerminal);
            var hasInTerminal = GetOrCreateUriNode(Resources.hasInputTerminal);
            var hasOutTerminal = GetOrCreateUriNode(Resources.hasOutputTerminal);
            var outTerminal = GetOrCreateUriNode(Resources.OutputTerminal);
            var hasAspect = GetOrCreateUriNode(Resources.hasAspect);

            foreach (var edge in edges)
            {
                var fromNode = GetOrCreateUriNode(edge.FromNode.Iri);
                var toNode = GetOrCreateUriNode(edge.ToNode.Iri);

                if (edge.Transport != null)
                {
                    var transportNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], edge.TransportId));
                    Graph.Assert(new Triple(transportNode, type, transport));

                    Graph.Assert(new Triple(transportNode, label, Graph.CreateLiteralNode(edge.Transport.Name)));

                    if (!Roots.TryGetValue(edge.FromNode.Aspect.ToString(), out var rootNode))
                    {
                        throw new NotImplementedException();
                    }
                    Graph.Assert(new Triple(transportNode, hasParent, rootNode));

                    var aspect = GetOrCreateUriNode($"imf:{edge.FromNode.Aspect}");
                    Graph.Assert(new Triple(transportNode, hasAspect, aspect));

                    if (edge.Transport.InputTerminal != null)
                    {
                        var terminal = edge.Transport.InputTerminal;
                        var transportIn = GetOrCreateUriNode(edge.Transport.InputTerminal.Iri);
                        Graph.Assert(new Triple(transportIn, type, inTerminal));

                        Graph.Assert(new Triple(transportNode, hasInTerminal, transportIn));


                        Graph.Assert(new Triple(transportIn, connectedTo, GetOrCreateUriNode((edge.FromConnector.Iri))));

                        var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                        Graph.Assert(new Triple(transportIn, label, terminalLabel));

                    }
                    if (edge.Transport.OutputTerminal != null)
                    {
                        var terminal = edge.Transport.OutputTerminal;
                        var transportOut = GetOrCreateUriNode(edge.Transport.OutputTerminal.Iri);
                        Graph.Assert(new Triple(transportOut, type, outTerminal));

                        Graph.Assert(new Triple(transportNode, hasOutTerminal, transportOut));

                        Graph.Assert(new Triple(transportOut, connectedTo, GetOrCreateUriNode(edge.ToConnector.Iri)));

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
                    var interfaceNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], edge.InterfaceId));
                    Graph.Assert(new Triple(interfaceNode, type, GetOrCreateUriNode(Resources.Interface)));
                    
                    if (!Roots.TryGetValue(edge.FromNode.Aspect.ToString(), out var rootNode))
                    {
                        throw new NotImplementedException();
                    }
                    Graph.Assert(new Triple(interfaceNode, hasParent, rootNode));

                    var aspect = GetOrCreateUriNode($"imf:{edge.FromNode.Aspect}");
                    Graph.Assert(new Triple(interfaceNode, hasAspect, aspect));



                    Graph.Assert(new Triple(interfaceNode, label, Graph.CreateLiteralNode(edge.Interface.Name)));

                    if (edge.Interface.InputTerminal != null)
                    {
                        var inter = edge.Interface.InputTerminal;
                        var interIn = GetOrCreateUriNode(edge.Interface.InputTerminal.Iri);
                        Graph.Assert(new Triple(interIn, type, inTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasInTerminal, interIn));


                        Graph.Assert(new Triple(interIn, connectedTo, GetOrCreateUriNode(edge.FromConnector.Iri)));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interIn, label, interfaceLabel));

                    }
                    if (edge.Interface.OutputTerminal != null)
                    {
                        var inter = edge.Interface.OutputTerminal;
                        var interOut = GetOrCreateUriNode(edge.Interface.OutputTerminal.Iri);
                        Graph.Assert(new Triple(interOut, type, outTerminal));

                        Graph.Assert(new Triple(interfaceNode, hasOutTerminal, interOut));


                        Graph.Assert(new Triple(interOut, connectedTo, GetOrCreateUriNode(edge.ToConnector.Iri)));

                        var interfaceLabel = Graph.CreateLiteralNode(inter.Name + " " + inter.Type);
                        Graph.Assert(new Triple(interOut, label, interfaceLabel));
                    }
                    if (edge.Interface.Attributes.Count > 0)
                    {
                        BuildAttributes(interfaceNode, edge.Interface.Attributes);
                    }
                }

                if (edge.FromConnector is Relation { RelationType: not RelationType.PartOf } fromRelation)
                {
                    var relationFromNode = GetOrCreateUriNode("imf:" + fromRelation.RelationType);
                    Graph.Assert(new Triple(fromNode, relationFromNode, toNode));
                }

                if (edge.ToConnector is not Relation { RelationType: not RelationType.PartOf } toRelation) continue;

                var relationString = toRelation.ToString()?[..1].ToLower() + toRelation.ToString()?[1..];
                var relationToNode = GetOrCreateUriNode("imf:" + relationString);
                Graph.Assert(new Triple(toNode, relationToNode, fromNode));
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
