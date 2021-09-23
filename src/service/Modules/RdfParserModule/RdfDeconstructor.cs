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
        public static IGraph LoadGraph(string valueAsString)
        {
            IGraph g = new Graph();
            g.LoadFromString(valueAsString);

            return g;
        }

        public static ProjectAm ExampleProject(IGraph g)
        {
            var p = new ProjectAm();

            return p;
        }

        private static string RdfToString(IGraph g)
        {
            RdfJsonWriter writer = new RdfJsonWriter();

            string data = StringWriter.Write(g, writer);

            return data;
        }

        private static IDictionary<string, string> GetMetaDataFromGraph(IGraph g)
        {
            TripleStore store = new TripleStore();
            store.Add(g);

            InMemoryDataset ds = new InMemoryDataset(store, true);
            ISparqlQueryProcessor processor = new LeviathanQueryProcessor(ds);

            SparqlQueryParser parser = new SparqlQueryParser();
            SparqlQuery query = parser.ParseFromString(@"PREFIX imf: <http://example.com/imf#>
                    PREFIX  owl: <http://www.w3.org/2002/07/owl#>
                    PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    prefix imf: <http://example.com/imf#>
                    prefix mimir: <http://example.com/mimir#>


                    SELECT ?id ?label ?version WHERE {
                        ?project a imf:IntegratedObject .
                        ?project rdfs:label ?label .
                        ?project mimir:id ?id .
                        ?project owl:versionInfo ?version .
                    }");

            var resultStrings = new Dictionary<string, string>();

            var results = processor.ProcessQuery(query);
            if (results is SparqlResultSet)
            {
                SparqlResultSet rset = (SparqlResultSet) results;
                foreach (SparqlResult result in rset)
                {
                    foreach (var variable in result.Variables)
                    {
                        resultStrings[variable] = result[variable].ToString();
                    }
                }
            }

            return resultStrings;
        }

        public static ProjectAm GetProject(IGraph g)
        {

            var metaData = GetMetaDataFromGraph(g);

            string projectId = metaData["id"];
            string version = metaData["version"];
            string projectLabel = metaData["label"];


            var fromNode = new NodeAm
            {
                Id = "FromNodeId",
                Name = "Markus Node",
                Label = "Markus label",
                PositionX = 0.0m,
                PositionY = 5.0m,
                Connectors = new Collection<ConnectorAm>(),
                Attributes = new Collection<AttributeAm>(),
                Version = version,
                Rds = "KEA",
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                IsRoot = true,
                MasterProjectId = projectId,
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
                Version = version,
                Rds = "KEA",
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                IsRoot = false,
                MasterProjectId = projectId,
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
                Id = projectId,
                Version = version,
                Name = projectLabel,
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
                MasterProjectId = projectId,
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
