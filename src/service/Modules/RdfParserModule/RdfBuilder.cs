using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Extensions;
using RdfParserModule.Properties;
using RdfParserModule.Repositories;
using VDS.RDF;
using Attribute = Mb.Models.Data.Attribute;
using StringWriter = VDS.RDF.Writing.StringWriter;


namespace RdfParserModule
{
    public class RdfBuilder : IRdfBuilder
    {
        private readonly IOntologyRepository _ontologyRepository;
        private readonly ILibRepository _libRepository;

        public Project Project;
        public IGraph Graph;        
        public Dictionary<string, INode> Roots;
       
        public RdfBuilder(IOntologyRepository ontologyRepository, ILibRepository libRepository)
        {
            _ontologyRepository = ontologyRepository;
            _libRepository = libRepository;
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

        public void BuildProject(Project project)
        {
            Roots = new Dictionary<string, INode>();

            var namespaces = new Dictionary<string, string>
            {
                {"sor", "https://rdf.equinor.com/sor/mimir/"},
                {"eq", "https://rdf.equinor.com/raw/mimir/"}
            };
            
            Project = project;
            Graph = _ontologyRepository.Graph;
            Graph.BaseUri = new Uri(Project.Iri);

            Project.AssertGraph(Graph, _ontologyRepository);
            
            

            BuildNodes();
            BuildEdges();
        }

        private void AddPositionData(Node node, IGraph g = null)
        {
            g ??= Graph;

            var rdfNode = node.Iri.GetOrCreateUriNode(g);

            var data = new Dictionary<INode, decimal>
            {
                {_ontologyRepository.BuildIri("mimir", "hasPosX").GetOrCreateUriNode(g), node.PositionX},
                {_ontologyRepository.BuildIri("mimir", "hasPosY").GetOrCreateUriNode(g), node.PositionY},
                {_ontologyRepository.BuildIri("mimir", "hasBlockPosX").GetOrCreateUriNode(g), node.PositionBlockX},
                {_ontologyRepository.BuildIri("mimir", "hasBlockPosY").GetOrCreateUriNode(g), node.PositionBlockY},
            };

            foreach (var (predicate, value) in data)
            {
                g.Assert(new Triple(rdfNode, predicate, g.CreateLiteralNode($"{value}", new Uri(_ontologyRepository.BuildIri("xsd", "float")))));
            }
        }

        private void BuildAttributes(INode node, IEnumerable<Attribute> attributes)
        {
            foreach (var attribute in attributes)
            {
                attribute.AssertAttribute(Graph, node, _ontologyRepository);
                attribute.AssertAttributeValue(Graph, node, _ontologyRepository, _libRepository);
            }
        }

        private void FindAndAssertDomain(Node node)
        {
            var rdfNode = node.Iri.GetOrCreateUriNode(Graph);
            var predicate = _ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(Graph);
            var domain = Graph.CreateLiteralNode(node.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Attribute attribute)
        {
            var rdfNode = attribute.Iri.GetOrCreateUriNode(Graph);
            var predicate = _ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(Graph);
            var domain = Graph.CreateLiteralNode(attribute.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Project project)
        {
            var rdfNode = project.Iri.GetOrCreateUriNode(Graph);
            var predicate = _ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(Graph);
            var domain = Graph.CreateLiteralNode(project.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Edge edge)
        {
            var rdfNode = edge.Iri.GetOrCreateUriNode(Graph);
            var predicate = _ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(Graph);
            var domain = Graph.CreateLiteralNode(edge.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }
        private void FindAndAssertDomain(Connector connector)
        {
            var rdfNode = connector.Iri.GetOrCreateUriNode(Graph);
            var predicate = _ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(Graph);
            var domain = Graph.CreateLiteralNode(connector.Domain);
            Graph.Assert(new Triple(rdfNode, predicate, domain));
        }

        private void BuildParent(Node node)
        {
            var parent = node.GetParent(Project);
            if (parent is null) return;

            var childNode = node.Iri.GetOrCreateUriNode(Graph);
            var parentNode = parent.Iri.GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(childNode, _ontologyRepository.BuildIri("imf", "hasParent").GetOrCreateUriNode(Graph), parentNode));
        }

        private void BuildNodes()
        {
            var label = Resources.label.GetOrCreateUriNode(Graph);
            var type = Resources.type.GetOrCreateUriNode(Graph);
            var hasAspect = Resources.hasAspect.GetOrCreateUriNode(Graph);
            var comment = Resources.desc.GetOrCreateUriNode(Graph);

            var hasInTerminal = _ontologyRepository.BuildIri("imf", "hasInTerminal").GetOrCreateUriNode(Graph);
            var hasOutTerminal = _ontologyRepository.BuildIri("imf", "hasOutTerminal").GetOrCreateUriNode(Graph);

            var inTerminal = _ontologyRepository.BuildIri("imf", "InTerminal").GetOrCreateUriNode(Graph);
            var outTerminal = _ontologyRepository.BuildIri("imf", "OutTerminal").GetOrCreateUriNode(Graph);


            foreach (var node in Project.Nodes)
            {
                var nodeId = node.Iri.GetOrCreateUriNode(Graph);
                BuildParent(node);

                if (node.Description is not null)
                {
                    Graph.Assert(new Triple(nodeId, comment, Graph.CreateLiteralNode(node.Description)));
                }

                var rds = _ontologyRepository.BuildIri("imf", "rds").GetOrCreateUriNode(Graph);
                var rdsString = Graph.CreateLiteralNode(RdsString(node));
                Graph.Assert(new Triple(nodeId, rds, rdsString));
                
                FindAndAssertDomain(node);
                AddPositionData(node);

                if (node.IsRoot)
                {
                    Graph.Assert(new Triple(nodeId, Resources.isAspectOf.GetOrCreateUriNode(Graph), node.MasterProjectIri.GetOrCreateUriNode(Graph)));
                    
                    Roots.Add(node.Aspect.ToString(), nodeId);
                    
                    Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(Project.Name + " " + node.Aspect)));
                    Graph.Assert(new Triple(nodeId, hasAspect, _ontologyRepository.BuildIri("imf", node.Aspect.ToString()).GetOrCreateUriNode(Graph)));
                    continue;
                }

                Graph.Assert(new Triple(nodeId, type, Resources.FSB.GetOrCreateUriNode(Graph)));
                Graph.Assert(new Triple(nodeId, label, Graph.CreateLiteralNode(node.Label)));

                FindAndAssertPurpose(node);

                if (node.Attributes.Count > 0)
                {
                    BuildAttributes(nodeId, node.Attributes);
                }

                if (node.Symbol is not null)
                {
                    Graph.Assert(new Triple(nodeId, _ontologyRepository.BuildIri("mimir", "symbol").GetOrCreateUriNode(Graph), Graph.CreateLiteralNode(node.Symbol)));
                }


                foreach (var connector in node.Connectors)
                {
                    FindAndAssertDomain(connector);
                    switch (connector)
                    {
                        case Terminal terminal:
                            var nodeTerminal = terminal.Iri.GetOrCreateUriNode(Graph);
                            GetAndAssertTransmitter(nodeTerminal, terminal);

                            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            Graph.Assert(new Triple(nodeTerminal, type, Resources.FSBTerminal.GetOrCreateUriNode(Graph)));
                            Graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            Graph.Assert(new Triple(nodeTerminal, _ontologyRepository.BuildIri("mimir", "color").GetOrCreateUriNode(Graph), Graph.CreateLiteralNode(terminal.Color)));
                            Graph.Assert(new Triple(nodeTerminal, _ontologyRepository.BuildIri("mimir", "visible").GetOrCreateUriNode(Graph), Graph.CreateLiteralNode(terminal.Visible.ToString())));


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

                var nodeAspect = _ontologyRepository.BuildIri("imf", node.Aspect.ToString()).GetOrCreateUriNode(Graph);
                Graph.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (string.IsNullOrEmpty(node.Rds)) continue;

                GetAndAssertRds(nodeId, node);
            }
        }

        private void GetAndAssertRds(INode rdfNode, Node node)
        {
            var strippedRds = node.StrippedRds();
            var rdsIri = @$"http://example.com/rds/og{strippedRds.Length}#{node.Aspect}{strippedRds}";
            var nodeRds = rdsIri.GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(rdfNode, Resources.type.GetOrCreateUriNode(Graph), nodeRds));
        }

        private void GetAndAssertTransmitter(INode nodeTerminal, Terminal terminal)
        {
            var type = Resources.type.GetOrCreateUriNode(Graph);
            var subclass = Resources.subClassOf.GetOrCreateUriNode(Graph);
            var transmitterIri = _ontologyRepository.BuildIri("eq", $"Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}");
            var transmitter = transmitterIri.GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(transmitter, subclass, _ontologyRepository.BuildIri("mimir", "Transmitter").GetOrCreateUriNode(Graph)));
            Graph.Assert(new Triple(nodeTerminal, type, transmitter));
        }

        private void FindAndAssertPurpose(Node node)
        {
            if (node.Purpose is null) return;

            var rdfNode = node.Iri.GetOrCreateUriNode(Graph);
            var predicate = _ontologyRepository.BuildIri("mimir", "hasPurpose").GetOrCreateUriNode(Graph);
            var purpose = _ontologyRepository.BuildIri("mimir", node.Purpose.Id, "ID").GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(rdfNode, predicate, purpose));
        }

        private void BuildInterface(Edge edge)
        {
            var interfaceType = Resources.Interface.GetOrCreateUriNode(Graph);
            var type = Resources.type.GetOrCreateUriNode(Graph);
            var hasParent = Resources.hasParent.GetOrCreateUriNode(Graph);
            var label = Resources.label.GetOrCreateUriNode(Graph);
            var hasAspect = Resources.hasAspect.GetOrCreateUriNode(Graph);

            var interfaceObject = edge.Interface;
            var aspect = edge.FromNode.Aspect;

            var interfaceNode = MimirIdToIri(_namespaces["sor"], interfaceObject.Id).GetOrCreateUriNode(Graph);
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

            var aspectNode = ($"imf:{aspect}").GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(interfaceNode, hasAspect, aspectNode));

            Graph.Assert(new Triple(interfaceNode, label, Graph.CreateLiteralNode(interfaceObject.Name)));

            BuildStreamTerminals(interfaceObject, edge);
        }

        private void BuildTransport(Edge edge)
        {
            var transportType = Resources.Transport.GetOrCreateUriNode(Graph);
            var type = Resources.type.GetOrCreateUriNode(Graph);
            var hasParent = Resources.hasParent.GetOrCreateUriNode(Graph);
            var label = Resources.label.GetOrCreateUriNode(Graph);
            var hasAspect = Resources.hasAspect.GetOrCreateUriNode(Graph);

            var transport = edge.Transport;
            var aspect = edge.FromNode.Aspect;
            
            var transportNode = MimirIdToIri(_namespaces["sor"], transport.Id).GetOrCreateUriNode(Graph);
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

            var aspectNode = ($"imf:{aspect}").GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(transportNode, hasAspect, aspectNode));
        }

        private void BuildStreamTerminals(Transport transportObject, Edge edge)
        {
            var rdfNode = MimirIdToIri(_namespaces["sor"], transportObject.Id).GetOrCreateUriNode(Graph);

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
            var rdfNode = MimirIdToIri(_namespaces["sor"], interfaceObject.Id).GetOrCreateUriNode(Graph);

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
            var type = Resources.type.GetOrCreateUriNode(Graph);
            var streamTerminalType = Resources.StreamTerminal.GetOrCreateUriNode(Graph);
            var label = Resources.label.GetOrCreateUriNode(Graph);
            var connectedTo = Resources.connectedTo.GetOrCreateUriNode(Graph);

            var terminalNode = terminal.Iri.GetOrCreateUriNode(Graph);
            GetAndAssertTransmitter(terminalNode, (Terminal)terminal);

            INode hasTerminal;
            INode terminalType;
            switch (connectorType)
            {
                case ConnectorType.Input:
                    hasTerminal = Resources.hasInputTerminal.GetOrCreateUriNode(Graph);
                    terminalType = Resources.InputTerminal.GetOrCreateUriNode(Graph);
                    break;
                case ConnectorType.Output:
                    hasTerminal = Resources.hasOutputTerminal.GetOrCreateUriNode(Graph);
                    terminalType = Resources.OutputTerminal.GetOrCreateUriNode(Graph);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(connectorType), connectorType, null);
            }

            FindAndAssertDomain(terminal);

            var transportTerminal = terminal.Iri.GetOrCreateUriNode(Graph);
            Graph.Assert(new Triple(transportTerminal, type, terminalType));
            Graph.Assert(new Triple(transportTerminal, type, streamTerminalType));

            Graph.Assert(new Triple(transportNode, hasTerminal, transportTerminal));

            Graph.Assert(new Triple(transportTerminal, connectedTo, connection.Iri.GetOrCreateUriNode(Graph)));

            var terminalLabel = Graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
            Graph.Assert(new Triple(transportTerminal, label, terminalLabel));
        }


        private void BuildEdges()
        {
            var edges = Project.Edges;

            foreach (var edge in edges)
            {
                var fromNode = edge.FromNode.Iri.GetOrCreateUriNode(Graph);
                var toNode = edge.ToNode.Iri.GetOrCreateUriNode(Graph);

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
                    var relationFromNode = _ontologyRepository.BuildIri("imf", relationString).GetOrCreateUriNode(Graph);
                    Graph.Assert(new Triple(fromNode, relationFromNode, toNode));
                }

                if (edge.ToConnector is Relation { RelationType: not RelationType.PartOf } toRelation)
                {
                    var relationString = LowerCaseFirstCharacter(toRelation.RelationType.ToString());
                    var relationToNode = _ontologyRepository.BuildIri("imf", relationString).GetOrCreateUriNode(Graph);
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

        //[Obsolete("You should use your IRI directly")]
        //private static string MimirIdToIri(string prefix, string id, string midfix = "ID")
        //{
        //    id = id.Replace("equinor.com_", "");
        //    return $"{prefix}{midfix}{id}";
        //}

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

