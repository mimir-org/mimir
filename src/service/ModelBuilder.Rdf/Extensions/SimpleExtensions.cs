using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
    public static class SimpleExtensions
    {
        /// <summary>
        /// Assert simple to RDF graph
        /// </summary>
        /// <param name="simple">The simple that should be asserted</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="parentIri">Simple parent IRI.</param>
        /// <param name="libRepository">Lib repository</param>
        public static void AssertSimple(this Simple simple, IOntologyService ontologyService, string parentIri, ILibRepository libRepository)
        {
            ontologyService.AssertNode(simple.Iri, Resources.Type, Resources.SimpleType);
            ontologyService.AssertNode(parentIri, Resources.HasSimpleType, simple.Iri);
            ontologyService.AssertNode(simple.Iri, Resources.Label, simple.Name, true);

            if (simple.Attributes == null || !simple.Attributes.Any())
                return;

            foreach (var attribute in simple.Attributes)
            {
                attribute.AssertAttribute(simple.Iri, ontologyService);
                attribute.AssertAttributeValue(ontologyService, libRepository);
            }
        }

        /// <summary>
        /// Resolve simple from RDF graph
        /// </summary>
        /// <param name="simple">The simple that should be resolved</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="iri">The simple IRI</param>
        /// <param name="parentIri">The simple parent IRI</param>
        public static void ResolveSimple(this SimpleAm simple, IOntologyService ontologyService, string iri, string parentIri)
        {
            simple.Iri = iri;
            simple.Name = ontologyService.GetValue(iri, Resources.Label, false);
            simple.NodeIri = parentIri;

            // Resolve Attributes
            simple.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, a.ToString(), null, null, null, null, iri);
                simple.Attributes.Add(attribute);
            }
        }
    }
}