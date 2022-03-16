using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Const;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.TypeEditor.Services.Contracts;
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
            // Asserts
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
        /// <param name="libRepository">Library repository</param>
        /// TODO: Library repository should not be here in the future
        public static void AssertAttributeValue(this Attribute attribute, IOntologyService ontologyService, ILibRepository libRepository)
        {
            if (string.IsNullOrEmpty(attribute?.Value))
                return;

            var selectedUnit = attribute.GetSelectedUnit(libRepository);
            attribute.AssertAttributeFormat(ontologyService,libRepository);
            
            ontologyService.AssertNode(attribute.IriDatum(), Resources.Type, Resources.ScalarQuantityDatum);
            ontologyService.AssertNode(attribute.Iri, Resources.QualityQuantifiedAs, $"{attribute.Iri}-datum");

            if (string.IsNullOrWhiteSpace(attribute.SelectedUnitId) || string.IsNullOrWhiteSpace(selectedUnit?.Name))
                return;

            ontologyService.AssertNode($"eq:{attribute.SelectedUnitId}", Resources.Type, Resources.Scale);
            ontologyService.AssertNode($"eq:{attribute.SelectedUnitId}", Resources.Label, selectedUnit.Name, true);
            ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumUOM, $"eq:{attribute.SelectedUnitId}");
        }

        public static void AssertAttributeFormat(this Attribute attribute, IOntologyService ontologyService, ILibRepository libRepository)
        {
            AttributeFormat format = libRepository.GetAttributeFormat(attribute.FormatId);
            Uri format_iri = GetAttributeFormatXSD(format.Name);
            ontologyService.AssertNode(attribute.IriDatum(), Resources.DatumValue, ontologyService.CreateLiteralNode(attribute.Value, format_iri));
        }

        public static Uri GetAttributeFormatXSD(string format_name) =>
            new Uri(format_name switch
            {
                "Text and doc reference" => "http://www.w3.org/2001/XMLSchema#string",
                "Table" => "http://www.w3.org/2001/XMLSchema#string",
                "Float" => "http://www.w3.org/2001/XMLSchema#float",
                "String" => "http://www.w3.org/2001/XMLSchema#string",
                "Boolean" => "http://www.w3.org/2001/XMLSchema#boolean",
                "Unsigned Integer" => "http://www.w3.org/2001/XMLSchema#unsignedInt",
                "Unsigned Float" => "http://www.w3.org/2001/XMLSchema#float",
                "NotSet" => "http://www.w3.org/2001/XMLSchema#string",
                "Selection" => "http://www.w3.org/2001/XMLSchema#string",
                _ => throw new NotImplementedException($"Unrecognized format: {format_name}")
            });

        /// <summary>
        /// Get the selected unit
        /// </summary>
        /// <param name="attribute">Attribute selected unit</param>
        /// <param name="libraryRepository">Library Repository</param>
        /// <returns>The selected unit, if not it returns null</returns>
        public static Unit GetSelectedUnit(this Attribute attribute, ILibRepository libraryRepository)
        {
            var allUnits = libraryRepository.GetUnits().ToList();

            if (string.IsNullOrEmpty(attribute.SelectedUnitId) || !allUnits.Any())
                return null;

            return allUnits.FirstOrDefault(x => x.Id == attribute.SelectedUnitId);
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
                QualifierObject = $"{rootIri}/qualifier/ID{attribute.QualifierId}",
                SourceObject = $"{rootIri}/source/ID{attribute.SourceId}",
                ConditionObject = $"{rootIri}/condition/ID{attribute.ConditionId}",
                FormatObject = $"{rootIri}/format/ID{attribute.FormatId}"
            };
        }

        /// <summary>
        /// Resolve attribute values from RDF graph
        /// </summary>
        /// <param name="attribute"></param>
        /// <param name="ontologyService"></param>
        /// <param name="iri"></param>
        /// <param name="nodeIri"></param>
        /// <param name="interfaceIri"></param>
        /// <param name="terminalIri"></param>
        /// <param name="transportIri"></param>
        /// <param name="simpleIri"></param>
        public static void ResolveAttribute(this AttributeAm attribute, IOntologyService ontologyService, string iri, string nodeIri, string interfaceIri, string terminalIri, string transportIri, string simpleIri)
        {
            attribute.Iri = iri;
            attribute.Entity = ontologyService.GetValue(iri, Resources.Label);
            attribute.Value = ontologyService.GetValue(iri.IriDatum(), Resources.DatumValue, false);
            attribute.SelectedUnitId = ontologyService.GetValue(iri.IriDatum(), Resources.DatumUOM);
            attribute.AttributeTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            attribute.AttributeTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();

            var adp = iri.AttributeDatumPredicate();
            attribute.QualifierId = ontologyService.GetValue(iri.IriDatum(), adp.QualifierPredicate, false);
            attribute.SourceId = ontologyService.GetValue(iri.IriDatum(), adp.SourcePredicate, false);
            attribute.ConditionId = ontologyService.GetValue(iri.IriDatum(), adp.ConditionPredicate, false);
            attribute.FormatId = ontologyService.GetValue(iri.IriDatum(), adp.FormatPredicate, false);

            attribute.NodeIri = nodeIri;
            attribute.InterfaceIri = interfaceIri;
            attribute.TerminalIri = terminalIri;
            attribute.TransportIri = transportIri;
            attribute.SimpleIri = simpleIri;

            // TODO: AttributeAm should have a list of attribute id's
            var allowedUnitNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.AllowedUnit).Select(x => x.Object).ToList();
            attribute.Units = allowedUnitNodes.Select(x =>
            {
                var value = x.ResolveValue()?.Split('-', StringSplitOptions.RemoveEmptyEntries);
                return new UnitAm
                {
                    Id = value?[0].Trim(),
                    Name = value?[1].Trim()
                };
            }).ToList();

            var selectValueNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.SelectValue).Select(x => x.Object).ToList();
            attribute.SelectValues = selectValueNodes.Select(x => x.ResolveValue()).ToList();

            attribute.SelectType = ontologyService.GetEnumValue<SelectType>(iri, Resources.SelectType, false);
            attribute.Discipline = ontologyService.GetEnumValue<Discipline>(iri, Resources.HasDiscipline, false);
        }
    }
}