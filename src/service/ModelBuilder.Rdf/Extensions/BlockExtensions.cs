using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using INode = VDS.RDF.INode;

namespace ModelBuilder.Rdf.Extensions;

public static class BlockExtensions
{
    /// <summary>
    /// Assert block data to ontology service graph
    /// </summary>
    /// <param name="block"></param>
    /// <param name="project"></param>
    /// <param name="ontologyService"></param>
    /// <param name="projectData">Record of ICollections</param>
    public static void AssertBlock(this BlockDm block, ProjectDm project, IOntologyService ontologyService, ProjectData projectData)
    {
        var parentBlock = block.GetParent(project);

        if (parentBlock != null && !string.IsNullOrWhiteSpace(parentBlock.Id))
            ontologyService.AssertBlock(block.Id, Resources.HasParent, parentBlock.Id);

        if (!string.IsNullOrWhiteSpace(block.Description))
            ontologyService.AssertBlock(block.Id, Resources.Desc, block.Description, true);

        ontologyService.AssertBlock(block.Id, Resources.RDS, block.RdsString(project), true);
        ontologyService.AssertBlock(block.Id, Resources.MimirRds, block.Rds, true);
        ontologyService.AssertBlock(block.Id, Resources.HasPositionX, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<PositionDm>(block.PositionTree).PosX}", Resources.Float));
        ontologyService.AssertBlock(block.Id, Resources.HasPositionY, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<PositionDm>(block.PositionTree).PosY}", Resources.Float));
        ontologyService.AssertBlock(block.Id, Resources.HasBlockPositionX, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<PositionDm>(block.PositionBlock).PosX}", Resources.Float));
        ontologyService.AssertBlock(block.Id, Resources.HasBlockPositionY, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<PositionDm>(block.PositionBlock).PosY}", Resources.Float));

        ontologyService.AssertBlock(block.Id, Resources.HasAspect, $"imf:{block.Aspect}");
        ontologyService.AssertBlock(block.Id, Resources.Version, block.Version, true);
        ontologyService.AssertBlock(block.Id, Resources.Name, block.Name, true);
        ontologyService.AssertBlock(block.Id, Resources.Label, block.Label ?? block.Name, true);

        ontologyService.AssertBlock(block.Id, Resources.UpdatedBy, block.UpdatedBy, true);
        ontologyService.AssertBlock(block.Id, Resources.LastUpdated, ontologyService.CreateLiteralBlock($"{block.Updated?.ToString("u")}", Resources.DateTime));

        if (!string.IsNullOrWhiteSpace(block.CreatedBy))
        {
            ontologyService.AssertBlock(block.Id, Resources.CreatedBy, block.CreatedBy, true);
            ontologyService.AssertBlock(block.Id, Resources.Created, ontologyService.CreateLiteralBlock($"{block.Created:u}", Resources.DateTime));
        }

        // TODO: This should be an iri
        if (!string.IsNullOrWhiteSpace(block.LibraryType))
            ontologyService.AssertBlock(block.Id, Resources.LibraryType, block.LibraryType, true);

        if (!string.IsNullOrWhiteSpace(block.Rds))
        {
            var strippedRds = block.StrippedRds();
            ontologyService.AssertBlock(block.Id, Resources.Type, @$"og{strippedRds.Length}:{block.Aspect}{strippedRds}");
        }

        if (block.BLockType == BLockType.Root)
        {
            ontologyService.AssertBlock(block.Id, Resources.IsAspectOf, project.Id);
            ontologyService.AssertBlock(block.Id, Resources.HasMasterProject, project.Id);
            return;
        }

        ontologyService.AssertBlock(block.Id, Resources.Type, Resources.FSB);
        ontologyService.AssertBlock(block.Id, Resources.HasMasterProject, block.MainProject);


        if (!string.IsNullOrEmpty(block.Purpose))
            ontologyService.AssertBlock(block.Id, Resources.HasPurpose, $"mimir:{block.Purpose}");

        if (block.Symbol != null)
            ontologyService.AssertBlock(block.Id, Resources.HasSymbol, block.Symbol, true);
    }

    /// <summary>
    /// Get the parent of the block
    /// </summary>
    /// <param name="block"></param>
    /// <param name="project"></param>
    /// <returns></returns>
    public static BlockDm GetParent(this BlockDm block, ProjectDm project)
    {
        var connector = block.Connectors.OfType<ConnectorPartOfDm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Input);
        if (connector == null)
            return null;

        var connection = project.Connections.FirstOrDefault(x => x.ToConnector == connector.Id);
        return connection == null ? null : project.Blocks.FirstOrDefault(x => x.Connectors.Any(y => y.Id == connection.FromConnector));
    }

    /// <summary>
    /// Generate RDS string recursively
    /// </summary>
    /// <param name="block"></param>
    /// <param name="project"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    /// TODO: This is not correct. We have more values ex. ++ etc.
    public static string RdsString(this BlockDm block, ProjectDm project)
    {
        if (block.BLockType == BLockType.Root)
        {
            return $"<{project.Name.ToUpper()}>";
        }

        var prefix = block.Aspect switch
        {
            Aspect.Function => "=",
            Aspect.Location => "+",
            Aspect.Product => "-",
            Aspect.NotSet => throw new NotImplementedException(),
            Aspect.None => throw new NotImplementedException(),
            _ => string.Empty
        };

        var parent = block.GetParent(project);
        var rds = block.Rds;

        return parent != null ? $"{parent.RdsString(project)}{prefix}{rds}" : $"{prefix}{rds}";
    }

    /// <summary>
    /// Strip RDS string
    /// </summary>
    /// <param name="block"></param>
    /// <returns></returns>
    public static string StrippedRds(this BlockDm block) => Regex.Replace(block.Rds, @"\d+", string.Empty);

    /// <summary>
    /// Resolve aspect block and all references
    /// </summary>
    /// <param name="block">The block that should be resolved</param>
    /// <param name="ontologyService">Ontology Service</param>
    /// <param name="iri">The IRI of the block</param>
    /// <param name="project">The IRI of the project</param>
    /// <param name="bLockType">The type of the block</param>
    /// <param name="projectData">Record of ICollections</param>
    /// <exception cref="InvalidDataException">Throws if the parameter list is missing values</exception>
    public static void ResolveBlock(this BlockAm block, IOntologyService ontologyService, string iri, string project, BLockType bLockType, ProjectData projectData)
    {
        if (block == null || ontologyService == null || string.IsNullOrWhiteSpace(iri) || string.IsNullOrWhiteSpace(project))
            throw new InvalidDataException($"Can't resolve a block without required parameters.");

        block.Id = iri;
        block.Project = project;
        block.Name = ontologyService.GetValue(iri, Resources.Name, false);
        block.Version = ontologyService.GetValue(iri, Resources.Version, false);
        block.Label = ontologyService.GetValue(iri, Resources.Label, false);
        block.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
        block.Description = ontologyService.GetValue(iri, Resources.Desc, false);

        block.PositionTree = new PositionAm
        {
            PosX = (int) ontologyService.GetDecimalValue(iri, Resources.HasPositionX, false),
            PosY = (int) ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false),
        };

        block.PositionBlock = new PositionAm
        {
            PosX = (int) ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionX, false),
            PosY = (int) ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionY, false),
        };

        var masterProjectIriBlock = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasMasterProject).Select(x => x.Object).FirstOrDefault();
        block.MainProject = masterProjectIriBlock?.ToString();

        block.Symbol = ontologyService.GetValue(iri, Resources.HasSymbol, false, false);
        block.LibraryType = ontologyService.GetValue(iri, Resources.LibraryType, false);

        block.Purpose = ontologyService.GetValue(iri, Resources.HasPurpose, false);

        block.Aspect = ontologyService.GetEnumValue<Aspect>(iri, Resources.HasAspect, false);
        block.BLockType = bLockType;

        // Resolve Attributes
        block.Attributes = new List<AttributeAm>();
        var attributes = ontologyService.GetTriplesWithSubjectPredicate(block.Id, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

        foreach (var a in attributes)
        {
            var attribute = new AttributeAm();
            attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), iri, null);
            block.Attributes.Add(attribute);
        }

        // Create all relation blocks
        var existingBlock = projectData?.Blocks?.FirstOrDefault(x => x.Id == iri);
        var existingRelations = existingBlock?.Connectors.OfType<ConnectorRelationAm>().ToList();
        if (existingRelations != null && existingRelations.Any())
        {
            block.Connectors = new List<ConnectorAm>();
            foreach (var relation in existingRelations)
                block.Connectors.Add(relation);
        }
        else
        {
            //block.Connectors = CreateDefaultConnectors(iri, blockType == blockType.Root);
        }

        // Create all input terminals
        var inputTerminalBlocks = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).ToList();
        var inputTerminals = ResolveTerminals(inputTerminalBlocks, projectData, iri, ontologyService).ToList();
        block.Connectors = block.Connectors.Union(inputTerminals).ToList();

        // Create all output terminals
        var outputTerminalBlocks = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).ToList();
        var outputTerminals = ResolveTerminals(outputTerminalBlocks, projectData, iri, ontologyService).ToList();
        block.Connectors = block.Connectors.Union(outputTerminals).ToList();

        // Create all bidirectional terminals
        var bidirectionalTerminalBlocks = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasBidirectionalTerminal).Select(x => x.Object).ToList();
        var bidirectionalTerminals = ResolveTerminals(bidirectionalTerminalBlocks, projectData, iri, ontologyService).ToList();
        block.Connectors = block.Connectors.Union(bidirectionalTerminals).ToList();
    }

    /// <summary>
    /// Resolve all Terminals from INodes
    /// </summary>
    /// <param name="blocks">The blocks to be resolved</param>
    /// <param name="projectData">Project Data</param>
    /// <param name="blockIri">Parent block IRI</param>
    /// <param name="ontologyService">Ontology Service</param>
    /// <returns></returns>
    public static IEnumerable<ConnectorTerminalAm> ResolveTerminals(List<INode> blocks, ProjectData projectData, string blockIri, IOntologyService ontologyService)
    {
        if (!blocks.Any())
            yield break;

        foreach (var block in blocks)
        {
            var connectorTerminal = new ConnectorTerminalAm();
            connectorTerminal.ResolveTerminal(ontologyService, projectData, blockIri, block.ToString());
            yield return connectorTerminal;
        }
    }
}