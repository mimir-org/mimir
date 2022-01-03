using System;
using Mb.Models.Data;
using RdfParserModule.Properties;
using RdfParserModule.Repositories;
using VDS.RDF;

namespace RdfParserModule.Extensions
{
    public static class ProjectExtensions
    {
        public static void AssertGraph(this Project project, IGraph graph, IOntologyRepository ontologyRepository)
        {
            if(project == null || graph == null || ontologyRepository == null)
                throw new NullReferenceException($"{nameof(project)},{nameof(graph)} or {nameof(ontologyRepository)} is null in Project.AssertGraph");

            graph.BaseUri = new Uri(project.Iri);

            // Subjects
            var projectNode = project.Iri.GetOrCreateUriNode(graph);
            
            // Predicates
            var labelPredicate = Resources.label.GetOrCreateUriNode(graph);
            var versionPredicate = ontologyRepository.BuildIri("owl", "versionInfo").GetOrCreateUriNode(graph);
            var typePredicate = Resources.type.GetOrCreateUriNode(graph);
            var domainPredicate = ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(graph);

            // Objects
            var projectNameObject = project.Name.GetOrCreateLiteralNode(graph);
            var projectVersionObject = project.Version.GetOrCreateLiteralNode(graph);
            var mimirProjectTypeObject = Resources.project.GetOrCreateUriNode(graph);
            var imfIntegratedObject = Resources.IntegratedObject.GetOrCreateUriNode(graph);
            var domainObject = project.Domain.GetOrCreateLiteralNode(graph);

            // Asserts
            graph.Assert(new Triple(projectNode, labelPredicate, projectNameObject));
            graph.Assert(new Triple(projectNode, versionPredicate, projectVersionObject));
            graph.Assert(new Triple(projectNode, typePredicate, mimirProjectTypeObject));
            graph.Assert(new Triple(projectNode, typePredicate, imfIntegratedObject));
            graph.Assert(new Triple(projectNode, domainPredicate, domainObject));

            if (!string.IsNullOrEmpty(project.Description))
            {
                var descriptionPredicate = Resources.desc.GetOrCreateUriNode(graph);
                var descriptionObject = project.Description.GetOrCreateLiteralNode(graph);
                graph.Assert(new Triple(projectNode, descriptionPredicate, descriptionObject));
            }
        }
    }
}
