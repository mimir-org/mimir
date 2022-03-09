using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class SimpleExtensions
    {
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
