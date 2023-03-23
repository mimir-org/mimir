using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions;

public static class ProjectExtensions
{
    /// <summary>
    /// Assert data from project to graph
    /// </summary>
    /// <param name="project">Extended project</param>
    /// <param name="ontologyService">Ontology service</param>
    /// <exception cref="NullReferenceException">Throws if project or ontology service is null</exception>
    public static void AssertGraph(this ProjectDm project, IOntologyService ontologyService)
    {
        if (project == null || ontologyService == null)
            throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

        ontologyService.SetBaseUri(new Uri(project.Id));

        ontologyService.AssertAspectObject(project.Id, Resources.Label, project.Name, true);
        ontologyService.AssertAspectObject(project.Id, Resources.Version, project.Version, true);
        ontologyService.AssertAspectObject(project.Id, Resources.Type, Resources.Project);
        ontologyService.AssertAspectObject(project.Id, Resources.Type, Resources.IntegratedObject);
        ontologyService.AssertAspectObject(project.Id, Resources.Domain, project.Domain, true);
        ontologyService.AssertAspectObject(project.Id, Resources.HasOwner, project.CreatedBy, true);

        if (!string.IsNullOrWhiteSpace(project.UpdatedBy))
            ontologyService.AssertAspectObject(project.Id, Resources.UpdatedBy, project.UpdatedBy, true);

        if (project.Updated != null)
            ontologyService.AssertAspectObject(project.Id, Resources.LastUpdated, ontologyService.CreateLiteralAspectObject($"{project.Updated?.ToString("u")}", Resources.DateTime));

        if (!string.IsNullOrEmpty(project.Description))
            ontologyService.AssertAspectObject(project.Id, Resources.Desc, project.Description, true);
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

        project.Id = subject.ToString();
        project.Name = ontologyService.GetValue(project.Id, Resources.Label);
        //project.Version = ontologyService.GetValue(project.Id, Resources.Version, false);
        project.IsSubProject = false; // TODO: Resolve sub project settings
        project.Description = ontologyService.GetValue(project.Id, Resources.Desc, false);
        //project.CreatedBy = ontologyService.GetValue(project.Id, Resources.HasOwner, false);
        //project.UpdatedBy = ontologyService.GetValue(project.Id, Resources.UpdatedBy, false);
        //project.Updated = ontologyService.GetDateTimeValue(project.Id, Resources.LastUpdated, false);
    }

    /// <summary>
    /// Resolve project aspect aspectObjects
    /// </summary>
    /// <param name="project">Extended project</param>
    /// <param name="ontologyService">Ontology service</param>
    /// <param name="projectData">Existing project data, used to resolve missing RDF data</param>
    /// <exception cref="NullReferenceException">Throws if project or ontology service is null</exception>
    /// <exception cref="MimirorgBadRequestException">Throws if missing root aspectObjects in rdf file, or bad rdf declaration</exception>
    public static void ResolveAspectObjects(this ProjectAm project, IOntologyService ontologyService, ProjectData projectData)
    {
        if (project == null || ontologyService == null)
            throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

        project.AspectObjects = new List<AspectObjectAm>();

        // Resolve root aspectObjects
        var rootAspectObjects = ontologyService.GetTriplesWithPredicate(Resources.IsAspectOf).Select(t => t.Subject).ToList();

        if (rootAspectObjects == null || !rootAspectObjects.Any())
            throw new MimirorgBadRequestException("Cannot find the root aspectObjects in rdf file.");

        foreach (var n in rootAspectObjects)
        {
            var aspectObject = new AspectObjectAm();
            aspectObject.ResolveAspectObject(ontologyService, n.ToString(), project.Id, AspectObjectType.Root, projectData);
            project.AspectObjects.Add(aspectObject);
        }

        // Resolve functional system blocks
        var aspectObjects = ontologyService.GetTriplesWithPredicateObject(Resources.Type, Resources.FSB).Select(t => t.Subject).ToList();
        if (!aspectObjects.Any())
            return;

        foreach (var n in aspectObjects)
        {
            var aspectObject = new AspectObjectAm();
            aspectObject.ResolveAspectObject(ontologyService, n.ToString(), project.Id, AspectObjectType.Aspect, projectData);
            project.AspectObjects.Add(aspectObject);
        }
    }

    /// <summary>
    /// Resolve relation connections
    /// </summary>
    /// <param name="project">Extended project</param>
    /// <param name="ontologyService">Ontology service</param>
    /// <param name="projectData">Existing project data, used to resolve missing RDF data</param>
    /// <exception cref="NullReferenceException">Throws if ontology service or project is null</exception>
    public static void ResolveRelationConnections(this ProjectAm project, IOntologyService ontologyService, ProjectData projectData)
    {
        if (project == null || ontologyService == null)
            throw new NullReferenceException($"{nameof(project)} or {nameof(ontologyService)} is null.");

        // PartOf relations
        var partOfRelations = ontologyService.GetTriplesWithPredicate(Resources.HasParent)
            .Select(x => new RelationConnector
            {
                ParentIri = x.Object.ToString(), ChildIri = x.Subject.ToString(), RelationType = RelationType.PartOf
            }).ToList();

        // FullFilledBy relations
        var fullFilledByRelations = ResolveRelations(RelationType.FulfilledBy, ontologyService);

        // HasLocation relations
        var hasLocationRelations = ResolveRelations(RelationType.HasLocation, ontologyService);

        var relations = partOfRelations.Union(fullFilledByRelations).Union(hasLocationRelations).ToList();
        project.Connections ??= new List<ConnectionAm>();

        foreach (var relation in relations)
        {
            var connection = new ConnectionAm();
            connection.ResolveConnection(ontologyService, project, relation, projectData);
            project.Connections.Add(connection);
        }
    }

    /// <summary>
    /// Resolve relations
    /// </summary>
    /// <param name="relationType">Relation type</param>
    /// <param name="ontologyService">Ontology service</param>
    /// <returns>A list of relation connections information</returns>
    private static IEnumerable<RelationConnector> ResolveRelations(RelationType relationType, IOntologyService ontologyService)
    {
        return ontologyService
            .GetTriplesWithPredicate($"imf:{relationType.ToString().LowerCaseFirstCharacter()}")
            .Select(x => new RelationConnector
            {
                ParentIri = x.Subject.ToString(), ChildIri = x.Object.ToString(), RelationType = relationType
            }).ToList();
    }
}