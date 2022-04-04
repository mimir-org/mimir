using System.Web;
using Mb.Models.Application;
using Mb.Models.Const;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;
using Newtonsoft.Json;
using Attribute = Mb.Models.Data.Attribute;
using AttributeDatumObject = ModelBuilder.Rdf.Models.AttributeDatumObject;

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
            // Asserts_libra
            ontologyService.AssertNode(attribute.Iri, Resources.Domain, attribute.Domain, true);
            ontologyService.AssertNode(attribute.Iri, Resources.Type, Resources.PhysicalQuantity);
            ontologyService.AssertNode(parentIri, Resources.HasPhysicalQuantity, attribute.Iri);
            ontologyService.AssertNode(attribute.Iri, Resources.Label, attribute.Entity, true);
            ontologyService.AssertNode(attribute.Iri, Resources.HasDiscipline, $"mimir:{attribute.Discipline}");
            ontologyService.AssertNode(attribute.Iri, Resources.SelectType, $"mimir:{attribute.SelectType}");

            if (attribute.SelectValues != null && attribute.SelectValues.Any())
                foreach (var value in attribute.SelectValues)
                    ontologyService.AssertNode(attribute.Iri, Resources.SelectValue, $"mimir:{value}");


            if (!string.IsNullOrEmpty(attribute.AttributeTypeIri))
            {
                ontologyService.AssertNode(attribute.AttributeTypeIri, Resources.Label, attribute.Entity, true);
                ontologyService.AssertNode(attribute.Iri, Resources.LibraryType, attribute.AttributeTypeIri);
            }

            var allowedUnits = attribute.GetAllowedUnits();
            if (allowedUnits != null && allowedUnits.Any())
                foreach (var value in allowedUnits)
                    ontologyService.AssertNode(attribute.Iri, Resources.AllowedUnit, $"mimir:{value.Id}-{value.Name}");

            var ado = attribute.AttributeDatumObject();
            var adp = attribute.Iri.AttributeDatumPredicate();
            ontologyService.AssertNode(attribute.IriDatum(), adp.QualifierPredicate, ado.QualifierObject);
            ontologyService.AssertNode(attribute.IriDatum(), adp.SourcePredicate, ado.SourceObject);
            ontologyService.AssertNode(attribute.IriDatum(), adp.ConditionPredicate, ado.ConditionObject);
            ontologyService.AssertNode(attribute.IriDatum(), adp.FormatPredicate, ado.FormatObject);

            ontologyService.AssertNode(attribute.Iri, Resources.QualityQuantifiedAs, attribute.IriDatum());
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
            attribute.AssertAttributeFormat(ontologyService, projectData);

            ontologyService.AssertNode(attribute.IriDatum(), Resources.Type, Resources.ScalarQuantityDatum);
            ontologyService.AssertNode(attribute.Iri, Resources.QualityQuantifiedAs, $"{attribute.Iri}-datum");

            if (string.IsNullOrWhiteSpace(attribute.SelectedUnitId) || string.IsNullOrWhiteSpace(selectedUnit?.Name))
                return;

            ontologyService.AssertNode($"eq:{attribute.SelectedUnitId}", Resources.Type, Resources.Scale);
            ontologyService.AssertNode($"eq:{attribute.SelectedUnitId}", Resources.Label, selectedUnit.Name, true);
            ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumUOM, $"eq:{attribute.SelectedUnitId}");
        }

        /// <summary>
        /// Assert attribute format
        /// </summary>
        /// <param name="attribute">Attribute that should have asserted value</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="projectData">Record of ICollections</param>
        public static void AssertAttributeFormat(this Attribute attribute, IOntologyService ontologyService, ProjectData projectData)
        {
            var attributeFormat = projectData.AttributeFormats[attribute.Format];

            if (attributeFormat == null || string.IsNullOrWhiteSpace(attributeFormat.SemanticReference))
                return;

            ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumValue, ontologyService.CreateLiteralNode(attribute.Value, attributeFormat.SemanticReference));
        }

        /// <summary>
        /// Get the selected unit
        /// </summary>
        /// <param name="attribute">Attribute selected unit</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <returns>The selected unit, if not it returns null</returns>
        public static Unit GetSelectedUnit(this Attribute attribute, ProjectData projectData)
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
        public static List<Unit> GetAllowedUnits(this Attribute attribute)
        {
            return string.IsNullOrWhiteSpace(attribute.UnitString) ?
                null :
                JsonConvert.DeserializeObject<List<Unit>>(attribute.UnitString, DefaultSettings.SerializerSettings);
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

            return new AttributeDatumObject
            {
                QualifierObject = $"{rootIri}/qualifier/{HttpUtility.UrlEncode(attribute.Qualifier)}",
                SourceObject = $"{rootIri}/source/{HttpUtility.UrlEncode(attribute.Source)}",
                ConditionObject = $"{rootIri}/condition/{HttpUtility.UrlEncode(attribute.Condition)}",
                FormatObject = $"{rootIri}/format/{HttpUtility.UrlEncode(attribute.Format)}"
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
        /// <param name="simpleIri"></param>
        public static void ResolveAttribute(this AttributeAm attribute, IOntologyService ontologyService, ProjectData projectData, string iri, string nodeIri, string interfaceIri, string terminalIri, string transportIri, string simpleIri)
        {
            attribute.Iri = iri;
            attribute.Entity = ontologyService.GetValue(iri, Resources.Label);
            attribute.Value = ontologyService.GetValue(iri.IriDatum(), Resources.DatumValue, false);
            attribute.SelectedUnitId = ontologyService.GetValue(iri.IriDatum(), Resources.DatumUOM);
            attribute.AttributeTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            attribute.AttributeTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();

            var adp = iri.AttributeDatumPredicate();
            attribute.Qualifier = ontologyService.GetValue(iri.IriDatum(), adp.QualifierPredicate, false);
            attribute.Source = ontologyService.GetValue(iri.IriDatum(), adp.SourcePredicate, false);
            attribute.Condition = ontologyService.GetValue(iri.IriDatum(), adp.ConditionPredicate, false);
            attribute.Format = ontologyService.GetValue(iri.IriDatum(), adp.FormatPredicate, false);

            attribute.Qualifier = string.IsNullOrWhiteSpace(attribute.Qualifier) ? "NotSet" : projectData.AttributeQualifiers[attribute.Qualifier]?.Name ?? attribute.Qualifier;
            attribute.Source = string.IsNullOrWhiteSpace(attribute.Source) ? "NotSet" : projectData.AttributeSources[attribute.Source]?.Name ?? attribute.Source;
            attribute.Condition = string.IsNullOrWhiteSpace(attribute.Condition) ? "NotSet" : projectData.AttributeConditions[attribute.Condition]?.Name ?? attribute.Condition;
            attribute.Format = string.IsNullOrWhiteSpace(attribute.Format) ? "NotSet" : projectData.AttributeFormats[attribute.Format]?.Name ?? attribute.Format;

            attribute.NodeIri = nodeIri;
            attribute.InterfaceIri = interfaceIri;
            attribute.TerminalIri = terminalIri;
            attribute.TransportIri = transportIri;
            attribute.SimpleIri = simpleIri;

            // TODO: AttributeAm should have a list of attribute id's
            var allowedUnitNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.AllowedUnit).Select(x => x.Object).ToList();
            attribute.Units = allowedUnitNodes.Select(x =>
            {
                var value = x.ResolveValue(false)?.Split('-', StringSplitOptions.RemoveEmptyEntries);
                return new UnitAm
                {
                    Id = value?[0].Trim(),
                    Name = value?[1].Trim()
                };
            }).ToList();

            var selectValueNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.SelectValue).Select(x => x.Object).ToList();
            attribute.SelectValues = selectValueNodes.Select(x => x.ResolveValue(false)).ToList();

            attribute.SelectType = ontologyService.GetEnumValue<SelectType>(iri, Resources.SelectType, false);
            attribute.Discipline = ontologyService.GetEnumValue<Discipline>(iri, Resources.HasDiscipline, false);
        }
    }
}