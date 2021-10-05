using System;
using System.Collections.Generic;
using System.Linq;
using AngleSharp.Dom;
using Mb.Models.Application;
using Mb.Models.Enums;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using INode = VDS.RDF.INode;

namespace RdfParserModule
{
    class RdfDeconstructor
    {
        public IGraph RdfGraph { get; set; }
        public ParserGraph ParserGraph { get; set; }
        public TripleStore Store { get; set; }
        public ProjectAm Project { get; set; }

        public void LoadGraph(string valueAsString)
        {
            RdfGraph = new OntologyGraph();
            RdfGraph.LoadFromFile("C:\\Git\\ti-spine-modelbuilder\\src\\service\\Modules\\RdfParserModule\\ontologies.owl", new TurtleParser());

            IGraph graph = new Graph();
            graph.LoadFromString(valueAsString);

            RdfGraph.Merge(graph);

            Store = new TripleStore();
            Store.Add(RdfGraph);

            Project = new ProjectAm();
        }

        public void MakeProject()
        {
            ParserGraph = new ParserGraph
            {
                Id = "Test Import Id",
                Name = "Test import Name",
                Version = "0.0",
                IsSubProject = false,
                Nodes = new List<ParserNode>(),
                Edges = new List<ParserEdge>()
            };

            var functionObjects = GetAllFunctionObjects();
            
            foreach (var funcObj in functionObjects)
            {
                var terms = GetTerminalsOnNode(funcObj.Id);

                if (terms is null) { continue; }

                foreach (var term in terms)
                {
                    funcObj.Terminals.Add(term);
                    if (term.ConnectedToId is null) continue;
                    var edge = new ParserEdge()
                    {
                        FromConnectorId = term.Id,
                        ToConnectorId = term.ConnectedToId,
                        FromNodeId = funcObj.Id,
                        MasterProjectId = ParserGraph.Id
                    };
                    ParserGraph.Edges.Add(edge);
                }
                ParserGraph.Nodes.Add(funcObj);
            }

            var locationObjects = GetAllLocationObjects();
            foreach (var locObj in locationObjects)
            {
                ParserGraph.Nodes.Add(locObj);
            }

            var transports = GetTransports();
            foreach (var transport in transports)
            {
                var terms = GetTerminalsOnNode(transport.Id);
                if (terms is null) { continue; }

                transport.Terminals = new List<ParserTerminal>();

                foreach (var term in terms)
                {
                    transport.Terminals.Add(term);
                }
                ParserGraph.Nodes.Add(transport);
            }

            var roots = GetRootNodes();
            foreach (var root in roots)
            {
                var r = new ParserNode()
                {
                    IsRoot = root.IsRoot,
                    Name = root.Name,
                    Id = root.Id,
                    Label = root.Label,
                    StatusId = root.StatusId,
                    Version = root.Version,
                    Terminals = new List<ParserTerminal>(),
                    Aspect = root.Aspect
                };
                ParserGraph.Nodes.Add(r);
            }


            AddAspectRelation("Part Of");
            AddAspectRelation("Has Location");

            var nodes = new List<NodeAm>();

            foreach (var node in ParserGraph.Nodes)
            {
                var n = new NodeAm()
                {
                    Id = node.Id,
                    Name = node.Name,
                    Version = node.Version,
                    IsLocked = node.IsLocked,
                    StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                    IsRoot = node.IsRoot,
                    Attributes = new List<AttributeAm>(),
                    MasterProjectId = ParserGraph.Id,
                    Label = node.Label
                };

                n.Aspect = node.Aspect switch
                {
                    "Function" => Aspect.Function,
                    "Location" => Aspect.Location,
                    "Product" => Aspect.Product,
                    _ => n.Aspect
                };

                n.Connectors = new List<ConnectorAm>();
                
                foreach (var term in node.Terminals)
                {
                    var c = new ConnectorAm()
                    {
                        Id = term.Id,
                        Name = term.Name,
                        Type = (term.Type == "Input") ? ConnectorType.Input : ConnectorType.Output,
                        Attributes = new List<AttributeAm>()
                    };
                    n.Connectors.Add(c);
                }
                nodes.Add(n);
            }

            var edges = new List<EdgeAm>();
            foreach (var edge in ParserGraph.Edges)
            {
                var e = new EdgeAm()
                {
                    FromConnectorId = edge.FromConnectorId,
                    ToConnectorId = edge.ToConnectorId,
                    FromNodeId = edge.FromNodeId,
                    MasterProjectId = edge.MasterProjectId
                };
                edges.Add(e);
            }

         

            Project.Id = ParserGraph.Id;
            Project.Name = ParserGraph.Name;
            Project.IsSubProject = ParserGraph.IsSubProject;
            Project.Version = ParserGraph.Version;
            Project.Nodes = nodes;
            Project.Edges = edges;

            //foreach (var node in ParserGraph.Nodes)
            //{
            //    Console.WriteLine("\n" + node);
            //    if (node.HasParent != null) { Console.WriteLine("\tPart Of:\n\t\t" + node.HasParent); }
            //    if (node.HasLocation != null) { Console.WriteLine("\tHas Location:\n\t\t" + node.HasLocation); }
            //    if (node.FulfilledBy != null) { Console.WriteLine("\tFulfilled By:\n\t\t" + node.FulfilledBy); }

            //    if (node.Terminals is null) { continue; }

            //    Console.WriteLine("\tTerminals:");
            //    foreach (var term in node.Terminals)
            //    {
            //        Console.WriteLine("\t\t" + term + " connected to " + term.ConnectedToId);
            //    }
            //}

        }

        public List<ParserNode> GetRootNodes()
        {
            var p = RdfGraph.CreateUriNode("imf:isAspectOf");
            var list = Store.GetTriplesWithPredicate(p).Select(t => t.Subject).ToList();

            var roots = list.Select(node => new ParserNode
            {
                IsRoot = true,
                Id = node.ToString(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0"

            }).ToList();

            foreach (var node in roots)
            {
                var label = GetObjects(node.Id, "rdfs:label")[0].ToString();
                if (label.ToLower().Contains("function"))
                {
                    node.Label = "Function";
                    node.Name = "Function";
                    node.Aspect = "Function";
                }
                else if (label.ToLower().Contains("location"))
                {
                    node.Label = "Location";
                    node.Name = "Location";
                    node.Aspect = "Location";
                }
                else if (label.ToLower().Contains("product"))
                {
                    node.Label = "Product";
                    node.Name = "Product";
                    node.Aspect = "Product";
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

        public List<INode> GetSubjects(string predicate, string obj)
        {
            var p = RdfGraph.CreateUriNode(predicate);
            var o = RdfGraph.CreateUriNode(obj);
            var list = Store.GetTriplesWithPredicateObject(p, o).Select(t => t.Subject).ToList();

            if (list.Count is 0)
            {
                return null;
            }

            return list;
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
                    var sNode = ParserGraph.GetNode(s.ToString());

                    var o = triple.Object;
                    var oNode = ParserGraph.GetNode(o.ToString());

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
                    Relation = "hasInputTerminal",
                    Name = obj.ToString()[(obj.ToString().Length - 10)..],
                    Type = "Input",
                    SemanticReference = obj.ToString(),
                    NodeId = nodeId

                }).ToList();

                var outTerms = GetObjects(nodeId, "imf:hasOutputTerminal").Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    Relation = "hasOutputTerminal",
                    Name = obj.ToString()[(obj.ToString().Length - 5)..],
                    Type = "Output",
                    SemanticReference = obj.ToString(),
                    NodeId = nodeId

                }).ToList();

                foreach (var o in outTerms)
                {
                    var connection = GetObjects(o.Id, "imf:connectedTo");
                    if (connection is null)
                    {
                        break;
                    }
                    o.ConnectedToId = connection.First().ToString();
                    var label = GetObjects(o.Id, "rdfs:label");
                    if (label == null) continue;

                    o.Label = label[0].ToString(); ;
                }

                foreach (var o in inTerms)
                {
                    var connection = GetObjects(o.Id, "imf:connectedTo");
                    if (connection is null)
                    {
                        break;
                    }
                    o.ConnectedToId = connection.First().ToString();
                    var label = GetObjects(o.Id, "rdfs:label");
                    if (label != null)
                    {
                        o.Label = label[0].ToString(); ;
                    }
                }
                outTerms.AddRange(inTerms);

                return outTerms;
            }
            catch (Exception e)
            {
                Console.WriteLine("Terminal error!");
                return null;
            }
        }

        public List<ParserNode> GetTransports()
        {
            var transports = GetSubjects("rdf:type", "imf:Transport");

            var nodes = transports.Select(node => new ParserNode
            {
                Prefix = "",
                Id = node.ToString(),
                Name = node.ToString().Substring(node.ToString().Length - 5),
                SemanticReference = node.ToString(),
                IsTransport = true,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0"
            }).ToList();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
            }

            return nodes;
        }

        public List<ParserNode> GetAllLocationObjects()
        {
            var pred = RdfGraph.CreateUriNode("imf:hasLocation");

            var subs = Store.GetTriplesWithPredicate(pred).Select(t => t.Object).ToList();

            var nodes = subs.Select(node => new ParserNode
            {
                Prefix = "",
                Aspect = "Location",
                Id = node.ToString(),
                Name = node.ToString().Substring(node.ToString().Length - 5),
                SemanticReference = node.ToString(),
                IsRoot = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0"

            }).ToList();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
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
                Aspect = "Function",
                Id = node.ToString(),
                Name = node.ToString().Substring(node.ToString().Length - 5),
                SemanticReference = node.ToString(),
                IsRoot = false,
                Terminals = new List<ParserTerminal>(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0"

            }).ToList();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
            }

            return nodes;
        }
    }
    
}
