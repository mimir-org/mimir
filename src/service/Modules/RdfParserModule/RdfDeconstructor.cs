using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using RdfParserModule.Properties;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using VDS.RDF.Query.Inference;
using INode = VDS.RDF.INode;

namespace RdfParserModule
{
    public class RdfDeconstructor
    {
        public IGraph RdfGraph { get; set; }
        public ParserGraph Graph { get; set; }
        public TripleStore Store { get; set; }
        public ProjectAm Project { get; set; }


        public List<ParserNode> ParserNodes;
        public List<ParserEdge> ParserEdges;

        private readonly IMapper _mapper;
        private string _domain;

        public RdfDeconstructor(IMapper mapper)
        {
            _mapper = mapper;
            _domain = "equinor.com";
            ParserNodes = new List<ParserNode>();
            ParserEdges = new List<ParserEdge>();
        }

        public void LoadGraph(string valueAsString)
        {

            RdfGraph = new OntologyGraph();
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/ontologies.owl";
            RdfGraph.LoadFromFile(filePath, new TurtleParser());

            IGraph graph = new Graph();
            graph.LoadFromString(valueAsString);

            RdfGraph.Merge(graph);

            Store = new TripleStore();
            Store.Add(RdfGraph);

            Store.AddInferenceEngine(new RdfsReasoner());

            Project = new ProjectAm();
        }

        public void MakeProject(string valueAsString)
        {
            LoadGraph(valueAsString);

            Graph = new ParserGraph
            {
                IsSubProject = true,
                Nodes = new List<ParserNode>(),
                Edges = new List<ParserEdge>()
            };
            GetProjectInformation();

            ParserNodes.AddRange(GetRootNodes());
            ParserNodes.AddRange(GetAllFunctionObjectsWithTerminals());
            ParserNodes.AddRange(GetAllLocationObjects());

            AddAspectRelation("Part Of");
            AddAspectRelation("Has Location");

            ParserEdges.AddRange(GetTransports());

            ResolvePartOfRelation(ParserNodes);
            ResolvePositions(ParserNodes);

            Graph.Nodes = ParserNodes;
            Graph.Edges = ParserEdges;

            Project = _mapper.Map<ProjectAm>(Graph);
        }

        private ParserNode GetNode(string id)
        {
            foreach (var node in ParserNodes.Where(node => node.Id == id))
            {
                return node;
            }

            throw new Exception($"Found no node with id {id}");
        }

        private void ResolvePartOfRelation(List<ParserNode> nodes)
        {
            foreach (var node in nodes)
            {
                if (node.parentId is null) continue;

                // The parent should always be present if there is a parentId
                var parent = GetNode(node.parentId);

                var toConnector = new ParserRelation
                {
                    Id = $"{_domain}_{Guid.NewGuid()}",
                    Name = "Part of Relationship",
                    Relation = RelationType.PartOf,
                    Type = ConnectorType.Input
                };
                node.Terminals.Add(toConnector);

                var fromConnector = new ParserRelation
                {
                    Id = $"{_domain}_{Guid.NewGuid()}",
                    Name = "Part of Relationship",
                    Relation = RelationType.PartOf,
                    Type = ConnectorType.Output
                };
                parent.Terminals.Add(fromConnector);


                var edge = new ParserEdge
                {
                    FromConnectorId = fromConnector.Id,
                    ToConnectorId = toConnector.Id,
                    FromNodeId = parent.Id,
                    ToNodeId = node.Id,
                    MasterProjectIri = Graph.Iri,
                    InputTerminal = fromConnector,
                    OutputTerminal = toConnector
                };

                ParserEdges.Add(edge);
            }
        }


        public void GetProjectInformation()
        {
            var integratedObject = RdfGraph.CreateUriNode("imf:IntegratedObject");
            var type = RdfGraph.CreateUriNode(Resources.type);
            var projectId = Store.GetTriplesWithPredicateObject(type, integratedObject).Select(t => t.Subject).SingleOrDefault();
            
            
            var label = GetLabel(projectId.ToString());
            var version = GetObjects(projectId.ToString(), "owl:versionInfo").First();

            Graph.Id = projectId.ToString();
            Graph.Iri = Graph.Id;
            Graph.Label = label;
            Graph.Name = label;
            Graph.Version = version.ToString();
        }

        public INode GetParent(string nodeId)
        {
            var node = GetOrCreateUriNode(nodeId);
            var hasParent = RdfGraph.CreateUriNode(Resources.hasParent);

            // There should always only be one parent, so we can just get the first element via Single
            var parent = Store.GetTriplesWithSubjectPredicate(node, hasParent).Single().Object;

            return parent;
        }

        public List<INode> GetChildren(string nodeId)
        {
            var node = GetOrCreateUriNode(nodeId);
            var hasChild = RdfGraph.CreateUriNode(Resources.hasChild);

            var children = Store.GetTriplesWithSubjectPredicate(node, hasChild).Select(t => t.Subject).ToList();
            return children;
        }

        public List<ParserNode> GetRootNodes()
        {
            var p = RdfGraph.CreateUriNode(Resources.isAspectOf);
            var list = Store.GetTriplesWithPredicate(p).Select(t => t.Subject).ToList();

            var roots = list.Select(node => new ParserNode
            {
                IsRoot = true,
                Id = node.ToString(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectIri = Graph.Iri,
                Terminals = new List<ParserConnector>()

            }).ToList();

            foreach (var node in roots)
            {
                var label = GetLabel(node.Id);
                
                if (label.ToLower().Contains("function"))
                {
                    node.Label = "Function";
                    node.Name = "Function";
                    node.Aspect = Aspect.Function;
                }
                else if (label.ToLower().Contains("location"))
                {
                    node.Label = "Location";
                    node.Name = "Location";
                    node.Aspect = Aspect.Location;
                }
                else if (label.ToLower().Contains("product"))
                {
                    node.Label = "Product";
                    node.Name = "Product";
                    node.Aspect = Aspect.Product;
                }
            }

            return roots;
        }

        public List<INode> GetObjects(string subject, string predicate)
        {
            var subjectNode = GetOrCreateUriNode(subject);
            var predicateNode = GetOrCreateUriNode(predicate);
            var resultList = Store.GetTriplesWithSubjectPredicate(subjectNode, predicateNode).Select(triple => triple.Object).ToList();

            if (resultList.Count < 1)
            {
                return null;
            }

            return resultList;
        }

        public List<INode> GetObjects(string subject, string[] predicates)
        {
            var resultList = new List<INode>();
            foreach (var predicate in predicates)
            {
                resultList.AddRange(GetObjects(subject, predicate));
            }
            return resultList;
        }

        private INode GetOrCreateUriNode(string iri)
        {
            var isHttpRegex = new Regex(@"http(s)*");

            if (!isHttpRegex.IsMatch(iri)) return RdfGraph.GetUriNode(iri) ?? RdfGraph.CreateUriNode(iri);

            var uri = new Uri(iri);
            return RdfGraph.GetUriNode(uri) ?? RdfGraph.CreateUriNode(uri);


            //// If true then 'iri' should not be a q-name, so we set it as a URI so it isn't misinterperated as 
            //if (Uri.IsWellFormedUriString(iri, UriKind.Absolute))
            //{
            //    var uri = new Uri(iri);
            //    return RdfGraph.GetUriNode(uri) ?? RdfGraph.CreateUriNode(uri);
            //}

            //// Check to see if 'iri' is NOT a wellformed URI, because then it should be a q-name
            //return RdfGraph.GetUriNode(iri) ?? RdfGraph.CreateUriNode(iri);
        }

        public List<INode> GetSubjects(string predicate, string obj)
        {
            var objectNode = GetOrCreateUriNode(obj);
            var predicateNode = GetOrCreateUriNode(predicate);

            var list = Store.GetTriplesWithPredicateObject(predicateNode, objectNode).Select(triple => triple.Subject).ToList();
            return list;
        }

        public List<INode> GetSubjects(string[] predicates, string obj)
        {
            var resultList = new List<INode>();
            foreach (var predicate in predicates)
            {
                resultList.AddRange(GetSubjects(predicate, obj));
            }

            return resultList;
        }

        public void AddAspectRelation(string relation)
        {
            IUriNode predicate;
            switch (relation)
            {
                case "Has Location":
                    predicate = RdfGraph.CreateUriNode(Resources.hasLocation);
                    break;
                case "Part Of":
                    predicate = RdfGraph.CreateUriNode(Resources.hasParent);
                    break;
                case "Fulfilled By":
                    predicate = RdfGraph.CreateUriNode(Resources.fulfilledBy);
                    break;
                default:
                    return;
            }

            var obj = Store.GetTriplesWithPredicate(predicate);
            foreach (var triple in obj)
            {
                try
                {
                    var s = triple.Subject;
                    var sNode = Graph.GetNode(s.ToString());

                    var o = triple.Object;
                    var oNode = Graph.GetNode(o.ToString());

                    switch (relation)
                    {
                        case "Has Location":
                            sNode.HasLocation = oNode;
                            break;
                        case "Part Of":
                            sNode.parentId = oNode.Id;
                            break;
                        case "Fulfilled By":
                            sNode.FulfilledBy = oNode;
                            break;
                        default:
                            continue;
                    }
                }
                catch (Exception)
                {
                    //TODO Check why we end up here.
                    //TODO Something about s/o being in the Store, but not in the ParserGraph
                    //Console.WriteLine(e);
                }

            }
        }

        public List<ParserConnector> GetTerminalsOnNode(ParserNode node)
        {
            var nodeId = node.Id;

            var connectors = new List<ParserConnector>();

            var inputTerminalNodes = GetObjects(nodeId, Resources.hasInputTerminal);
            var outputTerminalNodes = GetObjects(nodeId, Resources.hasOutputTerminal);

            if (inputTerminalNodes is not null)
            {
                var inputTerminals = GetObjects(nodeId, Resources.hasInputTerminal).Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    Type = ConnectorType.Input,
                    NodeId = nodeId
                }).ToList();

                connectors.AddRange(inputTerminals);
            }
            if (outputTerminalNodes is not null)
            {
                var outputTerminals = GetObjects(nodeId, Resources.hasOutputTerminal).Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    Type = ConnectorType.Output,
                    NodeId = nodeId
                }).ToList();

                connectors.AddRange(outputTerminals);
            }

            if (connectors.Count is 0)
            {
                return new List<ParserConnector>();
            }

            foreach (var connector in connectors)
            {
                
                var label = GetLabel(connector.Id);

                if (label != null)
                {
                    connector.Label = label;
                    connector.Name = connector.Label.Replace(" Output", "").Replace(" Input", "");

                    if (connector is ParserTerminal terminal)
                    {
                        var (termCatId, termTypeId) = GetTerminalCategoryIdAndTerminalTypeId(terminal);

                        if (termCatId is null || termTypeId is null) continue;

                        terminal.TerminalCategoryId = termCatId;
                        terminal.TerminalTypeId = termTypeId;
                    }
                }

                var connection = GetObjects(connector.Id, Resources.connectedTo);

                if (connection is null) continue;
                switch (connector.Type)
                {
                    case ConnectorType.Input:
                        connector.FromConnectorId = connection.First().ToString();
                        break;
                    case ConnectorType.Output:
                        connector.ToConnectorId = connection.First().ToString();
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            return connectors;
        }

        private (string termCatId, string termTypeId) GetTerminalCategoryIdAndTerminalTypeId(ParserTerminal terminal)
        {
            var terminalTypes = GetObjects(terminal.Id, Resources.type);

            if (terminalTypes is null) return (null, null);

            try
            {
                var transmitter = terminalTypes.First(tNode => tNode.ToString().Contains("Transmitter-"));
                var terminalCategoryId = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();
                var terminalTypeName = transmitter.ToString().Split("Transmitter-").Last().Split("-").Last()
                    .Replace("%20", " ");


                return terminalTypeName.Trim().CreateCategoryIdAndTerminalTypeId(terminalCategoryId);
            }
            catch
            {
                return (null, null);
            }

        }


        public INode GetMasterProject(string nodeId)
        {
            var sub = RdfGraph.CreateUriNode(new Uri(nodeId));
            var pred = RdfGraph.CreateUriNode(Resources.hasMasterProject);
            var node = Store.GetTriplesWithSubjectPredicate(sub, pred).Select(t => t.Object).First();

            return node;
        }

        private ParserTerminal GetTransportInTerminal(string transportIri)
        {
            var inTerminals = GetObjects(transportIri, Resources.hasInputTerminal);

            if (inTerminals.Count != 1)
            {
                throw new Exception("A transport should only ever have one, 1, input terminal");
            }

            var inputTerminal = inTerminals.First();

            var inTerminal = new ParserTerminal
            {
                Id = inputTerminal.ToString(),
                Iri = inputTerminal.ToString(),
                Type = ConnectorType.Input
            };

            var (termCatId, termTypeId) = GetTerminalCategoryIdAndTerminalTypeId(inTerminal);

            if (termCatId is not null || termTypeId is not null)
            {
                inTerminal.TerminalCategoryId = termCatId;
                inTerminal.TerminalTypeId = termTypeId;
            }


            var fromConnectors = GetObjects(inTerminal.Iri, Resources.connectedTo);
            if (fromConnectors is null || fromConnectors.Count != 1)
            {
                throw new Exception($"A terminal can only be connected to one, 1, other terminal | {inTerminal}");
            }

            var fromConnector = fromConnectors.First().ToString();
            inTerminal.FromConnectorIri = fromConnector;
            inTerminal.FromConnectorId = fromConnector;


            var fromNodes = GetSubjects(Resources.hasOutputTerminal, inTerminal.FromConnectorIri);
            if (fromNodes is null || fromNodes.Count != 1)
            {
                throw new Exception($"A connector can only belong to one, 1, aspect object | {inTerminal}");
            }

            var fromNode = fromNodes.First().ToString();
            inTerminal.NodeId = fromNode;

            var inputTerminalLabel = GetLabel(inTerminal.Iri);
            inTerminal.Name = inputTerminalLabel;
            

            return inTerminal;
        }

        private string GetLabel(string iri)
        {
            var node = RdfGraph.GetUriNode(new Uri(iri));
            var labelPredicate = RdfGraph.CreateUriNode(Resources.label);

            var labels = Store.GetTriplesWithSubjectPredicate(node, labelPredicate).Select(t => t.Object).ToList();

            if (labels.Count < 1)
            {
                throw new Exception("There should always be at least one, 1, label");
            }

            var label = labels.First();
            if (label is ILiteralNode l)
            {
                return l.Value;
            }

            throw new Exception("A label has to be a string");
        }

        private void ResolvePositions(List<ParserNode> nodes)
        {
            foreach (var node in nodes)
            {
                var rdfNode = RdfGraph.GetUriNode(new Uri(node.Iri));
                (node.PositionX, node.PositionY, node.PositionBlockX, node.PositionBlockY) = GetPosition(rdfNode);
            }
        }

        private (decimal, decimal, decimal, decimal) GetPosition(INode node)
        {
            var posX = GetPositionX(node);
            var posY = GetPositionY(node);
            var posBlockX = GetBlockPositionX(node);
            var posBlockY = GetBlockPositionY(node);

            return (posX, posY, posBlockX, posBlockY);
        }

        private decimal GetPositionX(INode node)
        {
            return GenericGetPosition(node, "X");
        }
        private decimal GetPositionY(INode node)
        {
            return GenericGetPosition(node, "Y");
        }
        private decimal GetBlockPositionX(INode node)
        {
            return GenericGetPosition(node, "X", true);
        }
        private decimal GetBlockPositionY(INode node)
        {
            return GenericGetPosition(node, "Y", true);
        }

        private decimal GenericGetPosition(INode node, string axis, bool block = false)
        {
            axis = axis.ToUpper();
            
            var predicate = GetOrCreateUriNode(block ? $"https://example.com/mimir#hasBlockPos{axis}" : $"https://example.com/mimir#hasPos{axis}");

            var pos = Store.GetTriplesWithSubjectPredicate(node, predicate).Single().Object;

            var errorPos = block ? $"Block Position {axis}" : $"Position {axis}";

            if (pos is not ILiteralNode literal) throw new Exception($"Could not find any {errorPos} on node {node}");
            try
            {
                return decimal.Parse(literal.Value);
            }
            catch (Exception e)
            {
                throw new Exception($"Could not parse {errorPos} to decimal | {e}");
            }
        }

        private Aspect GetAspect(string iri)
        {
            var node = RdfGraph.GetUriNode(new Uri(iri));
            var hasAspectPredicate = RdfGraph.CreateUriNode(Resources.hasAspect);

            var aspects = Store.GetTriplesWithSubjectPredicate(node, hasAspectPredicate).Select(t => t.Object).ToList();

            switch (aspects.Count)
            {
                case < 1:
                    throw new Exception("There should always be at least one, 1, aspect");
            }

            var aspectNode = aspects.First();

            if (aspectNode is not ILiteralNode literal) return Aspect.NotSet;
            try
            {
                return Enum.Parse<Aspect>(literal.Value);
            }
            catch
            {
                return Aspect.NotSet;
            }
        }

        private ParserTerminal GetTransportOutTerminal(string transportIri)
        {
            var outTerminals = GetObjects(transportIri, Resources.hasOutputTerminal);

            if (outTerminals.Count != 1)
            {
                throw new Exception("A transport should only ever have one, 1, output terminal");
            }

            var outputTerminal = outTerminals.First();

            var outTerminal = new ParserTerminal
            {
                Id = outputTerminal.ToString(),
                Iri = outputTerminal.ToString(),
                Type = ConnectorType.Output
            };

            var (termCatId, termTypeId) = GetTerminalCategoryIdAndTerminalTypeId(outTerminal);

            if (termCatId is not null || termTypeId is not null)
            {
                outTerminal.TerminalCategoryId = termCatId;
                outTerminal.TerminalTypeId = termTypeId;
            }

            var toConnectors = GetObjects(outTerminal.Iri, Resources.connectedTo);
            if (toConnectors.Count != 1)
            {
                throw new Exception("A terminal can only be connected to one, 1, other terminal");
            }

            var toConnector = toConnectors.First().ToString();
            outTerminal.ToConnectorIri= toConnector;
            outTerminal.ToConnectorId = toConnector;

            var toNodes = GetSubjects(Resources.hasInputTerminal, outTerminal.ToConnectorIri);
            if (toNodes.Count != 1)
            {
                throw new Exception("A connector can only belong to one, 1, aspect object");
            }

            var toNode = toNodes.First().ToString();
            outTerminal.NodeId = toNode;

            var outputTerminalLabel = GetLabel(outTerminal.Iri);
            outTerminal.Name = outputTerminalLabel;

            return outTerminal;
        }

        public List<ParserEdge> GetTransports()
        {
            var transports = GetSubjects(Resources.type, Resources.Transport);

            var transportNodes = transports.Select(transport => new ParserTransport
            {
                Id = transport.ToString(),
                Iri = transport.ToString(),
                SemanticReference = transport.ToString(),
                IsTransport = true,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                Terminals = new List<ParserConnector>(),
                MasterProjectIri = Graph.Iri
            }).ToList();


            var edges = new List<ParserEdge>();
            foreach (var transport in transportNodes)
            {
                var inTerminal = GetTransportInTerminal(transport.Iri);
                var outTerminal = GetTransportOutTerminal(transport.Iri);
                
                transport.Name = GetLabel(transport.Iri);
                
                transport.Aspect = GetAspect(transport.Iri);

                transport.InputTerminal = inTerminal;
                transport.InputTerminalId = inTerminal.Iri;

                transport.OutputTerminal = outTerminal;
                transport.OutputTerminalId = outTerminal.Iri;

                var edge = new ParserEdge
                {
                    FromConnectorId = inTerminal.FromConnectorId,
                    ToConnectorId = outTerminal.ToConnectorId,
                    OutputTerminal = outTerminal,
                    OutputTerminalId = outTerminal.Iri,
                    InputTerminal = inTerminal,
                    InputTerminalId = inTerminal.Iri,
                    MasterProjectIri = Graph.Iri,
                    Transport = transport,
                    ToNodeId = outTerminal.NodeId,
                    FromNodeId = inTerminal.NodeId
                };

                edges.Add(edge);
            }

            return edges;
        }


        public List<ParserNode> GetAllLocationObjects()
        {
            var pred = RdfGraph.CreateUriNode(Resources.hasLocation);

            var subs = Store.GetTriplesWithPredicate(pred).Select(t => t.Object).ToList();

            var nodes = subs.Select(node => new ParserNode
            {
                Prefix = "",
                Aspect = Aspect.Location,
                Id = node.ToString(),
                Name = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectIri = Graph.Iri

            }).ToList();

            foreach (var node in nodes)
            {
                var label = GetLabel(node.Id);
                node.Label = label;
                node.Name = label;
            }

            return nodes;
        }

        public List<INode> GetFunctionalSystemBlocks()
        {
            var type = GetOrCreateUriNode(Resources.type);
            var fsb = GetOrCreateUriNode(Resources.FSB);

            return Store.GetTriplesWithPredicateObject(type, fsb).Select(t => t.Subject).ToList();
        }

        public List<ParserNode> GetAllFunctionObjectsWithTerminals()
        {
            var subs = GetFunctionalSystemBlocks();

            //var pred = RdfGraph.CreateUriNode(Resources.hasAspect);
            //var obj = RdfGraph.CreateUriNode(Resources.Function);
            //var subs = Store.GetTriplesWithPredicateObject(pred, obj).Select(t => t.Subject).ToList();


            var nodes = subs.Select(node => new ParserNode
            {
                Prefix = "",
                Aspect = Aspect.Function,
                Id = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                Terminals = new List<ParserConnector>(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectIri = Graph.Iri

            }).ToList();
            
            foreach (var node in nodes)
            {
                var label = GetLabel(node.Id);
                node.Label = label;
                node.Name = label;

                var parent = GetParent(node.Id);
                var parentId = parent.ToString();

                node.parentId = parentId;
            }

            foreach (var node in nodes)
            {
                node.Terminals = GetTerminalsOnNode(node);
            }

            return nodes;
        }
    }
    
}
