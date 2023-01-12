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

namespace ModelBuilder.Rdf.Extensions
{
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

            ontologyService.AssertNode(attribute.Iri, Resources.Type, Resources.PhysicalQuantity);
            ontologyService.AssertNode(parentIri, Resources.HasPhysicalQuantity, attribute.Iri);
            ontologyService.AssertNode(attribute.Iri, Resources.Label, attribute.Entity, true);

            var ado = attribute.AttributeDatumObject();
            var adp = attribute.Iri.AttributeDatumPredicate();
            ontologyService.AssertNode(attribute.IriDatum(), adp.SpecifiedScopePredicate, ado.SpecifiedScope);
            ontologyService.AssertNode(attribute.IriDatum(), adp.SpecifiedProvenancePredicate, ado.SpecifiedProvenance);
            ontologyService.AssertNode(attribute.IriDatum(), adp.RangeSpecifyingPredicate, ado.RangeSpecifying);
            ontologyService.AssertNode(attribute.IriDatum(), adp.RegularitySpecifiedPredicate, ado.RegularitySpecified);

            ontologyService.AssertNode(attribute.Iri, Resources.QualityQuantifiedAs, attribute.IriDatum());

            #endregion None Mimir specific data

            #region Mimir specific data

            if (!string.IsNullOrEmpty(attribute.AttributeTypeIri))
                ontologyService.AssertNode(attribute.Iri, Resources.LibraryType, attribute.AttributeTypeIri);

            var allowedUnits = attribute.GetAllowedUnits();
            if (allowedUnits != null && allowedUnits.Any())
                foreach (var value in allowedUnits)
                    ontologyService.AssertNode(attribute.Iri, Resources.AllowedUnit, $"mimir:{value.Id}-{value.Name}");

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

            ontologyService.AssertNode(attribute.IriDatum(), Resources.Type, Resources.ScalarQuantityDatum);
            ontologyService.AssertNode(attribute.Iri, Resources.QualityQuantifiedAs, $"{attribute.Iri}-datum");

            if (string.IsNullOrWhiteSpace(attribute.SelectedUnitId) || string.IsNullOrWhiteSpace(selectedUnit?.Name))
                return;

            ontologyService.AssertNode($"mimir:{attribute.SelectedUnitId}", Resources.Type, Resources.Scale);
            ontologyService.AssertNode($"mimir:{attribute.SelectedUnitId}", Resources.Label, selectedUnit.Name, true);
            ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumUOM, $"mimir:{attribute.SelectedUnitId}");
        }

        /// <summary>
        /// Get the selected unit
        /// </summary>
        /// <param name="attribute">Attribute selected unit</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <returns>The selected unit, if not it returns null</returns>
        public static UnitLibCm GetSelectedUnit(this Attribute attribute, ProjectData projectData)
        {
            if (string.IsNullOrEmpty(attribute.SelectedUnitId) || !projectData.Units.Any())
                return null;

            return projectData.Units.FirstOrDefault(x => x.Id == attribute.SelectedUnitId);
        }

        /// <summary>
        /// Get all allowed units for attribute
        /// </summary>
        /// <param name="attribute"></param>
        /// <returns>A list of allowed units</returns>
        public static List<UnitLibCm> GetAllowedUnits(this Attribute attribute)
        {
            return string.IsNullOrWhiteSpace(attribute.UnitString) ? null : JsonConvert.DeserializeObject<List<UnitLibCm>>(attribute.UnitString, DefaultSettings.SerializerSettingsNoTypeNameHandling);
        }

        /// <summary>
        /// Get the datum iri
        /// </summary>
        /// <param name="attribute"></param>
        /// <returns>A datum iri</returns>
        public static string IriDatum(this Attribute attribute)
        {
            return attribute.Iri.IriDatum();
        }

        /// <summary>
        /// Get attribute datum objects
        /// </summary>
        /// <param name="attribute"></param>
        /// <returns>A AttributeDatumObject record</returns>
        public static AttributeDatumObject AttributeDatumObject(this Attribute attribute)
        {
            var rootIri = attribute.Iri.RootIri();
            // TODO: This need rewrite logic
            return new AttributeDatumObject
            {
                SpecifiedScope = $"{rootIri}/scope/{HttpUtility.UrlEncode(attribute.SpecifiedScope)}",
                SpecifiedProvenance = $"{rootIri}/provenance/{HttpUtility.UrlEncode(attribute.SpecifiedProvenance)}",
                RangeSpecifying = $"{rootIri}/specifying/{HttpUtility.UrlEncode(attribute.RangeSpecifying)}",
                RegularitySpecified = $"{rootIri}/specified/{HttpUtility.UrlEncode(attribute.RegularitySpecified)}"
            };
        }

        /// <summary>
        /// Resolve attribute values from RDF graph
        /// </summary>
        /// <param name="attribute"></param>
        /// <param name="ontologyService"></param>
        /// <param name="projectData"></param>
        /// <param name="iri"></param>
        /// <param name="nodeIri"></param>
        /// <param name="interfaceIri"></param>
        /// <param name="terminalIri"></param>
        /// <param name="transportIri"></param>
        public static void ResolveAttribute(this AttributeAm attribute, IOntologyService ontologyService, ProjectData projectData, string iri, string nodeIri, string interfaceIri, string terminalIri, string transportIri)
        {
            #region None Mimir specific data

            attribute.Iri = iri;
            attribute.NodeIri = nodeIri;
            attribute.InterfaceIri = interfaceIri;
            attribute.TerminalIri = terminalIri;
            attribute.TransportIri = transportIri;

            attribute.Entity = ontologyService.GetValue(iri, Resources.Label);
            attribute.Value = ontologyService.GetValue(iri.IriDatum(), Resources.DatumValue, false);
            attribute.SelectedUnitId = ontologyService.GetValue(iri.IriDatum(), Resources.DatumUOM);

            // TODO: This must be rewritten
            var adp = iri.AttributeDatumPredicate();
            attribute.SpecifiedScope = ontologyService.GetValue(iri.IriDatum(), adp.SpecifiedScopePredicate, false);
            attribute.SpecifiedProvenance = ontologyService.GetValue(iri.IriDatum(), adp.SpecifiedProvenancePredicate, false);
            attribute.RangeSpecifying = ontologyService.GetValue(iri.IriDatum(), adp.RangeSpecifyingPredicate, false);
            attribute.RegularitySpecified = ontologyService.GetValue(iri.IriDatum(), adp.RegularitySpecifiedPredicate, false);

            #endregion None Mimir specific data

            #region None Mimir specific data

            attribute.AttributeTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();
            //attribute.AttributeTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false); // Resolve from Iri, last segment

            var allowedUnitNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.AllowedUnit).Select(x => x.Object).ToList();
            attribute.Units = allowedUnitNodes.Select(x =>
            {
                var value = x.ResolveValue(false)?.Split('-', StringSplitOptions.RemoveEmptyEntries);
                return new Unit
                {
                    Name = value?[1].Trim()
                };
            }).ToList();

            #endregion None Mimir specific data
        }
    }
}