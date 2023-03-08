using System.Text.RegularExpressions;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;
using INode = VDS.RDF.INode;
using AspectObject = Mb.Models.Data.AspectObject;

namespace ModelBuilder.Rdf.Extensions
{
    public static class AspectObjectExtensions
    {
        /// <summary>
        /// Assert aspectObject data to ontology service graph
        /// </summary>
        /// <param name="aspectObject"></param>
        /// <param name="project"></param>
        /// <param name="ontologyService"></param>
        /// <param name="projectData">Record of ICollections</param>
        public static void AssertAspectObject(this AspectObject aspectObject, Project project, IOntologyService ontologyService, ProjectData projectData)
        {
            var parentAspectObject = aspectObject.GetParent(project);

            if (parentAspectObject != null && !string.IsNullOrWhiteSpace(parentAspectObject.Iri))
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasParent, parentAspectObject.Iri);

            if (!string.IsNullOrWhiteSpace(aspectObject.Description))
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Desc, aspectObject.Description, true);

            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.RDS, aspectObject.RdsString(project), true);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.MimirRds, aspectObject.Rds, true);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Domain, aspectObject.Domain, true);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasPositionX, ontologyService.CreateLiteralAspectObject($"{aspectObject.PositionX}", Resources.Float));
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasPositionY, ontologyService.CreateLiteralAspectObject($"{aspectObject.PositionY}", Resources.Float));
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasBlockPositionX, ontologyService.CreateLiteralAspectObject($"{aspectObject.PositionBlockX}", Resources.Float));
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasBlockPositionY, ontologyService.CreateLiteralAspectObject($"{aspectObject.PositionBlockY}", Resources.Float));
            aspectObject.TypeReferences.AssertTypeReference(aspectObject.Iri, ontologyService);

            if (aspectObject.Width != null)
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasWidth, ontologyService.CreateLiteralAspectObject($"{aspectObject.Width}", Resources.Integer));

            if (aspectObject.Height != null)
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasHeight, ontologyService.CreateLiteralAspectObject($"{aspectObject.Height}", Resources.Integer));


            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasAspect, $"imf:{aspectObject.Aspect}");
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Version, aspectObject.Version, true);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Name, aspectObject.Name, true);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Label, aspectObject.Label ?? aspectObject.Name, true);

            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.UpdatedBy, aspectObject.UpdatedBy, true);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.LastUpdated, ontologyService.CreateLiteralAspectObject($"{aspectObject.Updated.ToString("u")}", Resources.DateTime));

            if (aspectObject.Created != null && !string.IsNullOrWhiteSpace(aspectObject.CreatedBy))
            {
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.CreatedBy, aspectObject.CreatedBy, true);
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Created, ontologyService.CreateLiteralAspectObject($"{aspectObject.Created?.ToString("u")}", Resources.DateTime));
            }

            // TODO: This should be an iri
            if (!string.IsNullOrWhiteSpace(aspectObject.LibraryTypeId))
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.LibraryType, aspectObject.LibraryTypeId, true);

            if (!string.IsNullOrWhiteSpace(aspectObject.Rds))
            {
                var strippedRds = aspectObject.StrippedRds();
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Type, @$"og{strippedRds.Length}:{aspectObject.Aspect}{strippedRds}");
            }

            if (aspectObject.AspectObjectType == AspectObjectType.Root)
            {
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.IsAspectOf, project.Iri);
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasMasterProject, project.Iri);
                return;
            }

            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.Type, Resources.FSB);
            ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasMasterProject, aspectObject.MasterProjectIri);


            if (!string.IsNullOrEmpty(aspectObject.PurposeString))
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasPurpose, $"mimir:{aspectObject.PurposeString}");

            if (aspectObject.Symbol != null)
                ontologyService.AssertAspectObject(aspectObject.Iri, Resources.HasSymbol, aspectObject.Symbol, true);
        }

        /// <summary>
        /// Get the parent of the aspectObject
        /// </summary>
        /// <param name="aspectObject"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static AspectObject GetParent(this AspectObject aspectObject, Project project)
        {
            foreach (var connection in project.Connections)
            {
                if (connection.ToAspectObject != aspectObject.Id) continue;

                if (!connection.ToConnectorObject.IsPartOf()) continue;

                if (connection.ToConnectorObject.IsConnected(project))
                {
                    return connection.FromAspectObjectObject;
                }
            }
            return null;
        }

        /// <summary>
        /// Generate RDS string recursively
        /// </summary>
        /// <param name="aspectObject"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        /// TODO: This is not correct. We have more values ex. ++ etc.
        public static string RdsString(this AspectObject aspectObject, Project project)
        {
            if (aspectObject.AspectObjectType == AspectObjectType.Root)
            {
                return $"<{project.Name.ToUpper()}>";
            }

            var prefix = aspectObject.Aspect switch
            {
                Aspect.Function => "=",
                Aspect.Location => "+",
                Aspect.Product => "-",
                Aspect.NotSet => throw new NotImplementedException(),
                Aspect.None => throw new NotImplementedException(),
                _ => string.Empty
            };

            var parent = aspectObject.GetParent(project);
            var rds = aspectObject.Rds;

            return parent != null ? $"{parent.RdsString(project)}{prefix}{rds}" : $"{prefix}{rds}";
        }

        /// <summary>
        /// Strip RDS string
        /// </summary>
        /// <param name="aspectObject"></param>
        /// <returns></returns>
        public static string StrippedRds(this AspectObject aspectObject) => Regex.Replace(aspectObject.Rds, @"\d+", string.Empty);

        /// <summary>
        /// Resolve aspect aspectObject and all references
        /// </summary>
        /// <param name="aspectObject">The aspectObject that should be resolved</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="iri">The IRI of the aspectObject</param>
        /// <param name="projectIri">The IRI of the project</param>
        /// <param name="aspectObjectType">The type of the aspectObject</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <exception cref="InvalidDataException">Throws if the parameter list is missing values</exception>
        public static void ResolveAspectObject(this AspectObjectAm aspectObject, IOntologyService ontologyService, string iri, string projectIri, AspectObjectType aspectObjectType, ProjectData projectData)
        {
            if (aspectObject == null || ontologyService == null || string.IsNullOrWhiteSpace(iri) || string.IsNullOrWhiteSpace(projectIri))
                throw new InvalidDataException($"Can't resolve a aspectObject without required parameters.");

            aspectObject.Iri = iri;
            aspectObject.ProjectIri = projectIri;
            aspectObject.Name = ontologyService.GetValue(iri, Resources.Name, false);
            aspectObject.Version = ontologyService.GetValue(iri, Resources.Version, false);
            aspectObject.Label = ontologyService.GetValue(iri, Resources.Label, false);
            aspectObject.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
            aspectObject.Description = ontologyService.GetValue(iri, Resources.Desc, false);
            aspectObject.PositionX = ontologyService.GetDecimalValue(iri, Resources.HasPositionX, false);
            aspectObject.PositionY = ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false);
            aspectObject.PositionBlockX = ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionX, false);
            aspectObject.PositionBlockY = ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false);
            aspectObject.Width = ontologyService.GetIntValue(iri, Resources.HasWidth, false);
            aspectObject.Height = ontologyService.GetIntValue(iri, Resources.HasHeight, false);

            var masterProjectIriAspectObject = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasMasterProject).Select(x => x.Object).FirstOrDefault();
            aspectObject.MasterProjectIri = masterProjectIriAspectObject?.ToString();

            aspectObject.Symbol = ontologyService.GetValue(iri, Resources.HasSymbol, false, false);
            aspectObject.LibraryTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);

            aspectObject.UpdatedBy = ontologyService.GetValue(iri, Resources.UpdatedBy, false);
            aspectObject.Updated = ontologyService.GetDateTimeValue(iri, Resources.LastUpdated, false);
            aspectObject.CreatedBy = ontologyService.GetValue(iri, Resources.CreatedBy, false);
            aspectObject.Created = ontologyService.GetDateTimeValue(iri, Resources.Created, false);

            aspectObject.Purpose = ontologyService.GetValue(iri, Resources.HasPurpose, false);

            aspectObject.Aspect = ontologyService.GetEnumValue<Aspect>(iri, Resources.HasAspect, false);
            aspectObject.AspectObjectType = aspectObjectType;

            aspectObject.TypeReferences.ResolveTypeReferences(aspectObject.Iri, ontologyService);

            // Resolve Attributes
            aspectObject.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(aspectObject.Iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), iri, null);
                aspectObject.Attributes.Add(attribute);
            }

            // Create all relation aspectObjects
            var existingAspectObject = projectData?.AspectObjects?.FirstOrDefault(x => x.Iri == iri);
            var existingRelations = existingAspectObject?.Connectors.OfType<RelationAm>().ToList();
            if (existingRelations != null && existingRelations.Any())
            {
                aspectObject.Connectors = new List<ConnectorAm>();
                foreach (var relation in existingRelations)
                    aspectObject.Connectors.Add(relation);
            }
            else
            {
                aspectObject.Connectors = CreateDefaultConnectors(iri, aspectObjectType == AspectObjectType.Root);
            }

            // Create all input terminals
            var inputTerminalAspectObjects = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).ToList();
            var inputTerminals = ResolveTerminals(inputTerminalAspectObjects, projectData, iri, ontologyService).ToList();
            aspectObject.Connectors = aspectObject.Connectors.Union(inputTerminals).ToList();

            // Create all output terminals
            var outputTerminalAspectObjects = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).ToList();
            var outputTerminals = ResolveTerminals(outputTerminalAspectObjects, projectData, iri, ontologyService).ToList();
            aspectObject.Connectors = aspectObject.Connectors.Union(outputTerminals).ToList();

            // Create all bidirectional terminals
            var bidirectionalTerminalAspectObjects = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasBidirectionalTerminal).Select(x => x.Object).ToList();
            var bidirectionalTerminals = ResolveTerminals(bidirectionalTerminalAspectObjects, projectData, iri, ontologyService).ToList();
            aspectObject.Connectors = aspectObject.Connectors.Union(bidirectionalTerminals).ToList();
        }

        /// <summary>
        /// Resolve all Terminals from INodes
        /// </summary>
        /// <param name="aspectObjects">The aspectObjects to be resolved</param>
        /// <param name="projectData">Project Data</param>
        /// <param name="aspectObjectIri">Parent aspectObject IRI</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <returns></returns>
        public static IEnumerable<ConnectorTerminalAm> ResolveTerminals(List<INode> aspectObjects, ProjectData projectData, string aspectObjectIri, IOntologyService ontologyService)
        {
            if (!aspectObjects.Any())
                yield break;

            foreach (var aspectObject in aspectObjects)
            {
                var connectorTerminal = new ConnectorTerminalAm();
                connectorTerminal.ResolveTerminal(ontologyService, projectData, aspectObjectIri, aspectObject.ToString());
                yield return connectorTerminal;
            }
        }

        /// <summary>
        /// Create all default relation connectors 
        /// </summary>
        /// <param name="iri">The aspectObject IRI</param>
        /// <param name="isRoot">Is a root aspectObject?</param>
        /// <returns>Returns a list of default connectors</returns>
        public static List<ConnectorAm> CreateDefaultConnectors(string iri, bool isRoot)
        {
            var connectors = new List<ConnectorAm>
            {
                new RelationAm
                {
                    Iri = iri.StripAndCreateIdIri(),
                    Name = RelationType.PartOf.GetDisplayName(),
                    Type = ConnectorDirection.Output,
                    AspectObjectIri = iri,
                    RelationType = RelationType.PartOf,
                    ConnectorVisibility = ConnectorVisibility.None
                }
            };

            if (isRoot)
                return connectors;

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.PartOf.GetDisplayName(),
                Type = ConnectorDirection.Input,
                AspectObjectIri = iri,
                RelationType = RelationType.PartOf,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.HasLocation.GetDisplayName(),
                Type = ConnectorDirection.Input,
                AspectObjectIri = iri,
                RelationType = RelationType.HasLocation,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.HasLocation.GetDisplayName(),
                Type = ConnectorDirection.Output,
                AspectObjectIri = iri,
                RelationType = RelationType.HasLocation,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.FulfilledBy.GetDisplayName(),
                Type = ConnectorDirection.Input,
                AspectObjectIri = iri,
                RelationType = RelationType.FulfilledBy,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.FulfilledBy.GetDisplayName(),
                Type = ConnectorDirection.Output,
                AspectObjectIri = iri,
                RelationType = RelationType.FulfilledBy,
                ConnectorVisibility = ConnectorVisibility.None
            });

            return connectors;
        }
    }
}