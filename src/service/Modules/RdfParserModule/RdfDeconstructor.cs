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
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
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

        public string NormaliseID(string id)
        {
            id = Regex.Replace(id, @"http(s)?:\/\/(www)?", "");
            id = id.Replace("#", "");
            id = id.Replace("/", "_");
            return id;
        }

        public void MakeProject()
        {
            Graph = new ParserGraph
            {
                IsSubProject = true,
                Nodes = new List<ParserNode>(),
                Edges = new List<ParserEdge>()
            };
            GetProjectInformation();

            var parserNodes = new List<ParserNode>();
            var parserEdges = new List<ParserEdge>();

            var functionObjects = GetAllFunctionObjects();
            
            foreach (var funcObj in functionObjects)
            {
                var terms = GetTerminalsOnNode(funcObj.Id);

                if (terms is null) { continue; }

                funcObj.Terminals = terms;

                parserNodes.Add(funcObj);
            }

            var locationObjects = GetAllLocationObjects();
            foreach (var locObj in locationObjects)
            {
                parserNodes.Add(locObj);
            }


            var roots = GetRootNodes();
            foreach (var r in roots.Select(root => new ParserNode()
            {
                IsRoot = root.IsRoot,
                Name = root.Name,
                Id = root.Id,
                NormalId = NormaliseID(root.Id),
                Label = root.Label,
                StatusId = root.StatusId,
                Version = root.Version,
                Terminals = new List<ParserTerminal>(),
                Aspect = root.Aspect,
                MasterProjectId = Graph.Id
            }))
            {
                parserNodes.Add(r);
            }


            AddAspectRelation("Part Of");
            AddAspectRelation("Has Location");

            //var nodes = _mapper.Map<List<NodeAm>>(parserNodes);
            //var edges = _mapper.Map<List<EdgeAm>>(GetTransports());

            parserEdges.AddRange(GetTransports());

            Graph.Nodes = parserNodes;
            Graph.Edges = parserEdges;
            

            Project = _mapper.Map<ProjectAm>(Graph);

        }

        public void GetProjectInformation()
        {
            var integratedObject = RdfGraph.CreateUriNode("imf:IntegratedObject");
            var projectId = Store.GetTriplesWithObject(integratedObject).Select(t => t.Subject).ToList().First();

            //var label = Store.GetTriplesWithSubjectPredicate(projectId, RdfGraph.CreateUriNode("rdfs:label")).Select(t=>t.Object).ToList().First();
            var label = GetObjects(projectId.ToString(), "rdfs:label").First();
            //var version = Store.GetTriplesWithSubjectPredicate(projectId, RdfGraph.CreateUriNode("owl:versionInfo"));
            var version = GetObjects(projectId.ToString(), "owl:versionInfo").First();

            Graph.Id = "import.rdf_" + Guid.NewGuid(); //projectId.ToString() + Guid.NewGuid();
            Graph.Label = label.ToString();
            Graph.Name = label.ToString();
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
            var p = RdfGraph.CreateUriNode("imf:isAspectOf");
            var list = Store.GetTriplesWithPredicate(p).Select(t => t.Subject).ToList();

            var roots = list.Select(node => new ParserNode
            {
                IsRoot = true,
                Id = node.ToString(),
                NormalId = NormaliseID(node.ToString()),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectId = Graph.Id

            }).ToList();

            foreach (var node in roots)
            {
                var label = GetObjects(node.Id, "rdfs:label")[0].ToString();
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
            var s = RdfGraph.GetUriNode(new Uri(subject));
            var p = RdfGraph.CreateUriNode(predicate);
            var list = Store.GetTriplesWithSubjectPredicate(s, p).Select(t => t.Object).ToList();

            if (list.Count is 0)
            {
                return null;
            }

            return list;
        }

        public List<INode> GetSubjects(string[] predicates, string obj, bool objId = false)
        {
            var list = new List<INode>();
            foreach (var predicate in predicates)
            {
                var p = RdfGraph.CreateUriNode(predicate);
                var o = objId ? RdfGraph.GetUriNode(new Uri(obj)) : RdfGraph.CreateUriNode(obj);
                list.AddRange(Store.GetTriplesWithPredicateObject(p, o).Select(t => t.Subject).ToList());
            }

            return list.Count is 0 ? null : list;
        }

        public void AddAspectRelation(string relation)
        {
            IUriNode predicate;
            switch (relation)
            {
                case "Has Location":
                    predicate = RdfGraph.CreateUriNode("imf:hasLocation");
                    break;
                case "Part Of":
                    predicate = RdfGraph.CreateUriNode("imf:hasParent");
                    break;
                case "Fulfilled By":
                    predicate = RdfGraph.CreateUriNode("imf:fulfilledBy");
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


        public List<ParserTerminal> GetTerminalsOnNode(string nodeId)
        {
            try
            {
                var inTerms = GetObjects(nodeId, "imf:hasInputTerminal").Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    NormalId = NormaliseID(obj.ToString()),
                    Type = ConnectorType.Input,
                    SemanticReference = obj.ToString(),
                    NodeId = nodeId

                }).ToList();
                


                // Den som INPUT er connectedTo er jo FromConnectorId
                // Og den som OUTPUT er connectedTo er ToConnectorId

                var outTerms = GetObjects(nodeId, "imf:hasOutputTerminal").Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    NormalId = NormaliseID(obj.ToString()),
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
                        o.NormalToConnectorId = o.ToConnectorId;
                    }
                    var label = GetObjects(o.Id, "rdfs:label");
                    if (label == null) continue;

                    o.Label = label[0].ToString();
                    o.Name = o.Label.Replace(" Output", "").Replace(" Input", "");

                    // Du må finne Category Name. Dette manglar på eksport.
                    // Døme: Energy Electrical, Material Granulate, Material Fluid, Energy Mechanical, Information
                    var transmitter = GetObjects(o.Id, "rdf:type")
                        .Where(node => node.ToString().Contains("Transmitter")).First();
                    var categoryName = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();

                    var (termcatId, termTypeId) = o.Name.CreateCategoryIdAndTerminalTypeId(categoryName);
                    o.TerminalCategoryId = termcatId;
                    o.TerminalTypeId = termTypeId;
                }

                foreach (var o in inTerms)
                {
                    var connection = GetObjects(o.Id, "imf:connectedTo");
                    if (connection != null)
                    {
                        o.FromConnectorId = connection.First().ToString();
                        o.NormalFromConnectorId = o.FromConnectorId;
                    }
                    var label = GetObjects(o.Id, "rdfs:label");

                    if (label == null) continue;
                    o.Label = label[0].ToString();
                    o.Name = o.Label.Replace(" Output", "").Replace(" Input", "");
                }
                outTerms.AddRange(inTerms);

                return outTerms;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public List<ParserEdge> GetTransports()
        {
            var pred = new string[] { "rdf:type" };
            var transports = GetSubjects(pred, "imf:Transport");

            var nodes = transports.Select(node => new ParserTransport
            {
                Id = node.ToString(),
                NormalId = NormaliseID(node.ToString()),
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
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
                node.Name = node.Label;
                var aspect = GetObjects(node.Id, "imf:hasAspect")[0].ToString();

                switch (aspect)
                {
                    case "Function":
                        node.Aspect = Aspect.Function;
                        break;
                    case "Location":
                        node.Aspect = Aspect.Location;
                        break;
                    case "Product":
                        node.Aspect = Aspect.Product;
                        break;
                }

                var terms = GetTerminalsOnNode(node.Id);
                var edge = new ParserEdge()
                {
                    FromNodeId = node.Id,
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
                    }
                    else
                    {
                        node.OutputTerminal = term;
                        node.OutputTerminalId = term.Id;

                        edge.InputTerminal = term;
                        edge.InputTerminalId = term.Id;
                    }

                    if (term.FromConnectorId != null)
                    {
                        edge.FromConnectorId = term.FromConnectorId;
                        edge.NormalFromConnectorId = term.NormalFromConnectorId;
                    }

                    if (term.ToConnectorId != null)
                    {
                        edge.ToConnectorId = term.ToConnectorId;
                        edge.NormalToConnectorId = term.NormalToConnectorId;

                        var termPred = new string[] { "imf:hasTerminal", "imf:hasOutputTerminal", "imf:hasInputTerminal" };
                        var toNodeList = GetSubjects(termPred, term.ToConnectorId, true);
                        if (toNodeList is null) continue;
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
                NormalId = NormaliseID(node.ToString()),
                Name = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectId = Graph.Id

            }).ToList();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
                node.Name = node.Label;
            }

            return nodes;
        }

        public List<ParserNode> GetAllFunctionObjects()
        {

            var pred = RdfGraph.CreateUriNode("imf:hasAspect");
            var obj = RdfGraph.CreateUriNode("imf:Function");

            var subs = Store.GetTriplesWithPredicateObject(pred, obj).Select(t => t.Subject).ToList();

            var nodes = subs.Select(node => new ParserNode
            {
                Prefix = "",
                Aspect = Aspect.Function,
                Id = node.ToString(),
                NormalId = NormaliseID(node.ToString()),
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
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
                node.Name = node.Label;

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
                        MasterProjectId = Graph.Id
                    };

                    parents.Add(parentNode);
                }

                node.HasParent = parentNode;
            }
            nodes.AddRange(parents);
            return nodes;
        }
    }
    
}
