using System;
using System.Linq;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class ProjectExtensions
    {
        public static void AssertGraph(this Project project, IOntologyService ontologyService)
        {
            if (project == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null in Project.AssertGraph");

            ontologyService.SetBaseUri(new Uri(project.Iri));

            ontologyService.AssertNode(project.Iri, Resources.Label, project.Name, true);
            ontologyService.AssertNode(project.Iri, Resources.Version, project.Version, true);
            ontologyService.AssertNode(project.Iri, Resources.Type, Resources.Project);
            ontologyService.AssertNode(project.Iri, Resources.Type, Resources.IntegratedObject);
            ontologyService.AssertNode(project.Iri, Resources.Domain, project.Domain, true);
            ontologyService.AssertNode(project.Iri, Resources.HasOwner, project.ProjectOwner, true);
            ontologyService.AssertNode(project.Iri, Resources.UpdatedBy, project.UpdatedBy, true);
            ontologyService.AssertNode(project.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{project.Updated}", Resources.DateTime));

            if (!string.IsNullOrEmpty(project.Description))
                ontologyService.AssertNode(project.Iri, Resources.Desc, project.Description, true);

        }

        public static void ResolveProjectInformation(this ProjectAm project, IOntologyService ontologyService)
        {
            var subject = ontologyService.GetTriplesWithPredicateObject(Resources.Type, Resources.IntegratedObject)?.Select(t => t.Subject).SingleOrDefault();

            if (subject == null)
                throw new NullReferenceException("Cannot find the project from rdf file");

            project.Iri = subject.ToString();
            project.Name = ontologyService.GetValue(project.Iri, Resources.Label);
            project.Version = ontologyService.GetValue(project.Iri, Resources.Version, false);
            project.IsSubProject = false; // TODO: Resolve sub project settings
            project.Description = ontologyService.GetValue(project.Iri, Resources.Desc, false);
            project.ProjectOwner = ontologyService.GetValue(project.Iri, Resources.HasOwner, false);
            project.UpdatedBy = ontologyService.GetValue(project.Iri, Resources.UpdatedBy, false);
            project.Updated = ontologyService.GetDateTimeValue(project.Iri, Resources.LastUpdated, false);
        }

        public static void ResolveRootNodes(this ProjectAm project, IOntologyService ontologyService)
        {
            var rootNodes = ontologyService.GetTriplesWithPredicate(Resources.IsAspectOf).Select(t => t.Subject).ToList();
            
            if (rootNodes == null)
                throw new NullReferenceException("Root nodes is missing.");

            foreach (var n in rootNodes)
            {
                var node = new NodeAm();
                node.ResolveNode(ontologyService, n.ToString(), project.Iri);
            }

            //project.Iri = subject.ToString();
            //project.Name = ontologyService.GetValue(project.Iri, Resources.Label);
            //project.Version = ontologyService.GetValue(project.Iri, Resources.Version, false);
            //project.IsSubProject = false; // TODO: Resolve sub project settings
            //project.Description = ontologyService.GetValue(project.Iri, Resources.Desc, false);
            //project.ProjectOwner = ontologyService.GetValue(project.Iri, Resources.HasOwner, false);
            //project.UpdatedBy = ontologyService.GetValue(project.Iri, Resources.UpdatedBy, false);
            //project.Updated = ontologyService.GetDateTimeValue(project.Iri, Resources.LastUpdated, false);
        }
    }
}