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
                {"imf", "http://example.com/imf#"},
                {"mimir", "http://example.com/mimir#"},
                {"lis", "http://standards.iso.org/iso/15926/part14/"}
            };

            if (namespaces is not null)
            {
                AddNamespaces(namespaces);
            }
        }

        private string BuildIri(string prefix, string suffix, string midfix = "")
        {
            if (_namespaces.TryGetValue(prefix, out var fullNamespace))
            {
                return $"{fullNamespace}{midfix}{suffix}";
            }

            if (ValidPrefix(prefix))
            {
                return $"{prefix}{midfix}{suffix}";
            }

            if (!ValidNamespace(prefix))
            {
                return $"{prefix}/{midfix}{suffix}";
            }
            
            return $"{prefix}{midfix}{suffix}";
        }

        private bool ValidPrefix(string prefix)
        {
            return prefix[^1] == char.Parse(":") && Graph.NamespaceMap.HasNamespace(prefix);
        }
        
        private bool ValidNamespace(string iri)
        {
            var validEnd = "#/".ToCharArray();
            return validEnd.Contains(iri[^1]);
        }

        private void AddNamespace(string prefix, string iri)
        {
            prefix = prefix.ToLower();
            if (!ValidNamespace(iri))
            {
                iri = $"{iri}/";
            }

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
            Roots = new Dictionary<string, INode>();

            var namespaces = new Dictionary<string, string>
            {
                {"sor", "https://rdf.equinor.com/sor/mimir/"},
                {"eq", "https://rdf.equinor.com/raw/mimir/"}
            };
            
            Project = project;
            Graph = BaseGraph(Project.Iri);
            InitaliseNamespaces(namespaces);

            var iri = Project.Iri;
            var name = Project.Name;
            var version = Project.Version;
            
            var projectNode = GetOrCreateUriNode(iri);
            var label = GetOrCreateUriNode(Resources.label);

            var isVersion = GetOrCreateUriNode(BuildIri("owl", "versionInfo"));
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
            FindAndAssertDomain(Project);

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
                {GetOrCreateUriNode(BuildIri("mimir", "hasPosX"), g), node.PositionX},
                {GetOrCreateUriNode(BuildIri("mimir", "hasPosY"), g), node.PositionY},
                {GetOrCreateUriNode(BuildIri("mimir", "hasBlockPosX"), g), node.PositionBlockX},
                {GetOrCreateUriNode(BuildIri("mimir", "hasBlockPosY"), g), node.PositionBlockY},
            };

            foreach (var (predicate, value) in data)
            {
                g.Assert(new Triple(rdfNode, predicate, g.CreateLiteralNode($"{value}", new Uri(BuildIri("xsd", "float")))));
            }
        }

        private void BuildAttributes(INode node, IEnumerable<Attribute> attributes)
        {
            var label = GetOrCreateUriNode(Resources.label);
            var type = GetOrCreateUriNode(Resources.type);

            var hasPhysicalQuantity = GetOrCreateUriNode(BuildIri("lis", "hasPhysicalQuantity"));

            var physicalQuantity = GetOrCreateUriNode(BuildIri("lis", "PhysicalQuantity"));
            var qualityQuantifiedAs = GetOrCreateUriNode(BuildIri("lis", "qualityQuantifiedAs"));

            var quantityDatum = GetOrCreateUriNode(BuildIri("lis", "ScalarQuantityDatum"));
            var datumUom = GetOrCreateUriNode(BuildIri("lis", "datumUOM"));
            var datumValue = GetOrCreateUriNode(BuildIri("lis", "datumValue"));
            var unitOfMeasure = GetOrCreateUriNode(BuildIri("lis", "Scale"));


            foreach (var attribute in attributes)
            {
                var attributeNode = GetOrCreateUriNode(attribute.Iri);
                FindAndAssertDomain(attribute);

                var value = attribute.Value;

                var attributeType = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], attribute.AttributeTypeId));
                Graph.Assert(new Triple(attributeType, label, Graph.CreateLiteralNode(attribute.Entity)));

 


                Graph.Assert(new Triple(attributeNode, label, Graph.CreateLiteralNode(attribute.Entity)));
                Graph.Assert(new Triple(attributeNode, type, physicalQuantity));
                Graph.Assert(new Triple(attributeNode, type, attributeType));

                Graph.Assert(new Triple(node, hasPhysicalQuantity, attributeNode));



                var datum = GetOrCreateUriNode(attribute.Iri + "-datum");

                var qualifier = GetOrCreateUriNode(MimirIdToIri(_namespaces["mimir"], "Qualifier" + attribute.QualifierId, string.Empty));
                var source = GetOrCreateUriNode(MimirIdToIri(_namespaces["mimir"], "Source" + attribute.SourceId, string.Empty));
                var condition = GetOrCreateUriNode(MimirIdToIri(_namespaces["mimir"], "Condition" + attribute.ConditionId, string.Empty));
                var format = GetOrCreateUriNode(MimirIdToIri(_namespaces["mimir"], "Format" + attribute.FormatId, string.Empty));

                var qPred = GetOrCreateUriNode(BuildIri("mimir", "qualifier"));
                var sPred = GetOrCreateUriNode(BuildIri("mimir", "source"));
                var cPred = GetOrCreateUriNode(BuildIri("mimir", "condition"));
                var fPred = GetOrCreateUriNode(BuildIri("mimir", "format"));

                Graph.Assert(new Triple(datum, qPred, qualifier));
                Graph.Assert(new Triple(datum, sPred, source));
                Graph.Assert(new Triple(datum, cPred, condition));
                Graph.Assert(new Triple(datum, fPred, format));

                if (value is not null)
                {
                    ILiteralNode literal;
                    if (int.TryParse(value, out var v))
                    {
                        literal = Graph.CreateLiteralNode(value, new Uri(BuildIri("xsd", "int")));
                    }
                    else if (double.TryParse(value, out var i))
                    {
                        literal = Graph.CreateLiteralNode(value, new Uri(BuildIri("xsd", "float")));
                    }
                    else
                    {
                        literal = Graph.CreateLiteralNode(value);
                    }
                    Graph.Assert(new Triple(datum, datumValue, literal));
                }

                Graph.Assert(new Triple(datum, type, quantityDatum));

                Graph.Assert(new Triple(attributeNode, qualityQuantifiedAs, datum));
                
                if (attribute.UnitString is null) continue;
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

        private void FindAndAssertDomain(Node node)
        {
            var rdfNode = GetOrCreateUriNode(node.Iri);
            var predicate = GetOrCreateUriNode(BuildIri("mimir", "domain"));
            var domain = Graph.CreateLiteralNode(node.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Attribute attribute)
        {
            var rdfNode = GetOrCreateUriNode(attribute.Iri);
            var predicate = GetOrCreateUriNode(BuildIri("mimir", "domain"));
            var domain = Graph.CreateLiteralNode(attribute.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Project project)
        {
            var rdfNode = GetOrCreateUriNode(project.Iri);
            var predicate = GetOrCreateUriNode(BuildIri("mimir", "domain"));
            var domain = Graph.CreateLiteralNode(project.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Edge edge)
        {
            var rdfNode = GetOrCreateUriNode(edge.Iri);
            var predicate = GetOrCreateUriNode(BuildIri("mimir", "domain"));
            var domain = Graph.CreateLiteralNode(edge.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Connector connector)
        {
            var rdfNode = GetOrCreateUriNode(connector.Iri);
            var predicate = GetOrCreateUriNode(BuildIri("mimir", "domain"));
            var domain = Graph.CreateLiteralNode(connector.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }

        private void BuildParent(Node node)
        {
            var parent = node.GetParent(Project);
            if (parent is null) return;

            var childNode = GetOrCreateUriNode(node.Iri);
            var parentNode = GetOrCreateUriNode(parent.Iri);
            Graph.Assert(new Triple(childNode, GetOrCreateUriNode(BuildIri("imf", "hasParent")), parentNode));
        }

        private void BuildNodes()
        {
            var label = GetOrCreateUriNode(Resources.label);
            var type = GetOrCreateUriNode(Resources.type);
            var hasAspect = GetOrCreateUriNode(Resources.hasAspect);
            var comment = GetOrCreateUriNode(Resources.desc);

            var hasInTerminal = GetOrCreateUriNode(BuildIri("imf", "hasInTerminal"));
            var hasOutTerminal = GetOrCreateUriNode(BuildIri("imf", "hasOutTerminal"));

            var inTerminal = GetOrCreateUriNode(BuildIri("imf", "InTerminal"));
            var outTerminal = GetOrCreateUriNode(BuildIri("imf", "OutTerminal"));


            foreach (var node in Project.Nodes)
            {
                var nodeId = GetOrCreateUriNode(node.Iri);
                BuildParent(node);

                if (node.Description is not null)
                {
                    Graph.Assert(new Triple(nodeId, comment, Graph.CreateLiteralNode(node.Description)));
                }

                var rds = GetOrCreateUriNode(BuildIri("imf", "rds"));
                var rdsString = Graph.CreateLiteralNode(RdsString(node));
                Graph.Assert(new Triple(nodeId, rds, rdsString));
                
                FindAndAssertDomain(node);
                AddPositionData(node);

                if (node.IsRoot)
                {
                    Graph.Assert(new Triple(nodeId, GetOrCreateUriNode(Resources.isAspectOf), GetOrCreateUriNode(node.MasterProjectIri)));
                    
                    Roots.Add(node.Aspect.ToString(), nodeId);
                    
                    Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(Project.Name + " " + node.Aspect)));
                    Graph.Assert(new Triple(nodeId, hasAspect, GetOrCreateUriNode(BuildIri("imf", node.Aspect.ToString()))));
                    continue;
                }

                Graph.Assert(new Triple(nodeId, type, GetOrCreateUriNode(Resources.FSB)));
                Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(node.Label)));

                FindAndAssertPurpose(node);

                if (node.Attributes.Count > 0)
                {
                    BuildAttributes(nodeId, node.Attributes);
                }

                if (node.Symbol is not null)
                {
                    Graph.Assert(new Triple(nodeId, GetOrCreateUriNode(BuildIri("mimir", "symbol")), Graph.CreateLiteralNode(node.Symbol)));
                }


                foreach (var connector in node.Connectors)
                {
                    FindAndAssertDomain(connector);
                    switch (connector)
                    {
                        case Terminal terminal:
                            var nodeTerminal = GetOrCreateUriNode(terminal.Iri);
                            GetAndAssertTransmitter(nodeTerminal, terminal);

                            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            Graph.Assert(new Triple(nodeTerminal, type, GetOrCreateUriNode(Resources.FSBTerminal)));
                            Graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            Graph.Assert(new Triple(nodeTerminal, GetOrCreateUriNode(BuildIri("mimir", "color")), Graph.CreateLiteralNode(terminal.Color)));
                            Graph.Assert(new Triple(nodeTerminal, GetOrCreateUriNode(BuildIri("mimir", "visible")), Graph.CreateLiteralNode(terminal.Visible.ToString())));


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


                            
                            if (terminal.Attributes.Count > 0)
                            {
                                BuildAttributes(nodeTerminal, terminal.Attributes);
                            }
                            break;
                    }
                }

                var nodeAspect = GetOrCreateUriNode(BuildIri("imf", node.Aspect.ToString()));
                Graph.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (string.IsNullOrEmpty(node.Rds)) continue;

                GetAndAssertRds(nodeId, node);
            }
        }

        private void GetAndAssertRds(INode rdfNode, Node node)
        {
            var strippedRds = node.StrippedRds();
            var rdsIri = @$"http://example.com/rds/og{strippedRds.Length}#{node.Aspect}{strippedRds}";
            var nodeRds = GetOrCreateUriNode(rdsIri);
            Graph.Assert(new Triple(rdfNode, GetOrCreateUriNode(Resources.type), nodeRds));
        }

        private void GetAndAssertTransmitter(INode nodeTerminal, Terminal terminal)
        {
            var type = GetOrCreateUriNode(Resources.type);
            var subclass = GetOrCreateUriNode(Resources.subClassOf);
            var transmitterIri = BuildIri("eq", $"Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}");
            var transmitter = GetOrCreateUriNode(transmitterIri);
            Graph.Assert(new Triple(transmitter, subclass, GetOrCreateUriNode(BuildIri("mimir", "Transmitter"))));
            Graph.Assert(new Triple(nodeTerminal, type, transmitter));
        }

        private void FindAndAssertPurpose(Node node)
        {
            if (node.Purpose is null) return;

            var rdfNode = GetOrCreateUriNode(node.Iri);
            var predicate = GetOrCreateUriNode(BuildIri("mimir", "hasPurpose"));
            var purpose = GetOrCreateUriNode(BuildIri("mimir", node.Purpose.Id, "ID"));
            Graph.Assert(new Triple(rdfNode, predicate, purpose));
        }

        private void BuildInterface(Edge edge)
        {
            var interfaceType = GetOrCreateUriNode(Resources.Interface);
            var type = GetOrCreateUriNode(Resources.type);
            var hasParent = GetOrCreateUriNode(Resources.hasParent);
            var label = GetOrCreateUriNode(Resources.label);
            var hasAspect = GetOrCreateUriNode(Resources.hasAspect);

            var interfaceObject = edge.Interface;
            var aspect = edge.FromNode.Aspect;

            var interfaceNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], interfaceObject.Id));
            Graph.Assert(new Triple(interfaceNode, type, interfaceType));

            if (interfaceObject.Attributes.Count > 0)
            {
                BuildAttributes(interfaceNode, edge.Interface.Attributes);
            }

            if (!Roots.TryGetValue(aspect.ToString(), out var rootNode))
            {
                throw new NotImplementedException();
            }
            Graph.Assert(new Triple(interfaceNode, hasParent, rootNode));

            var aspectNode = GetOrCreateUriNode($"imf:{aspect}");
            Graph.Assert(new Triple(interfaceNode, hasAspect, aspectNode));

            Graph.Assert(new Triple(interfaceNode, label, Graph.CreateLiteralNode(interfaceObject.Name)));

            BuildStreamTerminals(interfaceObject, edge);
        }

        private void BuildTransport(Edge edge)
        {
            var transportType = GetOrCreateUriNode(Resources.Transport);
            var type = GetOrCreateUriNode(Resources.type);
            var hasParent = GetOrCreateUriNode(Resources.hasParent);
            var label = GetOrCreateUriNode(Resources.label);
            var hasAspect = GetOrCreateUriNode(Resources.hasAspect);

            var transport = edge.Transport;
            var aspect = edge.FromNode.Aspect;
            
            var transportNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], transport.Id));
            Graph.Assert(new Triple(transportNode, type, transportType));
            Graph.Assert(new Triple(transportNode, label, Graph.CreateLiteralNode(transport.Name)));

            BuildStreamTerminals(transport, edge);

            if (transport.Attributes.Count > 0)
            {
                BuildAttributes(transportNode, transport.Attributes);
            }

            if (!Roots.TryGetValue(aspect.ToString(), out var rootNode))
            {
                throw new NotImplementedException();
            }
            Graph.Assert(new Triple(transportNode, hasParent, rootNode));

            var aspectNode = GetOrCreateUriNode($"imf:{aspect}");
            Graph.Assert(new Triple(transportNode, hasAspect, aspectNode));
        }

        private void BuildStreamTerminals(Transport transportObject, Edge edge)
        {
            var rdfNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], transportObject.Id));

            if (transportObject.InputTerminal != null)
            {
                var terminal = transportObject.InputTerminal;
                BuildStreamTerminal(rdfNode, terminal, edge.FromConnector, terminal.Type);
            }
            if (transportObject.OutputTerminal != null)
            {
                var terminal = transportObject.OutputTerminal;
                BuildStreamTerminal(rdfNode, terminal, edge.ToConnector, terminal.Type);
            }
        }
        private void BuildStreamTerminals(Interface interfaceObject, Edge edge)
        {
            var rdfNode = GetOrCreateUriNode(MimirIdToIri(_namespaces["sor"], interfaceObject.Id));

            if (interfaceObject.InputTerminal != null)
            {
                var terminal = interfaceObject.InputTerminal;
                BuildStreamTerminal(rdfNode, terminal, edge.FromConnector, terminal.Type);
            }
            if (interfaceObject.OutputTerminal != null)
            {
                var terminal = interfaceObject.OutputTerminal;
                BuildStreamTerminal(rdfNode, terminal, edge.FromConnector, terminal.Type);
            }
        }

        private void BuildStreamTerminal(INode transportNode, Connector terminal, Connector connection, ConnectorType connectorType)
        {
            var type = GetOrCreateUriNode(Resources.type);
            var streamTerminalType = GetOrCreateUriNode(Resources.StreamTerminal);
            var label = GetOrCreateUriNode(Resources.label);
            var connectedTo = GetOrCreateUriNode(Resources.connectedTo);

            var terminalNode = GetOrCreateUriNode(terminal.Iri);
            GetAndAssertTransmitter(terminalNode, (Terminal)terminal);

            INode hasTerminal;
            INode terminalType;
            switch (connectorType)
            {
                case ConnectorType.Input:
                    hasTerminal = GetOrCreateUriNode(Resources.hasInputTerminal);
                    terminalType = GetOrCreateUriNode(Resources.InputTerminal);
                    break;
                case ConnectorType.Output:
                    hasTerminal = GetOrCreateUriNode(Resources.hasOutputTerminal);
                    terminalType = GetOrCreateUriNode(Resources.OutputTerminal);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(connectorType), connectorType, null);
            }

            FindAndAssertDomain(terminal);

            var transportTerminal = GetOrCreateUriNode(terminal.Iri);
            Graph.Assert(new Triple(transportTerminal, type, terminalType));
            Graph.Assert(new Triple(transportTerminal, type, streamTerminalType));

            Graph.Assert(new Triple(transportNode, hasTerminal, transportTerminal));

            Graph.Assert(new Triple(transportTerminal, connectedTo, GetOrCreateUriNode((connection.Iri))));

            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
            Graph.Assert(new Triple(transportTerminal, label, terminalLabel));
        }


        private void BuildEdges()
        {
            var edges = Project.Edges;

            foreach (var edge in edges)
            {
                var fromNode = GetOrCreateUriNode(edge.FromNode.Iri);
                var toNode = GetOrCreateUriNode(edge.ToNode.Iri);

                if (edge.Transport != null)
                {
                    BuildTransport(edge);
                }

                if (edge.Interface != null)
                {
                    BuildInterface(edge);
                }

                if (edge.FromConnector is Relation { RelationType: not RelationType.PartOf } fromRelation)
                {
                    var relationString = LowerCaseFirstCharacter(fromRelation.RelationType.ToString());
                    var relationFromNode = GetOrCreateUriNode(BuildIri("imf", relationString));
                    Graph.Assert(new Triple(fromNode, relationFromNode, toNode));
                }

                if (edge.ToConnector is Relation { RelationType: not RelationType.PartOf } toRelation)
                {
                    var relationString = LowerCaseFirstCharacter(toRelation.RelationType.ToString());
                    var relationToNode = GetOrCreateUriNode(BuildIri("imf", relationString));
                    Graph.Assert(new Triple(toNode, relationToNode, fromNode));
                }

            }
        }

        private static string LowerCaseFirstCharacter(string input)
        {
            return input[..1].ToLower() + input[1..];
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

        [Obsolete("You should use your IRI directly")]
        private static string MimirIdToIri(string prefix, string id, string midfix = "ID")
        {
            id = id.Replace("equinor.com_", "");
            return $"{prefix}{midfix}{id}";
        }

    }

    public static class NodeExtension
    {
        public static Node GetParent(this Node node, Project project)
        {
            foreach (var edge in project.Edges)
            {
                if (edge.ToNodeId != node.Id) continue;

                if (!edge.ToConnector.IsPartOf()) continue;

                if (edge.ToConnector.IsConnected(project))
                {
                    return edge.FromNode;
                }
            }

            return null;
        }

        public static string StrippedRds(this Node node) => Regex.Replace(node.Rds, @"\d+", string.Empty);

        }
    

    public static class ConnectorExtension
    {
        public static bool IsPartOf(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf };
        }

        public static Connector GetParentConnector(this Connector c, Project project)
        {
            if (c.IsChildConnector() && c.IsConnected(project))
            {
                return (from edge in project.Edges where edge.ToConnectorId == c.Id select edge.FromConnector).FirstOrDefault();
            }

            return null;
        }

        public static bool IsChildConnector(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf, Type: ConnectorType.Input };
        }
        public static bool IsParentConnector(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf, Type: ConnectorType.Output };
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

