using System;
using System.Linq;
using System.Text;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using RdfParserModule.Extensions;
using RdfParserModule.Properties;
using RdfParserModule.Repositories;
using VDS.RDF;
using VDS.RDF.Writing;

namespace RdfParserModule.Services
{
    public class OntologyService : IOntologyService
    {
        private readonly IOntologyRepository _ontologyRepository;
        private readonly ILibRepository _libRepository;

        #region Constructors

        public OntologyService(IOntologyRepository ontologyRepository, ILibRepository libRepository)
        {
            _ontologyRepository = ontologyRepository;
            _libRepository = libRepository;
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

            project.AssertGraph(this);
            BuildNodes(project);
            BuildEdges(project);
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
            if(uri == null)
                return;

            _ontologyRepository.Graph.BaseUri = uri;
        }

        /// <summary>
        /// Assert a transmitter to the graph 
        /// </summary>
        /// <param name="iri"></param>
        /// <param name="terminalCategoryId"></param>
        /// <param name="terminalName"></param>
        public void AssertTransmitter(string iri, string terminalCategoryId, string terminalName)
        {
            if (string.IsNullOrEmpty(iri) || string.IsNullOrEmpty(terminalCategoryId) || string.IsNullOrEmpty(terminalName))
                return;

            var node = _ontologyRepository.Graph.GetOrCreateUriNode(iri);
            var type = _ontologyRepository.Graph.GetOrCreateUriNode(Resources.type);
            var subclass = _ontologyRepository.Graph.GetOrCreateUriNode(Resources.subClassOf);
            var transmitterIri = _ontologyRepository.BuildIri("eq", $"Transmitter-{terminalCategoryId}-{terminalName}");
            var transmitter = _ontologyRepository.Graph.GetOrCreateUriNode(transmitterIri);

            _ontologyRepository.Graph.Assert(new Triple(transmitter, subclass, _ontologyRepository.Graph.GetOrCreateUriNode(_ontologyRepository.BuildIri("mimir", "Transmitter"))));
            _ontologyRepository.Graph.Assert(new Triple(node, type, transmitter));
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
        public void AssertNode(INode subject, INode predicate, INode obj)
        {
            if (subject == null || predicate == null || obj == null)
                throw new ModelBuilderModuleException($"Can't create nodes from data: Subject: {subject == null} - Predicate: {predicate == null} - Object {obj == null}");
            _ontologyRepository.Graph.Assert(subject, predicate, obj);
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
        /// Build Iri
        /// </summary>
        /// <param name="prefix"></param>
        /// <param name="suffix"></param>
        /// <param name="midFix"></param>
        /// <returns></returns>
        public string BuildIri(string prefix, string suffix, string midFix = "")
        {
            return _ontologyRepository.BuildIri(prefix, suffix, midFix);
        }

        #endregion

        #region private methods

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

            var split = value.Split("__", StringSplitOptions.RemoveEmptyEntries);
            return split.Length switch
            {
                1 => isLiteral ? _ontologyRepository.Graph.CreateLiteralNode(value) : _ontologyRepository.Graph.GetOrCreateUriNode(value),
                2 => _ontologyRepository.Graph.GetOrCreateUriNode(_ontologyRepository.BuildIri(split[0], split[1])),
                3 => _ontologyRepository.Graph.GetOrCreateUriNode(_ontologyRepository.BuildIri(split[0], split[2], split[1])),
                _ => throw new ModelBuilderModuleException("There is only support for maximum 3 segments in create uri")
            };
        }

        /// <summary>
        /// Build project nodes
        /// </summary>
        /// <param name="project"></param>
        private void BuildNodes(Project project)
        {
            if (project.Nodes == null || !project.Nodes.Any())
                return;

            foreach (var node in project.Nodes)
            {
                node.AssertNode(project, this, _libRepository);

                if (node.Attributes != null && node.Attributes.Any())
                {
                    foreach (var attribute in node.Attributes)
                    {
                        attribute.AssertAttribute(node.Iri, this);
                        attribute.AssertAttributeValue(this, _libRepository);
                    }
                }

                if (node.Connectors != null && node.Connectors.Any())
                {
                    foreach (var connector in node.Connectors)
                    {
                        connector.AssertConnector(this, _libRepository);
                    }
                }
            }
        }

        /// <summary>
        /// Build project edges
        /// </summary>
        /// <param name="project"></param>
        private void BuildEdges(Project project)
        {
            if (project.Edges == null || !project.Edges.Any())
                return;

            foreach (var edge in project.Edges)
            {
                edge.AssertEdge(this);

                if (edge.Transport?.Attributes != null && edge.Transport.Attributes.Any())
                {
                    foreach (var attribute in edge.Transport.Attributes)
                    {
                        attribute.AssertAttribute(edge.Transport.Iri, this);
                        attribute.AssertAttributeValue(this, _libRepository);
                    }
                }

                if (edge.Interface?.Attributes != null && edge.Interface.Attributes.Any())
                {
                    foreach (var attribute in edge.Interface.Attributes)
                    {
                        attribute.AssertAttribute(edge.Interface.Iri, this);
                        attribute.AssertAttributeValue(this, _libRepository);
                    }
                }
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
