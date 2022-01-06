using System;
using Mb.Models.Exceptions;
using RdfParserModule.Extensions;
using RdfParserModule.Properties;
using RdfParserModule.Repositories;
using VDS.RDF;

namespace RdfParserModule.Services
{
    public class OntologyService : IOntologyService
    {
        private readonly IOntologyRepository _ontologyRepository;

        public OntologyService(IOntologyRepository ontologyRepository)
        {
            _ontologyRepository = ontologyRepository;
        }

        public IGraph GetGraph()
        {
            return _ontologyRepository.Graph;
        }

        public void SetBaseUri(Uri uri)
        {
            if(uri == null)
                return;

            _ontologyRepository.Graph.BaseUri = uri;
        }

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

        public void AssertNode(INode subject, INode predicate, INode obj)
        {
            _ontologyRepository.Graph.Assert(subject, predicate, obj);
        }

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

        public INode CreateLiteralNode(string literal, Uri dataType)
        {
            return _ontologyRepository.Graph.CreateLiteralNode(literal, dataType);
        }

        public INode CreateLiteralNode(string literal)
        {
            return _ontologyRepository.Graph.CreateLiteralNode(literal);
        }

        public string BuildIri(string prefix, string suffix, string midFix = "")
        {
            return _ontologyRepository.BuildIri(prefix, suffix, midFix);
        }

        #region private methods

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

        #endregion

    }
}
