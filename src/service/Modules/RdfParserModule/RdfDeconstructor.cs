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
using VDS.RDF.Query;
using INode = VDS.RDF.INode;

namespace RdfParserModule
{
    public class RdfDeconstructor
    {
        public IGraph RdfGraph { get; set; }
        public ParserGraph Graph { get; set; }
        public TripleStore Store { get; set; }
        public ProjectAm Project { get; set; }

        private readonly IMapper _mapper;

        public RdfDeconstructor(IMapper mapper)
        {
            _mapper = mapper;
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

            var parserNodes = new List<ParserNode>();
            var parserEdges = new List<ParserEdge>();
            
            parserNodes.AddRange(GetAllFunctionObjectsWithTerminals());
            parserNodes.AddRange(GetAllLocationObjects());
            parserNodes.AddRange(GetRootNodes());

            AddAspectRelation("Part Of");
            AddAspectRelation("Has Location");

            parserEdges.AddRange(GetTransports());

            Graph.Nodes = parserNodes;
            Graph.Edges = parserEdges;

            Project = _mapper.Map<ProjectAm>(Graph);
        }

        public void GetProjectInformation()
        {
            var integratedObject = RdfGraph.CreateUriNode("imf:IntegratedObject");
            var projectId = Store.GetTriplesWithObject(integratedObject).Select(t => t.Subject).ToList().First();
            
            var label = GetLabel(projectId.ToString());
            var version = GetObjects(projectId.ToString(), "owl:versionInfo").First();

            Graph.Id = "import.rdf_" + Guid.NewGuid(); //projectId.ToString() + Guid.NewGuid();
            Graph.Iri = Graph.Id;
            Graph.Label = label;
            Graph.Name = label;
            Graph.Version = version.ToString();
        }

        public INode GetParent(string nodeId)
        {
            // There should always only be one parent, so we can just get the First element
            var parent = Store.GetTriplesWithSubjectPredicate(RdfGraph.CreateUriNode(new Uri(nodeId)), RdfGraph.CreateUriNode("imf:hasParent")).Select(t=>t.Subject).ToList().First();

            return parent;
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
                MasterProjectId = Graph.Id

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
            return Store.GetTriplesWithSubjectPredicate(subjectNode, predicateNode).Select(triple => triple.Object).ToList();
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
            // If the 'iri' is a qname we want to make sure it isn't passed as if it's a 'proper' Uri
            if (!Uri.IsWellFormedUriString(iri, UriKind.RelativeOrAbsolute))
            {
                return RdfGraph.GetUriNode(iri) ?? RdfGraph.CreateUriNode(iri);
            }

            // But if it is a URI, we want to make sure it doesn't get mistaken for a qname
            return RdfGraph.GetUriNode(new Uri(iri)) ?? RdfGraph.CreateUriNode(new Uri(iri));
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
                            sNode.HasParent = oNode;
                            break;
                        case "Fulfilled By":
                            sNode.FulfilledBy = oNode;
                            break;
                        default:
                            continue;
                    }
                }
                catch (Exception e)
                {
                    //TODO Check why we end up here.
                    //TODO Something about s/o being in the Store, but not in the ParserGraph
                    //Console.WriteLine(e);
                }

            }
        }

        public List<ParserTerminal> NewGetTerminalsOfNode(ParserNode node)
        {
            var nodeId = node.Id;

            var terminals = new List<ParserTerminal>();

            var inputTerminals = GetObjects(nodeId, Resources.hasInputTerminal).Select(obj => new ParserTerminal
            {
                Id = obj.ToString(),
                Type = ConnectorType.Input,
                NodeId = nodeId
            }).ToList();

            var outputTerminals = GetObjects(nodeId, Resources.hasOutputTerminal).Select(obj => new ParserTerminal
            {
                Id = obj.ToString(),
                Type = ConnectorType.Output,
                NodeId = nodeId
            }).ToList();

            terminals.AddRange(inputTerminals);
            terminals.AddRange(outputTerminals);

            foreach (var terminal in terminals)
            {
                
                var label = GetLabel(terminal.Id);

                if (label != null)
                {
                    terminal.Label = label;
                    terminal.Name = terminal.Label.Replace(" Output", "").Replace(" Input", "");


                    var terminalTypes = GetObjects(terminal.Id, "rdf:type");
                    if (terminalTypes.Count == 0)
                    {
                        var transmitter = terminalTypes.First(node => node.ToString().Contains("Transmitter-"));
                        var categoryName = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();

                        var (termCatId, termTypeId) = terminal.Name.CreateCategoryIdAndTerminalTypeId(categoryName);
                        terminal.TerminalCategoryId = termCatId;
                        terminal.TerminalTypeId = termTypeId;
                    }
                }


                var connection = GetObjects(terminal.Id, Resources.connectedTo);

                if (connection.Count is 0) continue;
                switch (terminal.Type)
                {
                    case ConnectorType.Input:
                        terminal.FromConnectorId = connection.First().ToString();
                        break;
                    case ConnectorType.Output:
                        terminal.ToConnectorId = connection.First().ToString();
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            return terminals;
        }


        public List<ParserTerminal> GetTerminalsOnNode(ParserNode node)
        {
            var nodeId = node.Id;

            var inTerms = GetObjects(nodeId, "imf:hasInTerminal").Select(obj => new ParserTerminal
            {
                Id = obj.ToString(),
                Type = ConnectorType.Input,
                SemanticReference = obj.ToString(),
                NodeId = nodeId

            }).ToList();


            // Den som INPUT er connectedTo er jo FromConnectorId
            // Og den som OUTPUT er connectedTo er ToConnectorId

            var outTerms = GetObjects(nodeId, "imf:hasOutTerminal").Select(obj => new ParserTerminal
            {
                Id = obj.ToString(),
                Type = ConnectorType.Output,
                SemanticReference = obj.ToString(),
                NodeId = nodeId

            }).ToList();

            foreach (var o in outTerms)
            {
                var connection = GetObjects(o.Id, "imf:connectedTo");
                if (connection != null)
                {
                    o.ToConnectorId = connection.First().ToString();
                }

                try
                {
                    var transmitter = GetObjects(o.Id, "rdf:type")
                        .Where(node => node.ToString().Contains("Transmitter")).First();
                    var categoryName = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();

                    var (termcatId, termTypeId) = o.Name.CreateCategoryIdAndTerminalTypeId(categoryName);
                    o.TerminalCategoryId = termcatId;
                    o.TerminalTypeId = termTypeId;
                }
                catch
                {
                }
                
                var label = GetLabel(o.Id);

                o.Label = label;
                o.Name = o.Label.Replace(" Output", "").Replace(" Input", "");
            }

            foreach (var o in inTerms)
            {
                var connection = GetObjects(o.Id, "imf:connectedTo");
                if (connection != null)
                {
                    o.FromConnectorId = connection.First().ToString();
                }

                var label = GetLabel(o.Id);
                o.Label = label;
                o.Name = o.Label.Replace(" Output", "").Replace(" Input", "");
            }
            outTerms.AddRange(inTerms);
            
            return outTerms;
 
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

            var fromConnectors = GetObjects(inTerminal.Iri, Resources.connectedTo);
            if (fromConnectors.Count != 1)
            {
                throw new Exception("A terminal can only be connected to one, 1, other terminal");
            }

            var fromConnector = fromConnectors.First().ToString();
            inTerminal.FromConnectorIri = fromConnector;
            inTerminal.FromConnectorId = fromConnector;


            var fromNodes = GetSubjects(Resources.hasOutputTerminal, inTerminal.FromConnectorIri);
            if (fromNodes is null || fromNodes.Count != 1)
            {
                throw new Exception("A connector can only belong to one, 1, aspect object");
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
            var pred = new string[] { "rdf:type" };
            var transports = GetSubjects(pred, Resources.Transport);

            var transportNodes = transports.Select(transport => new ParserTransport
            {
                Id = transport.ToString(),
                Iri = transport.ToString(),
                SemanticReference = transport.ToString(),
                IsTransport = true,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                Terminals = new List<ParserTerminal>(),
                MasterProjectId = Graph.Id
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
                    MasterProjectId = Graph.Id,
                    Transport = transport,
                    ToNodeId = outTerminal.NodeId,
                    FromNodeId = inTerminal.NodeId
                };

                edges.Add(edge);
            }

            return edges;
        }

        [Obsolete]
        public List<ParserEdge> OldGetTransports()
        {
            var pred = new string[] { "rdf:type" };
            var transports = GetSubjects(pred, "imf:Transport");

            var nodes = transports.Select(node => new ParserTransport
            {
                Id = node.ToString(),
                Iri = node.ToString(),
                SemanticReference = node.ToString(),
                IsTransport = true,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                Terminals = new List<ParserTerminal>(),
                MasterProjectId = Graph.Id
            }).ToList();

            


            var edges = new List<ParserEdge>();
            
            foreach (var node in nodes)
            {
                var label = GetLabel(node.Iri);

                node.Label = label;
                node.Name = label;
                node.Aspect = GetAspect(node.Iri);

                var terms = GetTerminalsOnNode(node);



                var edge = new ParserEdge()
                {
                    FromNodeId = node.Iri,
                    MasterProjectId = Graph.Id,
                    Transport = node
                };

                if (terms is null)
                {
                    edges.Add(edge);
                    continue;
                }
                foreach (var term in terms)
                {
                    node.Terminals.Add(term);

                    if (term.Type == ConnectorType.Input)
                    {
                        node.InputTerminal = term;
                        node.InputTerminalId = term.Id;

                        edge.InputTerminal = term;
                        edge.InputTerminalId = term.Id;

                        edge.FromConnectorId = term.FromConnectorId;
                    }
                    else if (term.Type == ConnectorType.Output)
                    {
                        node.OutputTerminal = term;
                        node.OutputTerminalId = term.Id;

                        edge.OutputTerminal = term;
                        edge.OutputTerminalId = term.Id;
                        
                        edge.ToConnectorId = term.ToConnectorId;

                        var termPred = new string[] { "imf:hasTerminal", "imf:hasOutTerminal", "imf:hasInTerminal" };
                        var toNodeList = GetSubjects(termPred, term.ToConnectorId);
                        edge.ToNodeId = toNodeList.First().ToString();
                    }
                }
                edges.Add(edge);
            }

            return edges;
        }

        public List<ParserNode> GetAllLocationObjects()
        {
            var pred = RdfGraph.CreateUriNode("imf:hasLocation");

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
                MasterProjectId = Graph.Id

            }).ToList();

            foreach (var node in nodes)
            {
                var label = GetLabel(node.Id);
                node.Label = label;
                node.Name = label;
            }

            return nodes;
        }

        public List<ParserNode> GetAllFunctionObjectsWithTerminals()
        {

            var pred = RdfGraph.CreateUriNode(Resources.hasAspect);
            var obj = RdfGraph.CreateUriNode(Resources.Function);

            var subs = Store.GetTriplesWithPredicateObject(pred, obj).Select(t => t.Subject).ToList();

            var nodes = subs.Select(node => new ParserNode
            {
                Prefix = "",
                Aspect = Aspect.Function,
                Id = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                Terminals = new List<ParserTerminal>(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectId = Graph.Id

            }).ToList();

            var parents = new List<ParserNode>();
            foreach (var node in nodes)
            {
                var label = GetLabel(node.Id);
                node.Label = label;
                node.Name = label;

                var parent = GetParent(node.Id);
                ParserNode parentNode;
                try
                {
                    parentNode = Graph.GetNode(parent.ToString());
                }
                catch
                {
                    parentNode = new ParserNode
                    {
                        Id = parent.ToString(),
                        Aspect = Aspect.Function,
                        SemanticReference = parent.ToString(),
                        IsRoot = false,
                        Terminals = new List<ParserTerminal>(),
                        Version = "0.0",
                        MasterProjectId = Graph.Id,
                        Label = GetLabel(parent.ToString()),
                        Name = GetLabel(parent.ToString())
                    };

                    parents.Add(parentNode);
                }

                node.HasParent = parentNode;
            }
            nodes.AddRange(parents);

            foreach (var node in nodes)
            {
                //node.Terminals = GetTerminalsOnNode(node);
                node.Terminals = NewGetTerminalsOfNode(node);
            }

            return nodes;
        }
    }
    
}
