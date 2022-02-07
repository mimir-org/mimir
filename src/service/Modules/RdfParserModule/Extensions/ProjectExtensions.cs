using System;
using Mb.Models.Data;
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

            ontologyService.AssertNode(project.Iri, Resources.label, project.Name, true);
            ontologyService.AssertNode(project.Iri, "owl__versionInfo", project.Version, true);
            ontologyService.AssertNode(project.Iri, Resources.type, Resources.project);
            ontologyService.AssertNode(project.Iri, Resources.type, Resources.IntegratedObject);
            ontologyService.AssertNode(project.Iri, "mimir__domain", project.Domain, true);

            if (!string.IsNullOrEmpty(project.Description))
                ontologyService.AssertNode(project.Iri, Resources.desc, project.Description, true);

        }
    }
}