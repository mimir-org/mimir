﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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
        public ParserGraph Graph { get; set; }
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
                        MasterProjectId = Graph.Id
                    };

                    var pred = new string[] { "imf:hasTerminal", "imf:hasOutputTerminal", "imf:hasInputTerminal" };
                    var toNodeList = GetSubjects(pred, term.ConnectedToId, true);

                    if (toNodeList is null ) continue;
                    edge.ToNodeId = toNodeList.First().ToString();
                    
                    Graph.Edges.Add(edge);
                }
                Graph.Nodes.Add(funcObj);
            }

            var locationObjects = GetAllLocationObjects();
            foreach (var locObj in locationObjects)
            {
                Graph.Nodes.Add(locObj);
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
                Aspect = root.Aspect
            }))
            {
                Graph.Nodes.Add(r);
            }


            AddAspectRelation("Part Of");
            AddAspectRelation("Has Location");

            var nodes = new List<NodeAm>();

            foreach (var node in Graph.Nodes)
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
                    MasterProjectId = Graph.Id,
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




            var edges = Graph.Edges.Select(edge => new EdgeAm()
                {
                    FromConnectorId = edge.FromConnectorId,
                    ToConnectorId = edge.ToConnectorId,
                    FromNodeId = edge.FromNodeId,
                    ToNodeId = edge.ToNodeId,
                    MasterProjectId = edge.MasterProjectId
                })
                .ToList();

            var transports = GetTransports();
            var transportEdges = transports.Select(edge => new EdgeAm()
            {
                FromConnectorId = edge.FromConnectorId,
                ToConnectorId = edge.ToConnectorId,
                FromNodeId = edge.FromNodeId,
                ToNodeId = edge.ToNodeId,
                MasterProjectId = edge.MasterProjectId,
                Transport = new TransportAm()
                {
                    Id = edge.Transport.Id,
                    Name = edge.Transport.Name,
                    InputTerminal = new TerminalAm()
                    {
                        Id = edge.InputTerminal.Id,
                        Type = ConnectorType.Input,
                        NodeId = edge.InputTerminal.NodeId,
                        Name = edge.InputTerminal.Name
                    },
                    OutputTerminal = new TerminalAm()
                    {
                        Id = edge.OutputTerminal.Id,
                        Type = ConnectorType.Output,
                        NodeId = edge.OutputTerminal.NodeId,
                        Name = edge.OutputTerminal.Name
                    }
                }
            }).ToList();

            edges.AddRange(transportEdges);

            Project.Id = Graph.Id;
            Project.Name = Graph.Name;
            Project.IsSubProject = Graph.IsSubProject;
            Project.Description = Graph.Name;
            Project.Version = Graph.Version;
            Project.Nodes = nodes;
            Project.Edges = edges;

        }

        public void GetProjectInformation()
        {
            var integratedObject = RdfGraph.CreateUriNode("imf:IntegratedObject");
            var projectId = Store.GetTriplesWithObject(integratedObject).Select(t => t.Subject).ToList().First();

            //var label = Store.GetTriplesWithSubjectPredicate(projectId, RdfGraph.CreateUriNode("rdfs:label")).Select(t=>t.Object).ToList().First();
            var label = GetObjects(projectId.ToString(), "rdfs:label").First();
            //var version = Store.GetTriplesWithSubjectPredicate(projectId, RdfGraph.CreateUriNode("owl:versionInfo"));
            var version = GetObjects(projectId.ToString(), "owl:versionInfo").First();

            Graph.Id = projectId.ToString();
            Graph.Label = label.ToString();
            Graph.Name = label.ToString();
            Graph.Version = version.ToString();
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
                var aspect = GetObjects(nodeId, "imf:hasAspect")[0].ToString();
                var inTerms = GetObjects(nodeId, "imf:hasInputTerminal").Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    NormalId = NormaliseID(obj.ToString()),
                    Relation = "hasInputTerminal",
                    Type = "Input",
                    SemanticReference = obj.ToString(),
                    NodeId = nodeId

                }).ToList();

                var outTerms = GetObjects(nodeId, "imf:hasOutputTerminal").Select(obj => new ParserTerminal
                {
                    Id = obj.ToString(),
                    NormalId = NormaliseID(obj.ToString()),
                    Relation = "hasOutputTerminal",
                    Type = "Output",
                    SemanticReference = obj.ToString(),
                    NodeId = nodeId

                }).ToList();

                foreach (var o in outTerms)
                {
                    o.Aspect = aspect;
                    var connection = GetObjects(o.Id, "imf:connectedTo");
                    if (connection != null)
                    {
                        o.ConnectedToId = connection.First().ToString();
                    }
                    var label = GetObjects(o.Id, "rdfs:label");
                    if (label == null) continue;

                    o.Label = label[0].ToString();
                    o.Name = o.Label;
                }

                foreach (var o in inTerms)
                {
                    o.Aspect = aspect;
                    var connection = GetObjects(o.Id, "imf:connectedTo");
                    if (connection != null)
                    {
                        o.ConnectedToId = connection.First().ToString();
                    }
                    var label = GetObjects(o.Id, "rdfs:label");

                    if (label == null) continue;
                    o.Label = label[0].ToString();
                    o.Name = o.Label;
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

        public List<ParserEdge> GetTransports()
        {
            var pred = new string[] { "rdf:type" };
            var transports = GetSubjects(pred, "imf:Transport");

            var nodes = transports.Select(node => new ParserNode
            {
                Id = node.ToString(),
                NormalId = NormaliseID(node.ToString()),
                SemanticReference = node.ToString(),
                IsTransport = true,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                Terminals = new List<ParserTerminal>()
            }).ToList();


            var edges = new List<ParserEdge>();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
                node.Name = node.Label;
                node.Aspect = GetObjects(node.Id, "imf:hasAspect")[0].ToString();

                var terms = GetTerminalsOnNode(node.Id);
                var edge = new ParserEdge()
                {
                    FromNodeId = node.Id,
                    MasterProjectId = Graph.Id,
                    Transport = node
                };

                if (terms is null) { continue; }
                foreach (var term in terms)
                {
                    node.Terminals.Add(term);
 
                    if (term.ConnectedToId is null) continue;
  
                    if (term.Type == "Input") { edge.InputTerminal = term; }
                    else { edge.OutputTerminal = term; }

                    var termPred = new string[] { "imf:hasTerminal", "imf:hasOutputTerminal", "imf:hasInputTerminal" };
                    var toNodeList = GetSubjects(termPred, term.ConnectedToId, true);


                    if (toNodeList is null) continue;
                    edge.ToNodeId = toNodeList.First().ToString();

                   
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
                Aspect = "Location",
                Id = node.ToString(),
                NormalId = NormaliseID(node.ToString()),
                Name = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0"

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
                Aspect = "Function",
                Id = node.ToString(),
                NormalId = NormaliseID(node.ToString()),
                SemanticReference = node.ToString(),
                IsRoot = false,
                Terminals = new List<ParserTerminal>(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0"

            }).ToList();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
                node.Name = node.Label;
            }

            return nodes;
        }
    }
    
}
