using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Const;
using Mb.Models.Data.Enums;
using Newtonsoft.Json;
using RdfParserModule.Properties;
using RdfParserModule.Services;
using Attribute = Mb.Models.Data.Attribute;

namespace RdfParserModule.Extensions
{
    public static class AttributeExtensions
    {
        public static void AssertAttribute(this Attribute attribute, string parentIri, IOntologyService ontologyService)
        {
            // TODO: Extend attribute to get iri for qualifier, source, condition and format
            var rootIri = new Uri(attribute.Iri).GetComponents(UriComponents.SchemeAndServer, UriFormat.SafeUnescaped);

            // Asserts
            ontologyService.AssertNode(attribute.Iri, Resources.Domain, attribute.Domain, true);
            ontologyService.AssertNode(attribute.Iri, Resources.Type, Resources.PhysicalQuantity);
            ontologyService.AssertNode(parentIri, Resources.HasPhysicalQuantity, attribute.Iri);

            // TODO: Add AttributeTypeIri etc. to missing types
            //if (!string.IsNullOrEmpty(attribute.AttributeTypeIri))
            //{
            //    ontologyService.AssertNode(attribute.AttributeTypeIri, Resources.label, attribute.Entity, true);
            //    ontologyService.AssertNode(attribute.Iri, Resources.type, attribute.AttributeTypeIri);
            //}

            ontologyService.AssertNode(attribute.IriDatum(), $"{rootIri}/qualifier", $"{rootIri}/qualifier/ID{attribute.QualifierId}");
            ontologyService.AssertNode(attribute.IriDatum(), $"{rootIri}/source", $"{rootIri}/source/ID{attribute.SourceId}");
            ontologyService.AssertNode(attribute.IriDatum(), $"{rootIri}/condition", $"{rootIri}/condition/ID{attribute.ConditionId}");
            ontologyService.AssertNode(attribute.IriDatum(), $"{rootIri}/format", $"{rootIri}/format/ID{attribute.FormatId}");
        }

        public static void AssertAttributeValue(this Attribute attribute, IOntologyService ontologyService, ILibRepository libRepository)
        {
            if (string.IsNullOrEmpty(attribute?.Value))
                return;

            var selectedUnit = attribute.GetSelectedUnit(libRepository);
            var allowedUnits = attribute.GetAllowedUnits();

            // Asserts
            if (!string.IsNullOrEmpty(selectedUnit?.Name))
                ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumValue, ontologyService.CreateLiteralNode(attribute.Value, $"xsd:{selectedUnit.Name}"));
            else
                ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumValue, attribute.Value);

            ontologyService.AssertNode(attribute.IriDatum(), Resources.Type, Resources.ScalarQuantityDatum);
            ontologyService.AssertNode(attribute.Iri, Resources.QualityQuantifiedAs, $"{attribute.Iri}-datum");

            if (string.IsNullOrWhiteSpace(attribute.SelectedUnitId) || string.IsNullOrWhiteSpace(selectedUnit?.Name))
                return;

            ontologyService.AssertNode($"eq:{attribute.SelectedUnitId}", Resources.Type, Resources.Scale);
            ontologyService.AssertNode($"eq:{attribute.SelectedUnitId}", Resources.Label, selectedUnit.Name, true);
            ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumUOM, $"eq:{attribute.SelectedUnitId}");

            // TODO: Add all allowed units
        }

        public static Unit GetSelectedUnit(this Attribute attribute, ILibRepository libraryRepository)
        {
            var allUnits = libraryRepository.GetUnits().ToList();

            if (string.IsNullOrEmpty(attribute.SelectedUnitId) || !allUnits.Any())
                return null;

            return allUnits.FirstOrDefault(x => x.Id == attribute.SelectedUnitId);
        }

        public static List<Unit> GetAllowedUnits(this Attribute attribute)
        {
            if (string.IsNullOrEmpty(attribute.UnitString))
                return null;

            return JsonConvert.DeserializeObject<List<Unit>>(attribute.UnitString, DefaultSettings.SerializerSettings);
        }

        public static string IriDatum(this Attribute attribute)
        {
            return $"{attribute.Iri}-datum";
        }
    }
}