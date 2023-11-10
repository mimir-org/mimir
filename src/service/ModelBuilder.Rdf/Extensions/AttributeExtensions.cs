using System.Web;
using Mb.Models.Const;
using Mimirorg.TypeLibrary.Models.Client;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;
using Newtonsoft.Json;
using Attribute = Mb.Models.Data.Attribute;
using AttributeDatumObject = ModelBuilder.Rdf.Models.AttributeDatumObject;
using Mb.Models.Application;
using Mb.Models.Data;

namespace ModelBuilder.Rdf.Extensions;

public static class AttributeExtensions
{
    /// <summary>
    /// Assert attribute to graph
    /// </summary>
    /// <param name="attribute">Attribute that should be asserted</param>
    /// <param name="parentIri">The ID of the parent</param>
    /// <param name="ontologyService">Ontology Service</param>
    public static void AssertAttribute(this Attribute attribute, string parentIri, IOntologyService ontologyService)
    {
        #region None Mimir specific data

        ontologyService.AssertBlock(attribute.Id.ToString(), Resources.Type, Resources.PhysicalQuantity);
        ontologyService.AssertBlock(parentIri, Resources.HasPhysicalQuantity, attribute.Id.ToString());
        ontologyService.AssertBlock(attribute.Id.ToString(), Resources.Label, attribute.Name, true);

        var ado = attribute.AttributeDatumObject();
        var adp = attribute.Id.ToString().AttributeDatumPredicate();
        ontologyService.AssertBlock(attribute.IriDatum(), adp.SpecifiedScopePredicate, ado.SpecifiedScope);
        ontologyService.AssertBlock(attribute.IriDatum(), adp.SpecifiedProvenancePredicate, ado.SpecifiedProvenance);
        ontologyService.AssertBlock(attribute.IriDatum(), adp.RangeSpecifyingPredicate, ado.RangeSpecifying);
        ontologyService.AssertBlock(attribute.IriDatum(), adp.RegularitySpecifiedPredicate, ado.RegularitySpecified);

        ontologyService.AssertBlock(attribute.Id.ToString(), Resources.QualityQuantifiedAs, attribute.IriDatum());

        #endregion None Mimir specific data

        #region Mimir specific data

        if (!string.IsNullOrEmpty(attribute.AttributeType))
            ontologyService.AssertBlock(attribute.Id.ToString(), Resources.LibraryType, attribute.AttributeType);

        var allowedUnits = attribute.GetAllowedUnits();
        if (allowedUnits != null && allowedUnits.Any())
            foreach (var value in allowedUnits)
                ontologyService.AssertBlock(attribute.Id.ToString(), Resources.AllowedUnit, $"mimir:{value.Id}-{value.Name}");

        #endregion Mimir specific data
    }

    /// <summary>
    /// Assert attribute value to graph
    /// </summary>
    /// <param name="attribute">Attribute that should have asserted value</param>
    /// <param name="ontologyService">Ontology Service</param>
    /// <param name="projectData">Record of ICollections</param>
    public static void AssertAttributeValue(this Attribute attribute, IOntologyService ontologyService, ProjectData projectData)
    {
        if (string.IsNullOrEmpty(attribute?.Value))
            return;

        var selectedUnit = attribute.GetSelectedUnit(projectData);

        ontologyService.AssertBlock(attribute.IriDatum(), Resources.Type, Resources.ScalarQuantityDatum);
        ontologyService.AssertBlock(attribute.Id.ToString(), Resources.QualityQuantifiedAs, $"{attribute.Id}-datum");

        if (string.IsNullOrWhiteSpace(attribute.UnitSelected) || string.IsNullOrWhiteSpace(selectedUnit?.Name))
            return;

        ontologyService.AssertBlock($"mimir:{attribute.UnitSelected}", Resources.Type, Resources.Scale);
        ontologyService.AssertBlock($"mimir:{attribute.UnitSelected}", Resources.Label, selectedUnit.Name, true);
        ontologyService.AssertBlock(attribute.IriDatum(), Resources.DatumUOM, $"mimir:{attribute.UnitSelected}");
    }

    /// <summary>
    /// Get the selected unit
    /// </summary>
    /// <param name="attribute">Attribute selected unit</param>
    /// <param name="projectData">Record of ICollections</param>
    /// <returns>The selected unit, if not it returns null</returns>
    public static UnitLibCm GetSelectedUnit(this Attribute attribute, ProjectData projectData)
    {
        if (string.IsNullOrEmpty(attribute.UnitSelected) || !projectData.Units.Any())
            return null;

        return projectData.Units.FirstOrDefault(x => x.Id == attribute.UnitSelected);
    }

    /// <summary>
    /// Get all allowed units for attribute
    /// </summary>
    /// <param name="attribute"></param>
    /// <returns>A list of allowed units</returns>
    public static List<UnitLibCm> GetAllowedUnits(this Attribute attribute)
    {
        return string.IsNullOrWhiteSpace(attribute.Units) ? null : JsonConvert.DeserializeObject<List<UnitLibCm>>(attribute.Units, DefaultSettings.SerializerSettingsNoTypeNameHandling);
    }

    /// <summary>
    /// Get the datum iri
    /// </summary>
    /// <param name="attribute"></param>
    /// <returns>A datum iri</returns>
    public static string IriDatum(this Attribute attribute)
    {
        return attribute.Id.ToString().IriDatum();
    }

    /// <summary>
    /// Get attribute datum objects
    /// </summary>
    /// <param name="attribute"></param>
    /// <returns>A AttributeDatumObject record</returns>
    public static AttributeDatumObject AttributeDatumObject(this Attribute attribute)
    {
        var rootIri = attribute.Id.ToString().RootIri();
        var attributeQualifiers = JsonConvert.DeserializeObject<ICollection<Qualifier>>(attribute.Qualifiers);
        return new AttributeDatumObject
        {
            SpecifiedScope = $"{rootIri}/scope/{HttpUtility.UrlEncode(attributeQualifiers.FirstOrDefault(x => x.Name.ToLower().Equals("scope"))?.ToString())}",
            SpecifiedProvenance = $"{rootIri}/provenance/{HttpUtility.UrlEncode(attributeQualifiers.FirstOrDefault(x => x.Name.ToLower().Equals("provenance"))?.ToString())}",
            RangeSpecifying = $"{rootIri}/specifying/{HttpUtility.UrlEncode(attributeQualifiers.FirstOrDefault(x => x.Name.ToLower().Equals("specifying"))?.ToString())}",
            RegularitySpecified = $"{rootIri}/specified/{HttpUtility.UrlEncode(attributeQualifiers.FirstOrDefault(x => x.Name.ToLower().Equals("specified"))?.ToString())}",
        };
    }

    /// <summary>
    /// Resolve attribute values from RDF graph
    /// </summary>
    /// <param name="attribute"></param>
    /// <param name="ontologyService"></param>
    /// <param name="projectData"></param>
    /// <param name="iri"></param>
    /// <param name="block"></param>
    /// <param name="connectorTerminal"></param>
    public static void ResolveAttribute(this AttributeAm attribute, IOntologyService ontologyService, ProjectData projectData, string iri, Guid block, string connectorTerminal)
    {
        #region None Mimir specific data

        attribute.Block = block;
        attribute.ConnectorTerminal = connectorTerminal;

        attribute.Name = ontologyService.GetValue(iri, Resources.Label);
        attribute.Value = ontologyService.GetValue(iri.IriDatum(), Resources.DatumValue, false);
        attribute.UnitSelected = ontologyService.GetValue(iri.IriDatum(), Resources.DatumUOM);

        // TODO: This must be rewritten ************
        var adp = iri.AttributeDatumPredicate();
        attribute.Qualifiers = new List<QualifierAm>
        {
            new()
            {
                Id = Guid.Empty,
                Name = ontologyService.GetValue(iri.IriDatum(), adp.SpecifiedScopePredicate, false),
                Value = null
            },
            new()
            {
              Id = Guid.Empty,
                Name = "scope",
                Value = ontologyService.GetValue(iri.IriDatum(), adp.SpecifiedScopePredicate, false)
            },
            new()
            {
               Id = Guid.Empty,
                Name = "provenance",
                Value = ontologyService.GetValue(iri.IriDatum(), adp.SpecifiedProvenancePredicate, false)
            },
            new()
            {
             Id = Guid.Empty,
                Name = "range",
                Value = ontologyService.GetValue(iri.IriDatum(), adp.RangeSpecifyingPredicate, false)
            },
            new()
            {
           Id = Guid.Empty,
                Name = "regularity",
                Value = ontologyService.GetValue(iri.IriDatum(), adp.RegularitySpecifiedPredicate, false)
            }
        };

        #endregion None Mimir specific data

        #region None Mimir specific data

        attribute.AttributeType = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();

        var allowedUnitBlocks = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.AllowedUnit).Select(x => x.Object).ToList();
        attribute.Units = allowedUnitBlocks.Select(x =>
        {
            var value = x.ResolveValue(false)?.Split('-', StringSplitOptions.RemoveEmptyEntries);
            return new UnitAm
            {
                Name = value?[1].Trim()
            };
        }).ToList();

        #endregion None Mimir specific data
    }
}