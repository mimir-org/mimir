using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
    public static class ProjectExtensions
    {
        /// <summary>
        /// Assert data from project to graph
        /// </summary>
        /// <param name="project">Extended project</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <exception cref="NullReferenceException">Throws if project or ontology service is null</exception>
        public static void AssertGraph(this Project project, IOntologyService ontologyService)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

            ontologyService.SetBaseUri(new Uri(project.Iri));

            ontologyService.AssertNode(project.Iri, Resources.Label, project.Name, true);
            ontologyService.AssertNode(project.Iri, Resources.Version, project.Version, true);
            ontologyService.AssertNode(project.Iri, Resources.Type, Resources.Project);
            ontologyService.AssertNode(project.Iri, Resources.Type, Resources.IntegratedObject);
            ontologyService.AssertNode(project.Iri, Resources.Domain, project.Domain, true);
            ontologyService.AssertNode(project.Iri, Resources.HasOwner, project.ProjectOwner, true);

            if (!string.IsNullOrWhiteSpace(project.UpdatedBy))
                ontologyService.AssertNode(project.Iri, Resources.UpdatedBy, project.UpdatedBy, true);

            if (project.Updated != null)
                ontologyService.AssertNode(project.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{project.Updated?.ToString("u")}", Resources.DateTime));

            if (!string.IsNullOrEmpty(project.Description))
                ontologyService.AssertNode(project.Iri, Resources.Desc, project.Description, true);
        }

        /// <summary>
        /// Resolve project information
        /// </summary>
        /// <param name="project">Extended project</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <exception cref="NullReferenceException">Throws if project or ontology service is null</exception>
        /// <exception cref="MimirorgBadRequestException">Throws if project or ontology service is null</exception>
        public static void ResolveProjectInformation(this ProjectAm project, IOntologyService ontologyService)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

            var subject = ontologyService.GetTriplesWithPredicateObject(Resources.Type, Resources.IntegratedObject)
                ?.Select(t => t.Subject).SingleOrDefault();

            if (subject == null)
                throw new MimirorgBadRequestException("Cannot find the project from rdf file.");

            project.Iri = subject.ToString();
            project.Name = ontologyService.GetValue(project.Iri, Resources.Label);
            project.Version = ontologyService.GetValue(project.Iri, Resources.Version, false);
            project.IsSubProject = false; // TODO: Resolve sub project settings
            project.Description = ontologyService.GetValue(project.Iri, Resources.Desc, false);
            project.ProjectOwner = ontologyService.GetValue(project.Iri, Resources.HasOwner, false);
            project.UpdatedBy = ontologyService.GetValue(project.Iri, Resources.UpdatedBy, false);
            project.Updated = ontologyService.GetDateTimeValue(project.Iri, Resources.LastUpdated, false);
        }

        /// <summary>
        /// Resolve project aspect nodes
        /// </summary>
        /// <param name="project">Extended project</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <param name="projectData">Existing project data, used to resolve missing RDF data</param>
        /// <exception cref="NullReferenceException">Throws if project or ontology service is null</exception>
        /// <exception cref="MimirorgBadRequestException">Throws if missing root nodes in rdf file, or bad rdf declaration</exception>
        public static void ResolveNodes(this ProjectAm project, IOntologyService ontologyService, ProjectData projectData)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

            project.Nodes = new List<NodeAm>();

            // Resolve root nodes
            var rootNodes = ontologyService.GetTriplesWithPredicate(Resources.IsAspectOf).Select(t => t.Subject).ToList();

            if (rootNodes == null || !rootNodes.Any())
                throw new MimirorgBadRequestException("Cannot find the root nodes in rdf file.");

            foreach (var n in rootNodes)
            {
                var node = new NodeAm();
                node.ResolveNode(ontologyService, n.ToString(), project.Iri, true, projectData);
                project.Nodes.Add(node);
            }

            // Resolve functional system blocks
            var nodes = ontologyService.GetTriplesWithPredicateObject(Resources.Type, Resources.FSB).Select(t => t.Subject).ToList();
            if (!nodes.Any())
                return;

            foreach (var n in nodes)
            {
                var node = new NodeAm();
                node.ResolveNode(ontologyService, n.ToString(), project.Iri, false, projectData);
                project.Nodes.Add(node);
            }
        }

        /// <summary>
        /// Resolve transports
        /// </summary>
        /// <param name="project">Extended project</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <param name="projectData">Existing project data, used to resolve missing RDF data</param>
        /// <exception cref="NullReferenceException">Throws if ontology service or project is null</exception>
        public static void ResolveTransports(this ProjectAm project, IOntologyService ontologyService, ProjectData projectData)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

            var transportNodes = ontologyService.GetTriplesWithPredicateObject(Resources.Type, Resources.Transport).Select(x => x.Subject).ToList();

            project.Edges ??= new List<EdgeAm>();
            foreach (var t in transportNodes)
            {
                var transport = new TransportAm();
                var edge = transport.ResolveTransport(ontologyService, project, t.ToString(), projectData);
                project.Edges.Add(edge);
            }
        }

        /// <summary>
        /// Resolve interfaces
        /// </summary>
        /// <param name="project">Extended project</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <param name="projectData">Existing project data, used to resolve missing RDF data</param>
        /// <exception cref="NullReferenceException">Throws if ontology service or project is null</exception>
        public static void ResolveInterfaces(this ProjectAm project, IOntologyService ontologyService, ProjectData projectData)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

            var interfaceNodes = ontologyService.GetTriplesWithPredicateObject(Resources.Type, Resources.Interface).Select(x => x.Subject).ToList();

            project.Edges ??= new List<EdgeAm>();
            foreach (var i in interfaceNodes)
            {
                var inter = new InterfaceAm();
                var edge = inter.ResolveInterface(ontologyService, project, i.ToString(), projectData);
                project.Edges.Add(edge);
            }
        }

        /// <summary>
        /// Resolve relation edges
        /// </summary>
        /// <param name="project">Extended project</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <param name="projectData">Existing project data, used to resolve missing RDF data</param>
        /// <exception cref="NullReferenceException">Throws if ontology service or project is null</exception>
        public static void ResolveRelationEdges(this ProjectAm project, IOntologyService ontologyService, ProjectData projectData)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

            // PartOf relations
            var partOfRelations = ontologyService.GetTriplesWithPredicate(Resources.HasParent)
                .Select(x => new RelationEdge
                {
                    ParentIri = x.Object.ToString(), ChildIri = x.Subject.ToString(), RelationType = RelationType.PartOf
                }).ToList();

            // FullFilledBy relations
            var fullFilledByRelations = ResolveRelations(RelationType.FulfilledBy, ontologyService);

            // HasLocation relations
            var hasLocationRelations = ResolveRelations(RelationType.HasLocation, ontologyService);

            var relations = partOfRelations.Union(fullFilledByRelations).Union(hasLocationRelations).ToList();
            project.Edges ??= new List<EdgeAm>();

            foreach (var relation in relations)
            {
                var edge = new EdgeAm();
                edge.ResolveEdge(ontologyService, project, relation, projectData);
                project.Edges.Add(edge);
            }
        }

        /// <summary>
        /// Resolve relations
        /// </summary>
        /// <param name="relationType">Relation type</param>
        /// <param name="ontologyService">Ontology service</param>
        /// <returns>A list of relation edges information</returns>
        private static IEnumerable<RelationEdge> ResolveRelations(RelationType relationType, IOntologyService ontologyService)
        {
            return ontologyService
                .GetTriplesWithPredicate($"imf:{relationType.ToString().LowerCaseFirstCharacter()}")
                .Select(x => new RelationEdge
                {
                    ParentIri = x.Subject.ToString(), ChildIri = x.Object.ToString(), RelationType = relationType
                }).ToList();
        }
    }
}