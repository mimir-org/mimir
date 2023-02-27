using System.Globalization;
using System.Text;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mimirorg.Common.Exceptions;
using Microsoft.EntityFrameworkCore;
using ModelBuilder.Rdf.Extensions;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Repositories;
using VDS.RDF;
using StringWriter = VDS.RDF.Writing.StringWriter;
using Mb.Models.Application;

namespace ModelBuilder.Rdf.Services
{
    public class OntologyService : IOntologyService
    {
        private readonly IOntologyRepository _ontologyRepository;
        private readonly ILibraryRepository _libRepository;
        private readonly INodeRepository _nodeRepository;
        private readonly IEdgeRepository _edgeRepository;
        private readonly IMapper _mapper;

        #region Constructors

        public OntologyService(IOntologyRepository ontologyRepository, ILibraryRepository libRepository,
            INodeRepository nodeRepository, IMapper mapper, IEdgeRepository edgeRepository)
        {
            _ontologyRepository = ontologyRepository;
            _libRepository = libRepository;
            _nodeRepository = nodeRepository;
            _mapper = mapper;
            _edgeRepository = edgeRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Build RDF graph from Mimir project
        /// </summary>
        /// <param name="project"></param>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public void BuildProject(Project project)
        {
            if (project == null)
                throw new ModelBuilderModuleException("OntologyService can't build project. Project is null");

            var applicationData = GetApplicationData(project.Iri);

            _ontologyRepository.LoadData(new Graph());
            project.AssertGraph(this);
            BuildNodes(project, applicationData);
            BuildEdges(project, applicationData);
        }

        /// <summary>
        /// Build 
        /// </summary>
        /// <param name="rdf"></param>
        /// <returns></returns>
        public ProjectAm BuildProject(IGraph rdf)
        {
            _ontologyRepository.LoadData(rdf);

            var project = new ProjectAm();
            project.ResolveProjectInformation(this);

            if (string.IsNullOrWhiteSpace(project.Iri))
                throw new InvalidDataException("Can't parse a project with missing project IRI");

            var applicationData = GetApplicationData(project.Iri);

            project.ResolveNodes(this, applicationData);
            project.ResolveRelationEdges(this, applicationData);

            return project;
        }

        /// <summary>
        /// Convert RDF graph to bytes
        /// Call BuildProject before this method
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public byte[] GetBytes<T>() where T : IRdfWriter, new()
        {
            var graphString = RdfToString<T>();
            var bytes = Encoding.UTF8.GetBytes(graphString);
            return bytes;
        }

        /// <summary>
        /// Set the graph base uri
        /// </summary>
        /// <param name="uri"></param>
        public void SetBaseUri(Uri uri)
        {
            if (uri == null)
                return;

            _ontologyRepository.Graph.BaseUri = uri;
        }

        /// <summary>
        /// Assert a node to the graph
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="predicate"></param>
        /// <param name="obj"></param>
        /// <param name="isLiteral"></param>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public void AssertNode(string subject, string predicate, string obj, bool isLiteral = false)
        {
            if (string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(predicate) || string.IsNullOrEmpty(obj))
                return;

            var s = CreateNode(subject);
            var p = CreateNode(predicate);
            var o = CreateNode(obj, isLiteral);

            if (s == null || p == null || o == null)
                throw new ModelBuilderModuleException($"Can't create nodes from data: {subject} - {predicate} - {obj}");
            _ontologyRepository.Graph.Assert(s, p, o);
        }

        /// <summary>
        /// Assert a node to the graph
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="predicate"></param>
        /// <param name="obj"></param>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public void AssertNode(string subject, string predicate, INode obj)
        {
            if (string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(predicate))
                return;

            var s = CreateNode(subject);
            var p = CreateNode(predicate);

            if (s == null || p == null || obj == null)
                throw new ModelBuilderModuleException($"Can't create nodes from data: {subject} - {predicate} - {obj}");

            _ontologyRepository.Graph.Assert(s, p, obj);
        }

        /// <summary>
        /// Create a literal node
        /// </summary>
        /// <param name="literal"></param>
        /// <param name="dataType"></param>
        /// <returns></returns>
        public INode CreateLiteralNode(string literal, Uri dataType)
        {
            return _ontologyRepository.Graph.CreateLiteralNode(literal, dataType);
        }

        /// <summary>
        /// Create a literal node
        /// </summary>
        /// <param name="literal"></param>
        /// <returns></returns>
        public INode CreateLiteralNode(string literal)
        {
            return _ontologyRepository.Graph.CreateLiteralNode(literal);
        }

        /// <summary>
        /// Create a literal node
        /// </summary>
        /// <param name="literal"></param>
        /// <param name="dataType"></param>
        /// <returns></returns>
        public INode CreateLiteralNode(string literal, string dataType)
        {
            var uri = _ontologyRepository.BuildUri(dataType);
            return _ontologyRepository.Graph.CreateLiteralNode(literal, uri);
        }

        /// <summary>
        /// Build uri from prefix or iri string
        /// </summary>
        /// <param name="value"></param>
        /// <returns>URI</returns>
        public Uri BuildUri(string value)
        {
            return _ontologyRepository.BuildUri(value);
        }


        public INode GetOrCreateUriNode(string type)
        {
            return _ontologyRepository.Graph.GetOrCreateUriNode(type);
        }

        public IEnumerable<Triple> GetTriplesWithPredicateObject(string predicate, string obj)
        {
            if (string.IsNullOrWhiteSpace(predicate) || string.IsNullOrWhiteSpace(obj))
                throw new NullReferenceException("Can't get triples from null reference objects");

            var p = GetOrCreateUriNode(predicate);
            var o = GetOrCreateUriNode(obj);

            return _ontologyRepository.Store.GetTriplesWithPredicateObject(p, o);
        }

        public IEnumerable<Triple> GetTriplesWithSubjectPredicate(string subject, string predicate)
        {
            if (string.IsNullOrWhiteSpace(predicate) || string.IsNullOrWhiteSpace(subject))
                throw new NullReferenceException("Can't get triples from null reference objects");

            var s = GetOrCreateUriNode(subject);
            var p = GetOrCreateUriNode(predicate);

            return _ontologyRepository.Store.GetTriplesWithSubjectPredicate(s, p);
        }

        public IEnumerable<Triple> GetTriplesWithPredicate(string predicate)
        {
            if (string.IsNullOrWhiteSpace(predicate))
                throw new NullReferenceException("Can't get triples from null reference objects");

            var p = GetOrCreateUriNode(predicate);
            return _ontologyRepository.Store.GetTriplesWithPredicate(p);
        }

        public string GetValue(string iri, string predicate, bool allowMany = true, bool urlEncode = true)
        {
            var objects = GetTriplesWithSubjectPredicate(iri, predicate).Select(t => t.Object).ToList();

            if (!objects.Any())
                return null;

            if (allowMany && objects.Count < 1)
                throw new InvalidDataException($"There should always be at least one, 1, {predicate} | Iri: {iri}");

            if (!allowMany && objects.Count != 1)
                throw new InvalidDataException($"There should always be exactly one, 1, {predicate} | Iri: {iri}");

            return objects.First()?.ResolveValue(urlEncode);
        }

        public DateTime GetDateTimeValue(string iri, string predicate, bool allowMany = true)
        {
            var objects = GetTriplesWithSubjectPredicate(iri, predicate).Select(t => t.Object).ToList();

            if (!objects.Any())
                return DateTime.MinValue;

            if (allowMany && objects.Count < 1)
                throw new InvalidDataException($"There should always be at least one, 1, {predicate} | Iri: {iri}");

            if (!allowMany && objects.Count != 1)
                throw new InvalidDataException($"There should always be exactly one, 1, {predicate} | Iri: {iri}");

            var value = objects.First()?.ResolveValue(false);

            if (!DateTime.TryParse(value, out var data))
                throw new InvalidDataException($"{predicate} should always be a datetime | Iri: {iri}");

            return data;
        }

        public decimal GetDecimalValue(string iri, string predicate, bool allowMany = true)
        {
            var objects = GetTriplesWithSubjectPredicate(iri, predicate).Select(t => t.Object).ToList();

            if (!objects.Any())
                return 0.0m;

            if (allowMany && objects.Count < 1)
                throw new InvalidDataException($"There should always be at least one, 1, {predicate} | Iri: {iri}");

            if (!allowMany && objects.Count != 1)
                throw new InvalidDataException($"There should always be exactly one, 1, {predicate} | Iri: {iri}");

            var value = objects.First()?.ResolveValue(false);

            if (!decimal.TryParse(value?.Replace(',', '.'),
                    NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign, NumberFormatInfo.InvariantInfo,
                    out var data))
                throw new InvalidDataException($"{predicate} should always point to a decimal value | Iri: {iri}");

            return data;
        }

        public int? GetIntValue(string iri, string predicate, bool allowMany = true)
        {
            var objects = GetTriplesWithSubjectPredicate(iri, predicate).Select(t => t.Object).ToList();

            if (!objects.Any())
                return null;

            if (allowMany && objects.Count < 1)
                throw new InvalidDataException($"There should always be at least one, 1, {predicate} | Iri: {iri}");

            if (!allowMany && objects.Count != 1)
                throw new InvalidDataException($"There should always be exactly one, 1, {predicate} | Iri: {iri}");

            var value = objects.First()?.ResolveValue(false);
            if (!int.TryParse(value?.Trim(), out var data))
                throw new InvalidDataException($"{predicate} should always point to a integer value | Iri: {iri}");

            return data;
        }

        public T GetEnumValue<T>(string iri, string predicate, bool allowMany = true) where T : struct
        {
            var objects = GetTriplesWithSubjectPredicate(iri, predicate).Select(t => t.Object).ToList();

            if (!objects.Any())
                return default;

            if (allowMany && objects.Count < 1)
                throw new InvalidDataException($"There should always be at least one, 1, {predicate} | Iri: {iri}");

            if (!allowMany && objects.Count != 1)
                throw new InvalidDataException($"There should always be exactly one, 1, {predicate} | Iri: {iri}");

            var value = objects.First()?.ResolveValue(false);
            if (!Enum.TryParse<T>(value, true, out var val))
                throw new InvalidDataException($"{predicate} should always point to an enum value | Iri: {iri}");

            return val;
        }

        #endregion

        #region private methods

        /// <summary>
        /// Get ProjectData (Record of ICollections)
        /// </summary>
        /// <param name="projectIri"></param>
        /// <returns></returns>
        private ProjectData GetApplicationData(string projectIri)
        {
            var edges = _edgeRepository.GetAll().Where(x => x.ProjectIri == projectIri).ToList();
            var nodes = _nodeRepository.GetAll().Include(x => x.Connectors).AsSplitQuery().Where(x => x.ProjectIri == projectIri).ToList();
            var quantityDatums = _libRepository.GetQuantityDatums().Result;
            var units = _libRepository.GetUnits().Result;

            var projectData = new ProjectData
            {
                Edges = _mapper.Map<List<EdgeAm>>(edges),
                Nodes = _mapper.Map<List<NodeAm>>(nodes),
                Units = units,
                QuantityDatums = quantityDatums?.ToDictionary(x => x.Name, x => x)
            };

            _edgeRepository.Context.ChangeTracker.Clear();
            _nodeRepository.Context.ChangeTracker.Clear();

            return projectData;
        }

        /// <summary>
        /// Create a node
        /// </summary>
        /// <param name="value"></param>
        /// <param name="isLiteral"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderModuleException"></exception>
        private INode CreateNode(string value, bool isLiteral = false)
        {
            if (string.IsNullOrWhiteSpace(value))
                return null;

            return isLiteral
                ? _ontologyRepository.Graph.CreateLiteralNode(value)
                : _ontologyRepository.Graph.GetOrCreateUriNode(value);
        }

        /// <summary>
        /// Build project nodes
        /// </summary>
        /// <param name="project"></param>
        /// <param name="projectData">Record of ICollections</param>
        private void BuildNodes(Project project, ProjectData projectData)
        {
            if (project.Nodes == null || !project.Nodes.Any())
                return;

            foreach (var node in project.Nodes)
            {
                node.AssertNode(project, this, projectData);

                if (node.Attributes != null && node.Attributes.Any())
                {
                    foreach (var attribute in node.Attributes)
                    {
                        attribute.AssertAttribute(node.Iri, this);
                        attribute.AssertAttributeValue(this, projectData);
                    }
                }

                if (node.Connectors != null && node.Connectors.Any())
                {
                    foreach (var connector in node.Connectors)
                    {
                        connector.AssertConnector(this, node.Iri, projectData, null, DefaultFlowDirection.NotSet);
                    }
                }
            }
        }

        /// <summary>
        /// Build project edges
        /// </summary>
        /// <param name="project"></param>
        /// <param name="projectData">Record of ICollections</param>
        private void BuildEdges(Project project, ProjectData projectData)
        {
            if (project.Edges == null || !project.Edges.Any())
                return;

            foreach (var edge in project.Edges)
            {
                edge.AssertEdge(this, projectData);
            }
        }

        /// <summary>
        /// Convert graph to a string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        private string RdfToString<T>() where T : IRdfWriter, new()
        {
            var writer = new T();
            return StringWriter.Write(_ontologyRepository.Graph, writer);
        }

        #endregion
    }
}