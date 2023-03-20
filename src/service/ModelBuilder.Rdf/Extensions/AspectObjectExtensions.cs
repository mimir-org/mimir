using System.Text.RegularExpressions;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;
using Newtonsoft.Json;
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
        public static void AssertAspectObject(this AspectObject aspectObject, ProjectDm project, IOntologyService ontologyService, ProjectData projectData)
        {
            var parentAspectObject = aspectObject.GetParent(project);

            if (parentAspectObject != null && !string.IsNullOrWhiteSpace(parentAspectObject.Id))
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasParent, parentAspectObject.Id);

            if (!string.IsNullOrWhiteSpace(aspectObject.Description))
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.Desc, aspectObject.Description, true);

            ontologyService.AssertAspectObject(aspectObject.Id, Resources.RDS, aspectObject.RdsString(project), true);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.MimirRds, aspectObject.Rds, true);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.Domain, aspectObject.Domain, true);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasPositionX, ontologyService.CreateLiteralAspectObject($"{JsonConvert.DeserializeObject<AspectObjectPosition>(aspectObject.Position).ThreePosX}", Resources.Float));
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasPositionY, ontologyService.CreateLiteralAspectObject($"{JsonConvert.DeserializeObject<AspectObjectPosition>(aspectObject.Position).ThreePosY}", Resources.Float));
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasBlockPositionX, ontologyService.CreateLiteralAspectObject($"{JsonConvert.DeserializeObject<AspectObjectPosition>(aspectObject.Position).BlockPosX}", Resources.Float));
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasBlockPositionY, ontologyService.CreateLiteralAspectObject($"{JsonConvert.DeserializeObject<AspectObjectPosition>(aspectObject.Position).BlockPosY}", Resources.Float));
            aspectObject.TypeReferenceObjects.AssertTypeReference(aspectObject.Id, ontologyService);

            ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasAspect, $"imf:{aspectObject.Aspect}");
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.Version, aspectObject.Version, true);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.Name, aspectObject.Name, true);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.Label, aspectObject.Label ?? aspectObject.Name, true);

            ontologyService.AssertAspectObject(aspectObject.Id, Resources.UpdatedBy, aspectObject.UpdatedBy, true);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.LastUpdated, ontologyService.CreateLiteralAspectObject($"{aspectObject.Updated?.ToString("u")}", Resources.DateTime));

            if (aspectObject.Created != null && !string.IsNullOrWhiteSpace(aspectObject.CreatedBy))
            {
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.CreatedBy, aspectObject.CreatedBy, true);
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.Created, ontologyService.CreateLiteralAspectObject($"{aspectObject.Created?.ToString("u")}", Resources.DateTime));
            }

            // TODO: This should be an iri
            if (!string.IsNullOrWhiteSpace(aspectObject.LibraryType))
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.LibraryType, aspectObject.LibraryType, true);

            if (!string.IsNullOrWhiteSpace(aspectObject.Rds))
            {
                var strippedRds = aspectObject.StrippedRds();
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.Type, @$"og{strippedRds.Length}:{aspectObject.Aspect}{strippedRds}");
            }

            if (aspectObject.AspectObjectType == AspectObjectType.Root)
            {
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.IsAspectOf, project.Id);
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasMasterProject, project.Id);
                return;
            }

            ontologyService.AssertAspectObject(aspectObject.Id, Resources.Type, Resources.FSB);
            ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasMasterProject, aspectObject.MainProject);


            if (!string.IsNullOrEmpty(aspectObject.Purpose))
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasPurpose, $"mimir:{aspectObject.Purpose}");

            if (aspectObject.Symbol != null)
                ontologyService.AssertAspectObject(aspectObject.Id, Resources.HasSymbol, aspectObject.Symbol, true);
        }

        /// <summary>
        /// Get the parent of the aspectObject
        /// </summary>
        /// <param name="aspectObject"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static AspectObject GetParent(this AspectObject aspectObject, ProjectDm project)
        {
            var connector = aspectObject.Connectors.OfType<ConnectorPartOf>().FirstOrDefault(x => x.Direction == ConnectorDirection.Input);
            if (connector == null)
                return null;

            var connection = project.Connections.FirstOrDefault(x => x.ToConnector == connector.Id);
            return connection == null ? null : project.AspectObjects.FirstOrDefault(x => x.Connectors.Any(y => y.Id == connection.FromConnector));
        }

        /// <summary>
        /// Generate RDS string recursively
        /// </summary>
        /// <param name="aspectObject"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        /// TODO: This is not correct. We have more values ex. ++ etc.
        public static string RdsString(this AspectObject aspectObject, ProjectDm project)
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
        /// <param name="project">The IRI of the project</param>
        /// <param name="aspectObjectType">The type of the aspectObject</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <exception cref="InvalidDataException">Throws if the parameter list is missing values</exception>
        public static void ResolveAspectObject(this AspectObjectAm aspectObject, IOntologyService ontologyService, string iri, string project, AspectObjectType aspectObjectType, ProjectData projectData)
        {
            if (aspectObject == null || ontologyService == null || string.IsNullOrWhiteSpace(iri) || string.IsNullOrWhiteSpace(project))
                throw new InvalidDataException($"Can't resolve a aspectObject without required parameters.");

            aspectObject.Id = iri;
            aspectObject.Project = project;
            aspectObject.Name = ontologyService.GetValue(iri, Resources.Name, false);
            aspectObject.Version = ontologyService.GetValue(iri, Resources.Version, false);
            aspectObject.Label = ontologyService.GetValue(iri, Resources.Label, false);
            aspectObject.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
            aspectObject.Description = ontologyService.GetValue(iri, Resources.Desc, false);

            aspectObject.Position = new AspectObjectPosition
            {
                ThreePosX = (int) ontologyService.GetDecimalValue(iri, Resources.HasPositionX, false),
                ThreePosY = (int) ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false),
                BlockPosX = (int) ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionX, false),
                BlockPosY = (int) ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionY, false),
            };

            var masterProjectIriAspectObject = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasMasterProject).Select(x => x.Object).FirstOrDefault();
            aspectObject.MainProject = masterProjectIriAspectObject?.ToString();

            aspectObject.Symbol = ontologyService.GetValue(iri, Resources.HasSymbol, false, false);
            aspectObject.LibraryType = ontologyService.GetValue(iri, Resources.LibraryType, false);

            aspectObject.UpdatedBy = ontologyService.GetValue(iri, Resources.UpdatedBy, false);
            aspectObject.Updated = ontologyService.GetDateTimeValue(iri, Resources.LastUpdated, false);
            aspectObject.CreatedBy = ontologyService.GetValue(iri, Resources.CreatedBy, false);
            aspectObject.Created = ontologyService.GetDateTimeValue(iri, Resources.Created, false);

            aspectObject.Purpose = ontologyService.GetValue(iri, Resources.HasPurpose, false);

            aspectObject.Aspect = ontologyService.GetEnumValue<Aspect>(iri, Resources.HasAspect, false);
            aspectObject.AspectObjectType = aspectObjectType;

            aspectObject.TypeReferences.ResolveTypeReferences(aspectObject.Id, ontologyService);

            // Resolve Attributes
            aspectObject.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(aspectObject.Id, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), iri, null);
                aspectObject.Attributes.Add(attribute);
            }

            // Create all relation aspectObjects
            var existingAspectObject = projectData?.AspectObjects?.FirstOrDefault(x => x.Id == iri);
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
                    Id = iri.StripAndCreateIdIri(),
                    Name = RelationType.PartOf.GetDisplayName(),
                    Direction = ConnectorDirection.Output,
                    AspectObject = iri,
                    RelationType = RelationType.PartOf,
                    ConnectorVisibility = ConnectorVisibility.None
                }
            };

            if (isRoot)
                return connectors;

            connectors.Add(new RelationAm
            {
                Id = iri.StripAndCreateIdIri(),
                Name = RelationType.PartOf.GetDisplayName(),
                Direction = ConnectorDirection.Input,
                AspectObject = iri,
                RelationType = RelationType.PartOf,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Id = iri.StripAndCreateIdIri(),
                Name = RelationType.HasLocation.GetDisplayName(),
                Direction = ConnectorDirection.Input,
                AspectObject = iri,
                RelationType = RelationType.HasLocation,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Id = iri.StripAndCreateIdIri(),
                Name = RelationType.HasLocation.GetDisplayName(),
                Direction = ConnectorDirection.Output,
                AspectObject = iri,
                RelationType = RelationType.HasLocation,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Id = iri.StripAndCreateIdIri(),
                Name = RelationType.FulfilledBy.GetDisplayName(),
                Direction = ConnectorDirection.Input,
                AspectObject = iri,
                RelationType = RelationType.FulfilledBy,
                ConnectorVisibility = ConnectorVisibility.None
            });

            connectors.Add(new RelationAm
            {
                Id = iri.StripAndCreateIdIri(),
                Name = RelationType.FulfilledBy.GetDisplayName(),
                Direction = ConnectorDirection.Output,
                AspectObject = iri,
                RelationType = RelationType.FulfilledBy,
                ConnectorVisibility = ConnectorVisibility.None
            });

            return connectors;
        }
    }
}