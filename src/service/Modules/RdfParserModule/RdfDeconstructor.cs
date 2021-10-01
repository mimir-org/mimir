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

        public void LoadGraph(string valueAsString)
        {
            RdfGraph = new Graph();
            RdfGraph.LoadFromString(valueAsString);
        }

        public ProjectAm ExampleProject()
        {
            ParserGraph = new ParserGraph();

            var functionObjects = GetAllFunctionObjects();
            foreach (var funcObj in functionObjects)
            {
                ParserGraph.Nodes.Add(funcObj);
            }

            var p = new ProjectAm();
            return p;
        }

        public List<ParserNode> GetAllFunctionObjects()
        {
            var store = new TripleStore();
            store.Add(RdfGraph);

            var pred = RdfGraph.CreateUriNode("imf:hasAspect");
            var obj = RdfGraph.CreateUriNode("imf:Function");

            var subs = store.GetTriplesWithPredicateObject(pred, obj).Select(t => t.Subject).ToList();
            
            var nodes = subs.Select(node => new ParserNode
            {
                Aspect = "Function",
                Id = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false

            }).ToList();

            return nodes;
        }

        private string RdfToString(IGraph g)
        {
            RdfJsonWriter writer = new RdfJsonWriter();

            string data = StringWriter.Write(g, writer);

            return data;
        }

        public ProjectAm GetProject()
        {

            var fromNode = new NodeAm
            {
                Id = "FromNodeId",
                Name = "Markus Node",
                Label = "Markus label",
                PositionX = 0.0m,
                PositionY = 5.0m,
                Connectors = new Collection<ConnectorAm>(),
                Attributes = new Collection<AttributeAm>(),
                Version = "version",
                Rds = "KEA",
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                IsRoot = true,
                MasterProjectId = "projectId",
                Aspect = Aspect.Function
            };

            var toNode = new NodeAm
            {
                Id = "ToNodeId",
                Name = "Markus Node2",
                Label = "Markus label2",
                PositionX = 0.0m,
                PositionY = 5.0m,
                Connectors = new Collection<ConnectorAm>(),
                Attributes = new Collection<AttributeAm>(),
                Version = "version",
                Rds = "KEA",
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                IsRoot = false,
                MasterProjectId = "projectId",
                Aspect = Aspect.Function
            };

            var fromConnector = new RelationAm
            {
                Id = "FromConnectorId",
                Name = "Markus Connector",
                Type = ConnectorType.Output,
                NodeId = fromNode.Id,
                RelationType = RelationType.PartOf
            };
            var toConnector = new RelationAm
            {
                Id = "ToConnectorId",
                Name = "Markus Connector",
                Type = ConnectorType.Output,
                NodeId = fromNode.Id,
                RelationType = RelationType.PartOf
            };
            fromNode.Connectors.Add(fromConnector);
            fromNode.Connectors.Add(toConnector);


            var fromConnector2 = new RelationAm
            {
                Id = "FromConnectorId2",
                Name = "Markus Connector 2",
                Type = ConnectorType.Output,
                NodeId = toNode.Id,
                RelationType = RelationType.PartOf
            };
            var toConnector2 = new RelationAm
            {
                Id = "ToConnectorId2",
                Name = "Markus Connector 2",
                Type = ConnectorType.Output,
                NodeId = toNode.Id,
                RelationType = RelationType.PartOf
            };
            toNode.Connectors.Add(fromConnector2);
            toNode.Connectors.Add(toConnector2);

            var p = new ProjectAm
            {
                Id = "projectId",
                Version = "version",
                Name = "projectLabel",
                Description = "Project Description",
                Nodes = new Collection<NodeAm>(),
                Edges = new Collection<EdgeAm>()
            };

            var edge = new EdgeAm
            {
                Id = "EdgeId",
                FromConnectorId = fromConnector.Id,
                ToConnectorId = toConnector.Id,
                FromNodeId = fromNode.Id,
                ToNodeId = toNode.Id,
                MasterProjectId = "projectId",
                IsTemplateEdge = false
            };

            var attribute = new AttributeAm
            {
                Id = "AttributeId",
                Key = "Kulhet",
                Value = "Max",
                NodeId = "NodeId"
            };
            fromNode.Attributes.Add(attribute);

            p.Nodes.Add(fromNode);
            p.Nodes.Add(toNode);
            p.Edges.Add(edge);

            return p;
        }
    }
}
