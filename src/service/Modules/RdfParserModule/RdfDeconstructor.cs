using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using RdfParserModule.Models;
using RdfParserModule.Properties;
using VDS.RDF;
using VDS.RDF.Ontology;
using VDS.RDF.Parsing;
using INode = VDS.RDF.INode;

namespace RdfParserModule
{
    public class RdfDeconstructor
    {
        public IGraph RdfGraph { get; set; }
        public ParserGraph ParserGraph { get; set; }
        public TripleStore Store { get; set; }
        public ProjectAm Project { get; set; }

        public List<ParserNode> ParserNodes;
        public List<ParserEdge> ParserEdges;
        public List<ParserConnector> ParserConnectors;

        private Dictionary<string, string> _namespaces;

        private readonly IMapper _mapper;

        public RdfDeconstructor(IMapper mapper)
        {
            _mapper = mapper;
            ParserNodes = new List<ParserNode>();
            ParserEdges = new List<ParserEdge>();
            ParserConnectors = new List<ParserConnector>();
        }
        public void MakeProject(string valueAsString)
        {
            Project = new ProjectAm();

            InitaliseNamespaces();
            LoadGraph(valueAsString);

            ParserGraph = new ParserGraph
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

            ParserGraph.Nodes = ParserNodes;
            ParserGraph.Edges = ParserEdges;

            Project = _mapper.Map<ProjectAm>(ParserGraph);
        }

        private string GetSymbol(string iri)
        {
            return GetLiteralValue(iri, BuildIri("mimir", "symbol"));
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

            //Store.AddInferenceEngine(new RdfsReasoner());

        }



        private ParserNode GetNode(string iri)
        {
            foreach (var node in ParserNodes.Where(node => node.Iri == iri))
            {
                return node;
            }

            throw new Exception($"Found no node with iri {iri}");
        }
        private ParserConnector GetConnector(string iri)
        {
            var c =
                (from connector in ParserConnectors
                 where connector.Iri == iri
                 select connector).ToList();

            if (c.Count != 1)
            {
                throw new Exception($"Found no connector with iri {iri}");
            }

            return c.FirstOrDefault();

        }

        private void ResolvePartOfRelation(List<ParserNode> nodes)
        {
            foreach (var node in nodes)
            {
                if (node.parentId is null) continue;

                // The parent should always be present if there is a parentId
                var parent = GetNode(node.parentId);

                var fromGuid = Guid.NewGuid();
                var toConnector = new ParserRelation
                {
                    Id = $"{ParserGraph.Domain}_{fromGuid}",
                    Iri = $"{ParserGraph.Domain}/{fromGuid}",
                    Name = "Part of Relationship",
                    Relation = RelationType.PartOf,
                    Type = ConnectorType.Input
                };
                node.Terminals.Add(toConnector);

                var toGuid = Guid.NewGuid();
                var fromConnector = new ParserRelation
                {
                    Id = $"{ParserGraph.Domain}_{toGuid}",
                    Iri = $"{ParserGraph.Domain}/{toGuid}",
                    Name = "Part of Relationship",
                    Relation = RelationType.PartOf,
                    Type = ConnectorType.Output
                };
                parent.Terminals.Add(fromConnector);

                ParserConnectors.Add(toConnector);
                ParserConnectors.Add(fromConnector);


                var edge = new ParserEdge
                {
                    FromConnector = fromConnector,
                    ToConnector = toConnector,
                    FromNode = parent,
                    ToNode = node,
                    MasterProjectIri = ParserGraph.Iri,
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
            if (projectId is null)
            {
                throw new Exception("Cannot find the Project Id");
            }

            var label = GetLabel(projectId.ToString());
            var version = GetObjects(projectId.ToString(), "owl:versionInfo").First();
            var domain = GetDomain(projectId.ToString());

            ParserGraph.Iri = projectId.ToString();
            ParserGraph.Label = label;
            ParserGraph.Name = label;
            ParserGraph.Version = version.ToString();
            ParserGraph.Domain = domain;
        }

        public INode GetParent(string nodeId)
        {
            var node = GetOrCreateUriNode(nodeId);
            var hasParent = RdfGraph.CreateUriNode(Resources.hasParent);

            // There should always only be one parent, so we can just get the first element via Single
            var parent = Store.GetTriplesWithSubjectPredicate(node, hasParent).FirstOrDefault()?.Object;

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
                Iri = node.ToString(),
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectIri = ParserGraph.Iri,
                Domain = GetDomain(node.ToString()),
                Terminals = new List<ParserConnector>()

            }).ToList();

            foreach (var node in roots)
            {
                var label = GetLabel(node.Iri);

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

            return resultList.Count == 0 ? null : resultList;
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
                    var sNode = ParserGraph.GetNode(s.ToString());

                    var o = triple.Object;
                    var oNode = ParserGraph.GetNode(o.ToString());

                    switch (relation)
                    {
                        case "Has Location":
                            sNode.HasLocation = oNode;
                            break;
                        case "Part Of":
                            sNode.parentId = oNode.Iri;
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

        public string GetLiteralValue(string subject, string predicate)
        {
            var node = GetObjects(subject, predicate);
            if (node is null) return null;// throw new Exception($"Found nothing for subject= {subject}, predicate= {predicate}");
            if (node.Count == 1 && node.First() is LiteralNode literal) return literal.Value;
            throw new Exception("This is not a literal");
        }

        public List<ParserConnector> GetTerminalsOnNode(string nodeId)
        {
            var connectors = new List<ParserConnector>();

            var inputTerminalNodes = GetObjects(nodeId, Resources.hasInputTerminal);
            var outputTerminalNodes = GetObjects(nodeId, Resources.hasOutputTerminal);

            if (inputTerminalNodes is not null)
            {
                var inputTerminals = inputTerminalNodes.Select(obj => new ParserConnector
                {
                    Id = obj.ToString(),
                    Iri = obj.ToString(),
                    Type = ConnectorType.Input,
                    NodeIri = nodeId,
                    Domain = GetDomain(obj.ToString()),
                    Attributes = GetAttributesOnNode(obj.ToString()),
                    Color = GetLiteralValue(obj.ToString(), BuildIri("mimir", "color")),
                    //Visible = bool.Parse(GetLiteralValue(obj.ToString(), BuildIri("mimir", "visible"))) // TODO: Fix this cast to enum
                }).ToList();

                connectors.AddRange(inputTerminals);
            }
            if (outputTerminalNodes is not null)
            {
                var outputTerminals = outputTerminalNodes.Select(obj => new ParserConnector
                {
                    Id = obj.ToString(),
                    Iri = obj.ToString(),
                    Type = ConnectorType.Output,
                    NodeIri = nodeId,
                    Domain = GetDomain(obj.ToString()),
                    Attributes = GetAttributesOnNode(obj.ToString()),
                    Color = GetLiteralValue(obj.ToString(), BuildIri("mimir", "color")),
                    //Visible = bool.Parse(GetLiteralValue(obj.ToString(), BuildIri("mimir", "visible"))) // TODO: Fix this cast to enum
                }).ToList();

                connectors.AddRange(outputTerminals);
            }

            ParserConnectors.AddRange(connectors);

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

        private (string termCatId, string termTypeId) GetTerminalCategoryIdAndTerminalTypeId(ParserConnector terminal)
        {
            var terminalTypes = GetObjects(terminal.Iri, Resources.type);

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



        private string GetLabel(string iri)
        {
            var node = RdfGraph.GetUriNode(new Uri(iri));
            var labelPredicate = RdfGraph.CreateUriNode(Resources.label);

            var labels = Store.GetTriplesWithSubjectPredicate(node, labelPredicate).Select(t => t.Object).ToList();

            if (labels.Count < 1)
            {
                throw new Exception($"There should always be at least one, 1, label | Iri: {iri}");
            }

            var label = labels.First();
            if (label is ILiteralNode l)
            {
                return l.Value;
            }

            throw new Exception("A label has to be a Literal");
        }

        private string GetDomain(string iri)
        {
            var node = GetOrCreateUriNode(iri);
            var domainPredicate = GetOrCreateUriNode(Resources.domain);

            var domains = Store.GetTriplesWithSubjectPredicate(node, domainPredicate).Select(t => t.Object).ToList();

            if (domains.Count != 1)
            {
                throw new Exception("There should always be exactly one, 1, domain");
            }

            var domain = domains.First();
            if (domain is ILiteralNode l)
            {
                return l.Value;
            }

            throw new Exception("A domain has to be a string");
        }

        private void ResolvePositions(List<ParserNode> nodes)
        {
            foreach (var node in nodes)
            {
                var rdfNode = GetOrCreateUriNode(node.Iri);
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
            var errorPos = block ? $"Block Position {axis}" : $"Position {axis}";

            var predicate = GetOrCreateUriNode(block ? $"http://example.com/mimir#hasBlockPos{axis}" : $"http://example.com/mimir#hasPos{axis}");
            INode pos;
            try
            {
                pos = Store.GetTriplesWithSubjectPredicate(node, predicate).Single().Object;
            }
            catch
            {
                throw new Exception($"Found no {errorPos} on node {node}.");
            }


            if (pos is not ILiteralNode literal) throw new Exception($"Could not find any {errorPos} on node {node}");
            try
            {
                return decimal.Parse(literal.Value.Replace(',', '.'), NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign, NumberFormatInfo.InvariantInfo);
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

            var aspectString = aspectNode.ToString().Split("#")[^1];

            try
            {
                return Enum.Parse<Aspect>(aspectString);
            }
            catch
            {
                return Aspect.NotSet;
            }
        }

        private ParserConnector GetTransportInTerminal(string transportIri)
        {
            var inTerminals = GetObjects(transportIri, Resources.hasInputTerminal);

            if (inTerminals is null) throw new Exception("All transports need one, 1, input terminal");
            if (inTerminals.Count != 1) throw new Exception("A transport should only ever have one, 1, input terminal");

            var inputTerminal = inTerminals.First();

            var inTerminal = new ParserTerminal
            {
                Id = inputTerminal.ToString(),
                Iri = inputTerminal.ToString(),
                Type = ConnectorType.Input
            };



            var (termCatId, termTypeId) = GetTerminalCategoryIdAndTerminalTypeId(inTerminal);

            if (termCatId is not null && termTypeId is not null)
            {
                inTerminal.TerminalCategoryId = termCatId;
                inTerminal.TerminalTypeId = termTypeId;
            }


            var fromConnectors = GetObjects(inTerminal.Iri, Resources.connectedTo);
            if (fromConnectors is null || fromConnectors.Count != 1) throw new Exception($"A terminal can only be connected to one, 1, other terminal | {inTerminal}");

            var fromConnector = fromConnectors.First().ToString();
            inTerminal.FromConnectorIri = fromConnector;
            inTerminal.FromConnectorId = fromConnector;


            var fromNodes = GetSubjects(Resources.hasOutputTerminal, inTerminal.FromConnectorIri);
            if (fromNodes is null || fromNodes.Count != 1) throw new Exception($"A connector can only belong to one, 1, aspect object | {inTerminal}");

            var fromNode = fromNodes.First().ToString();
            inTerminal.Node = GetNode(fromNode);
            inTerminal.Name = GetLabel(inTerminal.Iri);

            inTerminal.Attributes = GetAttributesOnNode(inTerminal.Iri);

            ParserConnectors.Add(inTerminal);
            return inTerminal;
        }

        private ParserConnector GetTransportOutTerminal(string transportIri)
        {
            var outTerminals = GetObjects(transportIri, Resources.hasOutputTerminal);


            if (outTerminals is null) throw new Exception("All transports need one, 1, output terminal");
            if (outTerminals.Count != 1) throw new Exception("A transport should only ever have one, 1, output terminal");

            var outputTerminal = outTerminals.First();

            var outTerminal = new ParserTerminal
            {
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
            if (toConnectors is null) throw new Exception("A transport should always be connected to something");
            if (toConnectors.Count != 1) throw new Exception("A terminal can only be connected to one, 1, other terminal");

            var toConnector = toConnectors.First().ToString();
            outTerminal.ToConnectorIri = toConnector;

            var toNodes = GetSubjects(Resources.hasInputTerminal, outTerminal.ToConnectorIri);
            if (toNodes.Count != 1) throw new Exception("A connector can only belong to one, 1, aspect object");

            var toNode = toNodes.First().ToString();
            outTerminal.Node = GetNode(toNode);

            outTerminal.Name = GetLabel(outTerminal.Iri);

            outTerminal.Attributes = GetAttributesOnNode(outTerminal.Iri);

            ParserConnectors.Add(outTerminal);
            return outTerminal;
        }

        public List<ParserEdge> GetTransports()
        {
            var transports = GetSubjects(Resources.type, Resources.Transport);

            var transportNodes = transports.Select(transport => new ParserTransport
            {
                Iri = transport.ToString(),
                SemanticReference = transport.ToString(),
                IsTransport = true,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                Terminals = new List<ParserConnector>(),
                MasterProjectIri = ParserGraph.Iri
            }).ToList();


            var edges = new List<ParserEdge>();
            foreach (var transport in transportNodes)
            {
                var inTerminal = GetTransportInTerminal(transport.Iri);
                var outTerminal = GetTransportOutTerminal(transport.Iri);

                transport.Name = GetLabel(transport.Iri);

                transport.Aspect = GetAspect(transport.Iri);

                transport.InputTerminal = inTerminal;
                transport.InputTerminalIri = inTerminal.Iri;

                transport.OutputTerminal = outTerminal;
                transport.OutputTerminalIri = outTerminal.Iri;

                var edge = new ParserEdge
                {
                    FromConnector = GetConnector(inTerminal.FromConnectorIri),
                    ToConnector = GetConnector(outTerminal.ToConnectorIri),
                    OutputTerminal = outTerminal,
                    OutputTerminalIri = outTerminal.Iri,
                    InputTerminal = inTerminal,
                    InputTerminalIri = inTerminal.Iri,
                    MasterProjectIri = ParserGraph.Iri,
                    Transport = transport,
                    FromNode = inTerminal.Node,
                    ToNode = outTerminal.Node
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
                Iri = node.ToString(),
                Name = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectIri = ParserGraph.Iri,
                Domain = GetDomain(node.ToString()),
                Symbol = GetSymbol(node.ToString())

            }).ToList();

            foreach (var node in nodes)
            {
                var label = GetLabel(node.Iri);
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

        public List<ParserAttribute> GetAttributesOnNode(string iri)
        {
            var node = GetOrCreateUriNode(iri);
            var domain = GetDomain(iri);

            var hasPhysicalQuantity = GetOrCreateUriNode(BuildIri("lis", "hasPhysicalQuantity"));
            var physicalQuantities = Store.GetTriplesWithSubjectPredicate(node, hasPhysicalQuantity)
                .Select(t => t.Object).ToList();

            var attributes = physicalQuantities.Select(attribute => new ParserAttribute
            {
                Iri = attribute.ToString(),
                Domain = domain,
                Key = GetLabel(attribute.ToString()),
                NodeIri = iri,
                Units = new List<ParserUnit>(),

            }).ToList();


            foreach (var attribute in attributes)
            {
                var attributeTypeId = GetAttributeTypeId(attribute.Iri);
                var datum = GetDatum(attribute.Iri);
                var label = GetLabel(attributeTypeId);
                attribute.AttributeTypeId = GetLastPartOfIri(attributeTypeId).Replace("ID", string.Empty);

                (attribute.QualifierId, attribute.SourceId, attribute.ConditionId, attribute.FormatId) =
                    GetQualifierSourceConditionFormatOnAttribute(datum);

                if (datum is null) continue;

                var unit = new ParserUnit
                {
                    Iri = datum,
                    Name = label,
                    Description = label
                };
                attribute.Units.Add(unit);

                var datumValue = GetDatumValue(datum);
                if (datumValue is not null) attribute.Value = datumValue;
                var selectedUnitId = GetDatumUnit(datum)?.Split("ID")[1];
                if (selectedUnitId is not null) attribute.SelectedUnitId = selectedUnitId;

            }

            return attributes;
        }

        private (string, string, string, string) GetQualifierSourceConditionFormatOnAttribute(string iri)
        {
            var qualifierId =
                GetLastPartOfIri(GetObjects(iri, BuildIri("mimir", "qualifier")).FirstOrDefault()?.ToString())
                    .Replace("Qualifier", string.Empty);
            var sourceId = GetLastPartOfIri(GetObjects(iri, BuildIri("mimir", "source")).FirstOrDefault()?.ToString())
                .Replace("Source", string.Empty);
            var conditionId =
                GetLastPartOfIri(GetObjects(iri, BuildIri("mimir", "condition")).FirstOrDefault()?.ToString())
                    .Replace("Condition", string.Empty);
            var formatId = GetLastPartOfIri(GetObjects(iri, BuildIri("mimir", "format")).FirstOrDefault()?.ToString())
                .Replace("Format", string.Empty);

            return (qualifierId, sourceId, conditionId, formatId);
        }

        private string GetAttributeTypeId(string iri)
        {
            var node = GetOrCreateUriNode(iri);
            var type = GetOrCreateUriNode(BuildIri("rdf", "type"));
            var types = Store.GetTriplesWithSubjectPredicate(node, type).Select(t => t.Object).ToList();
            if (types.Count != 2)
            {
                throw new Exception(
                    $"An attribute should always have two, 2, types. lis:PhysicalQuantity and an attribute type | Iri: {iri}");
            }
            foreach (var t in types.Where(t => !t.ToString().Contains("PhysicalQuantity")))
            {
                return t.ToString();
            }

            throw new Exception($"Did not manage to find the AttributeType | Iri: {iri}");
        }

        private static string GetLastPartOfIri(string iri)
        {
            var parsedIri = new Uri(iri);
            return string.IsNullOrEmpty(parsedIri.Fragment) ? parsedIri.Segments.Last() : parsedIri.Fragment[1..];
        }


        private string GetDatum(string iri)
        {
            var node = GetOrCreateUriNode(iri);
            var qualityQuantifiedAs = GetOrCreateUriNode(BuildIri("lis", "qualityQuantifiedAs"));
            return Store.GetTriplesWithSubjectPredicate(node, qualityQuantifiedAs).FirstOrDefault()?.Object.ToString();
        }

        public string GetDatumValue(string iri)
        {
            var node = GetOrCreateUriNode(iri);
            var datumValue = GetOrCreateUriNode(BuildIri("lis", "datumValue"));
            var value = Store.GetTriplesWithSubjectPredicate(node, datumValue).FirstOrDefault()?.Object;

            if (value is LiteralNode l)
            {
                return l.Value;
            }
            return null;
        }

        public string GetDatumUnit(string iri)
        {
            var node = GetOrCreateUriNode(iri);
            var datumUom = GetOrCreateUriNode(BuildIri("lis", "datumUOM"));
            var unit = Store.GetTriplesWithSubjectPredicate(node, datumUom).FirstOrDefault()?.Object;

            return unit?.ToString();
        }

        public List<ParserNode> GetAllFunctionObjectsWithTerminals()
        {
            var subs = GetFunctionalSystemBlocks();

            var nodes = subs.Select(node => new ParserNode
            {
                Prefix = "",
                Aspect = GetAspect(node.ToString()),
                Iri = node.ToString(),
                SemanticReference = node.ToString(),
                IsRoot = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                Version = "0.0",
                MasterProjectIri = ParserGraph.Iri,
                Domain = GetDomain(node.ToString()),
                Label = GetLabel(node.ToString()),
                Name = GetLabel(node.ToString()),
                parentId = GetParent(node.ToString())?.ToString(),
                Terminals = GetTerminalsOnNode(node.ToString()),
                Attributes = GetAttributesOnNode(node.ToString()),
                Symbol = GetSymbol(node.ToString())

            }).ToList();

            return nodes;
        }

        private string GetRds(string iri)
        {
            var subject = GetOrCreateUriNode(iri);
            var predicate = GetOrCreateUriNode(BuildIri("imf", "rds"));
            var result = Store.GetTriplesWithSubjectPredicate(subject, predicate).SingleOrDefault()?.Object;

            var lastPart = GetLastPartOfIri(result.ToString());


            return lastPart;
        }

        private void InitaliseNamespaces(IDictionary<string, string> namespaces = null)
        {
            _namespaces = new Dictionary<string, string>
            {
                {"owl", "http://www.w3.org/2002/07/owl#"},
                {"rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"},
                {"rdfs", "http://www.w3.org/2000/01/rdf-schema#"},
                {"xml", "http://www.w3.org/XML/1998/namespace"},
                {"xsd", "http://www.w3.org/2001/XMLSchema#"},
                {"imf", "http://example.com/imf#"},
                {"mimir", "http://example.com/mimir#"},
                {"lis", "http://standards.iso.org/iso/15926/part14/"}
            };

            if (namespaces is not null)
            {
                AddNamespaces(namespaces);
            }
        }

        private string BuildIri(string prefix, string suffix, string midfix = "")
        {
            if (_namespaces.TryGetValue(prefix, out var fullNamespace))
            {
                return $"{fullNamespace}{midfix}{suffix}";
            }

            if (ValidPrefix(prefix))
            {
                return $"{prefix}{midfix}{suffix}";
            }

            if (!ValidNamespace(prefix))
            {
                return $"{prefix}/{midfix}{suffix}";
            }

            return $"{prefix}{midfix}{suffix}";
        }

        private bool ValidPrefix(string prefix)
        {
            return prefix[^1] == char.Parse(":") && RdfGraph.NamespaceMap.HasNamespace(prefix);
        }

        private bool ValidNamespace(string iri)
        {
            var validEnd = "#/".ToCharArray();
            return validEnd.Contains(iri[^1]);
        }

        private void AddNamespace(string prefix, string iri)
        {
            prefix = prefix.ToLower();
            if (!ValidNamespace(iri))
            {
                iri = $"{iri}/";
            }

            _namespaces.Add(prefix, iri);
            RdfGraph.NamespaceMap.AddNamespace(prefix, new Uri(iri));
        }

        private void AddNamespaces(IDictionary<string, string> dictionary)
        {
            foreach (var (prefix, iri) in dictionary)
            {
                AddNamespace(prefix, iri);
            }
        }

    }
}