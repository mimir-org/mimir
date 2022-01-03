using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Const;
using Mb.Models.Data.Enums;
using Newtonsoft.Json;
using RdfParserModule.Properties;
using RdfParserModule.Repositories;
using VDS.RDF;
using Attribute = Mb.Models.Data.Attribute;

namespace RdfParserModule.Extensions
{
    public static class AttributeExtensions
    {
        public static void AssertAttribute(this Attribute attribute, IGraph graph, INode node, IOntologyRepository ontologyRepository)
        {
            // TODO: Extend attribute to get iri for qualifier, source, condition and format
            var rootIri = new Uri(attribute.Iri).GetComponents(UriComponents.SchemeAndServer, UriFormat.SafeUnescaped);

            // Subjects
            var attributeNode = attribute.Iri.GetOrCreateUriNode(graph);
            var attributeTypeNode = attribute.AttributeTypeIri.GetOrCreateUriNode(graph);
            var datum = (attribute.Iri + "-datum").GetOrCreateUriNode(graph);

            // Predicates
            var domainPredicate = ontologyRepository.BuildIri("mimir", "domain").GetOrCreateUriNode(graph);
            var labelPredicate = Resources.label.GetOrCreateUriNode(graph);
            var typePredicate = Resources.type.GetOrCreateUriNode(graph);
            var hasPhysicalQuantityPredicate = ontologyRepository.BuildIri("lis", "hasPhysicalQuantity").GetOrCreateUriNode(graph);
            var qualifierPredicate = ($"{rootIri}/qualifier").GetOrCreateUriNode(graph);
            var sourcePredicate = ($"{rootIri}/source").GetOrCreateUriNode(graph);
            var conditionPredicate = ($"{rootIri}/condition").GetOrCreateUriNode(graph);
            var formatPredicate = ($"{rootIri}/format").GetOrCreateUriNode(graph);
            
            // Objects
            var domainObject = graph.CreateLiteralNode(attribute.Domain);
            var physicalQuantityObject = ontologyRepository.BuildIri("lis", "PhysicalQuantity").GetOrCreateUriNode(graph);
            var qualifierObject = ($"{rootIri}/qualifier/ID{attribute.QualifierId}").GetOrCreateUriNode(graph);
            var sourceObject = ($"{rootIri}/source/ID{attribute.SourceId}").GetOrCreateUriNode(graph);
            var conditionObject = ($"{rootIri}/condition/ID{attribute.Condition}").GetOrCreateUriNode(graph);
            var formatObject = ($"{rootIri}/format/ID{attribute.Format}").GetOrCreateUriNode(graph);

            // Asserts
            graph.Assert(new Triple(attributeNode, domainPredicate, domainObject));
            graph.Assert(new Triple(attributeTypeNode, labelPredicate, graph.CreateLiteralNode(attribute.Entity)));
            graph.Assert(new Triple(attributeNode, typePredicate, physicalQuantityObject));
            graph.Assert(new Triple(attributeNode, typePredicate, attributeTypeNode));
            graph.Assert(new Triple(node, hasPhysicalQuantityPredicate, attributeNode));

            graph.Assert(new Triple(datum, qualifierPredicate, qualifierObject));
            graph.Assert(new Triple(datum, sourcePredicate, sourceObject));
            graph.Assert(new Triple(datum, conditionPredicate, conditionObject));
            graph.Assert(new Triple(datum, formatPredicate, formatObject));
        }

        public static void AssertAttributeValue(this Attribute attribute, IGraph graph, INode node, IOntologyRepository ontologyRepository, ILibRepository libRepository)
        {
            if(string.IsNullOrEmpty(attribute?.Value))
                return;

            var selectedUnit = attribute.GetSelectedUnit(libRepository);
            var allowedUnits = attribute.GetAllowedUnits();

            // Subjects
            var attributeNode = attribute.Iri.GetOrCreateUriNode(graph);
            var datum = (attribute.Iri + "-datum").GetOrCreateUriNode(graph);
            var unitNode = string.IsNullOrEmpty(attribute.SelectedUnitId) ? null : ontologyRepository.BuildIri("eq", attribute.SelectedUnitId).GetOrCreateUriNode(graph);

            // Predicates
            var datumValuePredicate = ontologyRepository.BuildIri("lis", "datumValue").GetOrCreateUriNode(graph);
            var typePredicate = Resources.type.GetOrCreateUriNode(graph);
            var qualityQuantifiedAsPredicate = ontologyRepository.BuildIri("lis", "qualityQuantifiedAs").GetOrCreateUriNode(graph);
            var labelPredicate = Resources.label.GetOrCreateUriNode(graph);
            var datumUomPredicate = ontologyRepository.BuildIri("lis", "datumUOM").GetOrCreateUriNode(graph);

            // Objects
            var quantityDatum = ontologyRepository.BuildIri("lis", "ScalarQuantityDatum").GetOrCreateUriNode(graph);
            var datumValueObject = selectedUnit?.Name != null ? graph.CreateLiteralNode(attribute.Value, new Uri(ontologyRepository.BuildIri("xsd", selectedUnit.Name))) : graph.CreateLiteralNode(attribute.Value);
            var unitOfMeasureObject = ontologyRepository.BuildIri("lis", "Scale").GetOrCreateUriNode(graph);

            // Asserts
            graph.Assert(new Triple(datum, datumValuePredicate, datumValueObject));
            graph.Assert(new Triple(datum, typePredicate, quantityDatum));
            graph.Assert(new Triple(attributeNode, qualityQuantifiedAsPredicate, datum));

            if (unitNode == null || string.IsNullOrWhiteSpace(selectedUnit?.Name)) 
                return;
            
            graph.Assert(new Triple(unitNode, typePredicate, unitOfMeasureObject));
            graph.Assert(new Triple(unitNode, labelPredicate, graph.CreateLiteralNode(selectedUnit.Name)));
            graph.Assert(new Triple(datum, datumUomPredicate, unitNode));

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
