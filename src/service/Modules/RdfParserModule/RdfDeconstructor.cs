using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Enums;
using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Query.Datasets;
using VDS.RDF.Writing;

namespace RdfParserModule
{
    class RdfDeconstructor
    {
        public IGraph RdfGraph { get; set; }
        public ParserGraph ParserGraph { get; set; }
        public TripleStore Store { get; set; }

        public void LoadGraph(string valueAsString)
        {
            RdfGraph = new Graph();
            RdfGraph.LoadFromFile(valueAsString);

            Store = new TripleStore();
            Store.Add(RdfGraph);
        }

        public void ExampleProject()
        {
            ParserGraph = new ParserGraph
            {
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
                }
                ParserGraph.Nodes.Add(funcObj);
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

            foreach (var node in ParserGraph.Nodes)
            {
                Console.WriteLine(node + " has terminals:");
                foreach (var term in node.Terminals)
                {
                    Console.WriteLine("\t" + term);
                }
                Console.WriteLine();
            }
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
                    if (label != null)
                    {
                        o.Label = label[0].ToString(); ;
                    }
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
                Console.WriteLine(e);
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
                IsTransport = true
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
                Terminals = new List<ParserTerminal>()

            }).ToList();

            foreach (var node in nodes)
            {
                node.Label = GetObjects(node.Id, "rdfs:label")[0].ToString();
            }

            return nodes;
        }

        private string RdfToString(IGraph g)
        {
            RdfJsonWriter writer = new RdfJsonWriter();

            string data = StringWriter.Write(g, writer);

            return data;
        }

    }
}
