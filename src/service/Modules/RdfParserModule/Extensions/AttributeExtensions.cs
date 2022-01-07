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
            ontologyService.AssertNode(attribute.Iri, "mimir__domain", attribute.Domain, true);
            ontologyService.AssertNode(attribute.Iri, Resources.type, "lis__PhysicalQuantity");
            ontologyService.AssertNode(parentIri, "lis__hasPhysicalQuantity", attribute.Iri);

            // TODO: Add AttributeTypeIri etc. to missing types
            //if (!string.IsNullOrEmpty(attribute.AttributeTypeIri))
            //{
            //    ontologyService.AssertNode(attribute.AttributeTypeIri, Resources.label, attribute.Entity, true);
            //    ontologyService.AssertNode(attribute.Iri, Resources.type, attribute.AttributeTypeIri);
            //}

            ontologyService.AssertNode(attribute.Iri + "-datum", $"{rootIri}/qualifier", $"{rootIri}/qualifier/ID{attribute.QualifierId}");
            ontologyService.AssertNode(attribute.Iri + "-datum", $"{rootIri}/source", $"{rootIri}/source/ID{attribute.SourceId}");
            ontologyService.AssertNode(attribute.Iri + "-datum", $"{rootIri}/condition", $"{rootIri}/condition/ID{attribute.ConditionId}");
            ontologyService.AssertNode(attribute.Iri + "-datum", $"{rootIri}/format", $"{rootIri}/format/ID{attribute.FormatId}");
        }

        public static void AssertAttributeValue(this Attribute attribute, IOntologyService ontologyService, ILibRepository libRepository)
        {
            if(string.IsNullOrEmpty(attribute?.Value))
                return;

            var selectedUnit = attribute.GetSelectedUnit(libRepository);
            var allowedUnits = attribute.GetAllowedUnits();

            // Asserts
            if(!string.IsNullOrEmpty(selectedUnit?.Name))
                ontologyService.AssertNode($"{attribute.Iri}-datum", "lis__datumValue", ontologyService.CreateLiteralNode(attribute.Value, new Uri(ontologyService.BuildIri("xsd", selectedUnit.Name))));
            else
                ontologyService.AssertNode($"{attribute.Iri}-datum", "lis__datumValue", attribute.Value);

            ontologyService.AssertNode($"{attribute.Iri}-datum", Resources.type, "lis__ScalarQuantityDatum");
            ontologyService.AssertNode(attribute.Iri, "lis__qualityQuantifiedAs", $"{attribute.Iri}-datum");

            if (string.IsNullOrWhiteSpace(attribute.SelectedUnitId) || string.IsNullOrWhiteSpace(selectedUnit?.Name))
                return;

            ontologyService.AssertNode($"eq__{attribute.SelectedUnitId}", Resources.type, "lis__Scale");
            ontologyService.AssertNode($"eq__{attribute.SelectedUnitId}", Resources.label, selectedUnit.Name, true);
            ontologyService.AssertNode($"{attribute.Iri}-datum", "lis__datumUOM", $"eq__{attribute.SelectedUnitId}");

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
    }
}
