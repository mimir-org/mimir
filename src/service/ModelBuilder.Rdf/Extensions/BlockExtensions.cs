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
    public static void AssertBlock(this Block block, Project project, IOntologyService ontologyService, ProjectData projectData)
    {
        var parentBlock = block.GetParent(project);

        if (parentBlock != null && !string.IsNullOrWhiteSpace(parentBlock.Id.ToString()))
            ontologyService.AssertBlock(block.Id.ToString(), Resources.HasParent, parentBlock.Id.ToString());

        if (!string.IsNullOrWhiteSpace(block.Description))
            ontologyService.AssertBlock(block.Id.ToString(), Resources.Desc, block.Description, true);

        
        
        ontologyService.AssertBlock(block.Id.ToString(), Resources.HasPositionX, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<Position>(block.PositionTree).PosX}", Resources.Float));
        ontologyService.AssertBlock(block.Id.ToString().ToString(), Resources.HasPositionY, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<Position>(block.PositionTree).PosY}", Resources.Float));
        ontologyService.AssertBlock(block.Id.ToString(), Resources.HasBlockPositionX, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<Position>(block.PositionBlock).PosX}", Resources.Float));
        ontologyService.AssertBlock(block.Id.ToString(), Resources.HasBlockPositionY, ontologyService.CreateLiteralBlock($"{JsonConvert.DeserializeObject<Position>(block.PositionBlock).PosY}", Resources.Float));

        ontologyService.AssertBlock(block.Id.ToString(), Resources.HasAspect, $"imf:{block.Aspect}");        
        ontologyService.AssertBlock(block.Id.ToString(), Resources.Name, block.Name, true);        
        ontologyService.AssertBlock(block.Id.ToString(), Resources.UpdatedBy, block.UpdatedBy, true);
        ontologyService.AssertBlock(block.Id.ToString(), Resources.LastUpdated, ontologyService.CreateLiteralBlock($"{block.Updated?.ToString("u")}", Resources.DateTime));

        if (!string.IsNullOrWhiteSpace(block.CreatedBy))
        {
            ontologyService.AssertBlock(block.Id.ToString(), Resources.CreatedBy, block.CreatedBy, true);
            ontologyService.AssertBlock(block.Id.ToString(), Resources.Created, ontologyService.CreateLiteralBlock($"{block.Created:u}", Resources.DateTime));
        }

        // TODO: This should be an iri
        //if (!string.IsNullOrWhiteSpace(block.LibraryType.ToString()))
        //    ontologyService.AssertBlock(block.Id.ToString(), Resources.LibraryType, block.LibraryType.ToString(), true);

      
        if (block.BlockType == "Root")
        {
            ontologyService.AssertBlock(block.Id.ToString(), Resources.IsAspectOf, project.Id.ToString());
            ontologyService.AssertBlock(block.Id.ToString(), Resources.HasMasterProject, project.Id.ToString());
            return;
        }

        ontologyService.AssertBlock(block.Id.ToString(), Resources.Type, Resources.FSB);



        if (!string.IsNullOrEmpty(block.PurposeId))
            ontologyService.AssertBlock(block.Id.ToString(), Resources.HasPurpose, $"mimir:{block.PurposeId}");

        if (block.SymbolId != null)
            ontologyService.AssertBlock(block.Id.ToString(), Resources.HasSymbol, block.SymbolId, true);
    }

    /// <summary>
    /// Get the parent of the block
    /// </summary>
    /// <param name="block"></param>
    /// <param name="project"></param>
    /// <returns></returns>
    public static Block GetParent(this Block block, Project project)
    {
        var connector = block.Connectors.OfType<Connector>().FirstOrDefault(x => x.Direction == ConnectorDirection.Input);
        if (connector == null)
            return null;

        var connection = project.Connections.FirstOrDefault(x => x.ToConnector == connector.Id.ToString());
        return connection == null ? null : project.Blocks.FirstOrDefault(x => x.Connectors.Any(y => y.Id.ToString() == connection.FromConnector.ToString()));
    }

 

    /// <summary>
    /// Resolve aspect block and all references
    /// </summary>
    /// <param name="block">The block that should be resolved</param>
    /// <param name="ontologyService">Ontology Service</param>
    /// <param name="iri">The IRI of the block</param>
    /// <param name="project">The IRI of the project</param>
    /// <param name="blockType">The type of the block</param>
    /// <param name="projectData">Record of ICollections</param>
    /// <exception cref="InvalidDataException">Throws if the parameter list is missing values</exception>
    public static void ResolveBlock(this BlockRequest block, IOntologyService ontologyService, string iri, string project, BlockType blockType, ProjectData projectData)
    {
        if (block == null || ontologyService == null || string.IsNullOrWhiteSpace(iri) || string.IsNullOrWhiteSpace(project))
            throw new InvalidDataException($"Can't resolve a block without required parameters.");

        //block.Id = iri;
        //block.Project = project;
        block.Name = ontologyService.GetValue(iri, Resources.Name, false);
        block.Version = ontologyService.GetValue(iri, Resources.Version, false);
        block.Label = ontologyService.GetValue(iri, Resources.Label, false);
        block.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
        block.Description = ontologyService.GetValue(iri, Resources.Desc, false);

        block.PositionTree = new PositionRequest
        {
            PosX = (int) ontologyService.GetDecimalValue(iri, Resources.HasPositionX, false),
            PosY = (int) ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false),
        };

        block.PositionBlock = new PositionRequest
        {
            PosX = (int) ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionX, false),
            PosY = (int) ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionY, false),
        };

        //var masterProjectIriBlock = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasMasterProject).Select(x => x.Object).FirstOrDefault();
        //block.MainProject = masterProjectIriBlock.;

        block.Symbol = ontologyService.GetValue(iri, Resources.HasSymbol, false, false);
        //block.LibraryType = ontologyService.GetValue(iri, Resources.LibraryType, false);

        block.Purpose = ontologyService.GetValue(iri, Resources.HasPurpose, false);

        block.Aspect = ontologyService.GetEnumValue<Aspect>(iri, Resources.HasAspect, false);
        block.BlockType = blockType;

        // Resolve Attributes
        block.Attributes = new List<AttributeRequest>();
        //var attributes = ontologyService.GetTriplesWithSubjectPredicate(block.Id, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

        //foreach (var a in attributes)
        //{
        //    var attribute = new AttributeAm();
        //    attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), iri, null);
        //    block.Attributes.Add(attribute);
        //}

        // Create all relation blocks
        //var existingBlock = projectData?.Blocks?.FirstOrDefault(x => x.Id == iri);
        //var existingRelations = existingBlock?.Connectors.OfType<ConnectorRelationAm>().ToList();
        //if (existingRelations != null && existingRelations.Any())
        //{
        //    block.Connectors = new List<ConnectorAm>();
        //    foreach (var relation in existingRelations)
        //        block.Connectors.Add(relation);
        //}
        //else
        //{
        //    //block.Connectors = CreateDefaultConnectors(iri, blockType == blockType.Root);
        //}

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
    public static IEnumerable<ConnectorRequest> ResolveTerminals(List<INode> blocks, ProjectData projectData, string blockIri, IOntologyService ontologyService)
    {
        if (!blocks.Any())
            yield break;

        foreach (var block in blocks)
        {
            var connectorTerminal = new ConnectorRequest();
            //connectorTerminal.Connector(ontologyService, projectData, blockIri, block.ToString());
            yield return connectorTerminal;
        }
    }
}