using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using VDS.RDF.Parsing.Tokens;
using VDS.RDF.Writing;
using Attribute = Mb.Models.Data.Attribute;


namespace RdfParserModule
{
    public class RdfBuilder : IRdfBuilder
    {
        public Project _project;
        public IGraph _graph;

        
        private IDictionary<string, string> GetNamespaces()
        {
            IDictionary<string, string> namespaces = new Dictionary<string, string>()
            {
                // Kanskje midlertidig ontologi for RDS-klassar (for Mimir)
                {"mimir", "http://example.com/mimir#"},
                {"imf", "http://example.com/imf#"},
                {"rds", "http://example.com/rds"},
                {"cw", "http://example.com/rds/cw#"},
                {"og1", "http://example.com/rds/og1#"},
                {"og2", "http://example.com/rds/og2#"},
                {"og3", "http://example.com/rds/og3#"},
                {"ps", "http://example.com/rds/ps#"},
                {"rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"},
                {"rdfs", "http://www.w3.org/2000/01/rdf-schema#"},
                {"xsd", "http://www.w3.org/2001/XMLSchema#"},
                {"owl", "http://www.w3.org/2002/07/owl#"},
                {"xml", "http://www.w3.org/XML/1998/namespace"}
            };

            return namespaces;
        }

        private IGraph BaseGraph()
        {
            // IMF Ontology: https://raw.githubusercontent.com/Sirius-sfi/aas-imf/main/imf-ontology/imf-202109.owl
            OntologyGraph ontology = new OntologyGraph();
            IDictionary<string, string> namespaces = GetNamespaces();

            foreach(KeyValuePair<string, string> ns in namespaces)
            {
                var prefix = ns.Key;
                var uri = ns.Value;

                ontology.NamespaceMap.AddNamespace(prefix, new Uri(uri));
            }


            return ontology;
            
        }
        public void BuildProject(Project project)
        {
            _project = project; 

            _graph = BaseGraph();
            
            var id = _project.Id;
            var name = _project.Name;
            var version = _project.Version;
            var desc = _project.Description;


            // Node for the project (named after its ID)
            var projectNode = _graph.CreateUriNode("mimir:" + id);
            var label = _graph.CreateUriNode("rdfs:label");
            var isVersion = _graph.CreateUriNode("owl:versionInfo");
            var projectName = _graph.CreateLiteralNode(name);
            var projectDesc = _graph.CreateLiteralNode(desc);
            var projectVersion = _graph.CreateLiteralNode(version);

            _graph.Assert(new Triple(projectNode, label, projectName));
            _graph.Assert(new Triple(projectNode, label, projectDesc));
            _graph.Assert(new Triple(projectNode, isVersion, projectVersion));
            _graph.Assert(new Triple(projectNode, _graph.CreateUriNode("rdf:type"), _graph.CreateUriNode("mimir:Project")));
            _graph.Assert(new Triple(projectNode, _graph.CreateUriNode("rdf:type"), _graph.CreateUriNode("imf:IntegratedObject")));

            BuildNodes();
            BuildEdges();
        }

        private void BuildNodes()
        {
            var label = _graph.CreateUriNode("rdfs:label");
            var type = _graph.CreateUriNode("rdf:type");
            var hasAspect = _graph.CreateUriNode("imf:hasAspect");

            foreach (Node node in _project.Nodes)
            {
                IUriNode nodeId = _graph.CreateUriNode("mimir:" + node.Id);              


                if (node.IsRoot)
                {
                    _graph.Assert(new Triple(nodeId, _graph.CreateUriNode("imf:isAspectOf"),
                        _graph.CreateUriNode("mimir:" + node.MasterProjectId)));

                    _graph.Assert(new Triple(nodeId, label, _graph.CreateLiteralNode(_project.Name + " " + node.Aspect)));

                    continue;
                }

                _graph.Assert(new Triple(nodeId, label, _graph.CreateLiteralNode(node.Rds + " " +node.Label)));

                var hasTerminal = _graph.CreateUriNode("imf:hasTerminal");
                var isTerminal = _graph.CreateUriNode("imf:Terminal");

                foreach (Connector connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal terminal:
                            //TODO Check if this can actually be called 'transmitter'
                            var transmitter = _graph.CreateUriNode("imf:" + terminal.Name + "Transmitter");
                            

                            var terminalKey = _graph.CreateUriNode("imf:" + terminal.Type + "Terminal");
                            var nodeTerminal = _graph.CreateUriNode("mimir:" + terminal.Id + "_node");
                            _graph.Assert(new Triple(nodeId, hasTerminal, nodeTerminal));
                            _graph.Assert(new Triple(nodeTerminal, type, terminalKey));

                            var terminalLabel = _graph.CreateLiteralNode(terminal.Name + " " + terminal.Type);
                            _graph.Assert(new Triple(nodeTerminal, label, terminalLabel));

                            _graph.Assert(new Triple(nodeTerminal, type, transmitter));

                            break;
                    }
                }

                var nodeAspect = _graph.CreateUriNode("imf:" + node.Aspect);
                _graph.Assert(new Triple(nodeId, hasAspect, nodeAspect));

                if (!string.IsNullOrEmpty(node.Rds))
                {
                    var prefix = "";
                    switch (node.Aspect)
                    {
                        case Aspect.Function:
                            prefix = "=";
                            break;
                        case Aspect.Product:
                            prefix = "-";
                            break;
                        case Aspect.Location:
                            prefix = "+";
                            break;
                    }

                    var qname = "og" + node.Rds.Length + ":" + prefix + node.Rds;
                    var nodeRds = _graph.CreateUriNode(qname);
                    _graph.Assert(new Triple(nodeId, type, nodeRds));
                }


                // Modelling attributes
                ICollection<Attribute> attributes = node.Attributes;

                if (attributes is null) { return; }



                foreach (Attribute attribute in attributes)
                {
                    var value = attribute.Value;
                    if (value is null)
                    {
                        continue;
                    }
                    var attributeNode = _graph.CreateUriNode("mimir:" + attribute.Id);

                    var attributeTypeNode = _graph.CreateUriNode("mimir:" + attribute.AttributeTypeId);
                    _graph.Assert(new Triple(attributeTypeNode, _graph.CreateUriNode("rdfs:subClassOf"),
                        _graph.CreateUriNode("imf:Attribute")));

                    _graph.Assert(new Triple(attributeTypeNode, label, _graph.CreateLiteralNode(attribute.Key)));

                    _graph.Assert(new Triple(nodeId, _graph.CreateUriNode("imf:hasAttribute"), attributeNode));
                    // Using the AttributeTypeId as the IRI should probably not 
                    _graph.Assert(new Triple(attributeNode, _graph.CreateUriNode("rdf:type"), attributeTypeNode));
                    _graph.Assert(new Triple(attributeNode, _graph.CreateUriNode("imf:hasValue"), _graph.CreateLiteralNode(value)));

                    _graph.Assert(new Triple(attributeNode, label, _graph.CreateLiteralNode(attribute.Key)));

                    //TODO Fix this, but here is at least the Unit ID for the selected Unit. Just have to find out what the name of the selected unit is
                    _graph.Assert(new Triple(attributeTypeNode, _graph.CreateUriNode("imf:selectedUnit"), _graph.CreateLiteralNode(
                        attribute.SelectedUnitId)));

                    // UnitString ikkje Units
                    var units = attribute.Units;
                    foreach (Unit unit in units)
                    {
                        var unitName = unit.Name;

                        _graph.Assert(new Triple(attributeNode, _graph.CreateUriNode("imf:allowedUnit"),
                            _graph.CreateLiteralNode(unitName)));
                    }
                }
            }
        }


        private void BuildEdges()
        {
            var edges = _project.Edges;
            var label = _graph.CreateUriNode("rdfs:label");
            var type = _graph.CreateUriNode("rdf:type");
            var hasAspect = _graph.CreateUriNode("imf:hasAspect");
            


            foreach (Edge edge in edges)
            {
                var fromNode = _graph.CreateUriNode("mimir:" + edge.FromNodeId);
                var toNode = _graph.CreateUriNode("mimir:" + edge.ToNodeId);


                switch (edge.FromConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO If relation is PartOf, put it to hasChild
                        if (relationString.ToLower().Contains("partof"))
                        {
                            relationString = "hasChild";
                        }
                        IUriNode relationFromNode = _graph.CreateUriNode("imf:" + relationString);
                        _graph.Assert(new Triple(fromNode, relationFromNode, toNode));
                        break;
                }

                switch (edge.ToConnector)
                {
                    case Relation relation:
                        var relationString = relation.RelationType.ToString();

                        //TODO Can be removed when Mimir has correct IMF relation names
                        if (relationString.ToLower().Contains("partof"))
                        {
                            relationString = "hasParent";
                        }
                        relationString = relationString.Substring(0, 1).ToLower() + relationString.Substring(1);


                        var relationToNode = _graph.CreateUriNode("imf:" + relationString);
                        _graph.Assert(new Triple(toNode, relationToNode, fromNode));
                        break;
                }


                if (!string.IsNullOrEmpty(edge.TransportId))
                {
                    var transportNode = _graph.CreateUriNode("mimir:" + edge.TransportId);
                    _graph.Assert(new Triple(transportNode, type, _graph.CreateUriNode("imf:Transport")));

                    
                }
                if (!string.IsNullOrEmpty(edge.InterfaceId))
                {
                    var transportNode = _graph.CreateUriNode("mimir:" + edge.InterfaceId);
                    _graph.Assert(new Triple(transportNode, type, _graph.CreateUriNode("imf:Interface")));
                }
            }
        }

        public string RdfToString<T>() where T : IRdfWriter, new()
        {
            var writer = new T();

            var data = StringWriter.Write(_graph, writer);

            return data;
        }
        public byte[] GetBytes<T>() where T : IRdfWriter, new()
        {
            var graphString = RdfToString<T>();
            var bytes = Encoding.UTF8.GetBytes(graphString);

            return bytes;
        }
    }
}
