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
        private readonly IAspectObjectRepository _aspectObjectRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly IMapper _mapper;

        #region Constructors

        public OntologyService(IOntologyRepository ontologyRepository, ILibraryRepository libRepository,
            IAspectObjectRepository aspectObjectRepository, IMapper mapper, IConnectionRepository connectionRepository)
        {
            _ontologyRepository = ontologyRepository;
            _libRepository = libRepository;
            _aspectObjectRepository = aspectObjectRepository;
            _mapper = mapper;
            _connectionRepository = connectionRepository;
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
            BuildAspectObjects(project, applicationData);
            BuildConnections(project, applicationData);
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

            project.ResolveAspectObjects(this, applicationData);
            project.ResolveRelationConnections(this, applicationData);

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
        /// Assert a aspectObject to the graph
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="predicate"></param>
        /// <param name="obj"></param>
        /// <param name="isLiteral"></param>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public void AssertAspectObject(string subject, string predicate, string obj, bool isLiteral = false)
        {
            if (string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(predicate) || string.IsNullOrEmpty(obj))
                return;

            var s = CreateAspectObject(subject);
            var p = CreateAspectObject(predicate);
            var o = CreateAspectObject(obj, isLiteral);

            if (s == null || p == null || o == null)
                throw new ModelBuilderModuleException($"Can't create aspectObjects from data: {subject} - {predicate} - {obj}");
            _ontologyRepository.Graph.Assert(s, p, o);
        }

        /// <summary>
        /// Assert a aspectObject to the graph
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="predicate"></param>
        /// <param name="obj"></param>
        /// <exception cref="ModelBuilderModuleException"></exception>
        public void AssertAspectObject(string subject, string predicate, INode obj)
        {
            if (string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(predicate))
                return;

            var s = CreateAspectObject(subject);
            var p = CreateAspectObject(predicate);

            if (s == null || p == null || obj == null)
                throw new ModelBuilderModuleException($"Can't create aspectObjects from data: {subject} - {predicate} - {obj}");

            _ontologyRepository.Graph.Assert(s, p, obj);
        }

        /// <summary>
        /// Create a literal aspectObject
        /// </summary>
        /// <param name="literal"></param>
        /// <param name="dataType"></param>
        /// <returns></returns>
        public INode CreateLiteralAspectObject(string literal, Uri dataType)
        {
            return _ontologyRepository.Graph.CreateLiteralNode(literal, dataType);
        }

        /// <summary>
        /// Create a literal aspectObject
        /// </summary>
        /// <param name="literal"></param>
        /// <returns></returns>
        public INode CreateLiteralAspectObject(string literal)
        {
            return _ontologyRepository.Graph.CreateLiteralNode(literal);
        }

        /// <summary>
        /// Create a literal aspectObject
        /// </summary>
        /// <param name="literal"></param>
        /// <param name="dataType"></param>
        /// <returns></returns>
        public INode CreateLiteralAspectObject(string literal, string dataType)
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


        public INode GetOrCreateUriAspectObject(string type)
        {
            return _ontologyRepository.Graph.GetOrCreateUriAspectObject(type);
        }

        public IEnumerable<Triple> GetTriplesWithPredicateObject(string predicate, string obj)
        {
            if (string.IsNullOrWhiteSpace(predicate) || string.IsNullOrWhiteSpace(obj))
                throw new NullReferenceException("Can't get triples from null reference objects");

            var p = GetOrCreateUriAspectObject(predicate);
            var o = GetOrCreateUriAspectObject(obj);

            return _ontologyRepository.Store.GetTriplesWithPredicateObject(p, o);
        }

        public IEnumerable<Triple> GetTriplesWithSubjectPredicate(string subject, string predicate)
        {
            if (string.IsNullOrWhiteSpace(predicate) || string.IsNullOrWhiteSpace(subject))
                throw new NullReferenceException("Can't get triples from null reference objects");

            var s = GetOrCreateUriAspectObject(subject);
            var p = GetOrCreateUriAspectObject(predicate);

            return _ontologyRepository.Store.GetTriplesWithSubjectPredicate(s, p);
        }

        public IEnumerable<Triple> GetTriplesWithPredicate(string predicate)
        {
            if (string.IsNullOrWhiteSpace(predicate))
                throw new NullReferenceException("Can't get triples from null reference objects");

            var p = GetOrCreateUriAspectObject(predicate);
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
        /// <param name="project"></param>
        /// <returns></returns>
        private ProjectData GetApplicationData(string project)
        {
            var connections = _connectionRepository.GetAll().Where(x => x.Project == project).ToList();
            var aspectObjects = _aspectObjectRepository.GetAll().Include(x => x.Connectors).AsSplitQuery().Where(x => x.Project == project).ToList();
            var quantityDatums = _libRepository.GetQuantityDatums().Result;
            var units = _libRepository.GetUnits().Result;

            var projectData = new ProjectData
            {
                Connections = _mapper.Map<List<ConnectionAm>>(connections),
                AspectObjects = _mapper.Map<List<AspectObjectAm>>(aspectObjects),
                Units = units,
                QuantityDatums = quantityDatums?.ToDictionary(x => x.Name, x => x)
            };

            _connectionRepository.Context.ChangeTracker.Clear();
            _aspectObjectRepository.Context.ChangeTracker.Clear();

            return projectData;
        }

        /// <summary>
        /// Create a aspectObject
        /// </summary>
        /// <param name="value"></param>
        /// <param name="isLiteral"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderModuleException"></exception>
        private INode CreateAspectObject(string value, bool isLiteral = false)
        {
            if (string.IsNullOrWhiteSpace(value))
                return null;

            return isLiteral
                ? _ontologyRepository.Graph.CreateLiteralNode(value)
                : _ontologyRepository.Graph.GetOrCreateUriAspectObject(value);
        }

        /// <summary>
        /// Build project aspectObjects
        /// </summary>
        /// <param name="project"></param>
        /// <param name="projectData">Record of ICollections</param>
        private void BuildAspectObjects(Project project, ProjectData projectData)
        {
            if (project.AspectObjects == null || !project.AspectObjects.Any())
                return;

            foreach (var aspectObject in project.AspectObjects)
            {
                aspectObject.AssertAspectObject(project, this, projectData);

                if (aspectObject.Attributes != null && aspectObject.Attributes.Any())
                {
                    foreach (var attribute in aspectObject.Attributes)
                    {
                        attribute.AssertAttribute(aspectObject.Id, this);
                        attribute.AssertAttributeValue(this, projectData);
                    }
                }

                if (aspectObject.Connectors != null && aspectObject.Connectors.Any())
                {
                    foreach (var connector in aspectObject.Connectors)
                    {
                        connector.AssertConnector(this, aspectObject.Id, projectData, null, DefaultFlowDirection.NotSet);
                    }
                }
            }
        }

        /// <summary>
        /// Build project connections
        /// </summary>
        /// <param name="project"></param>
        /// <param name="projectData">Record of ICollections</param>
        private void BuildConnections(Project project, ProjectData projectData)
        {
            if (project.Connections == null || !project.Connections.Any())
                return;

            foreach (var connection in project.Connections)
            {
                connection.AssertConnection(this, projectData);
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