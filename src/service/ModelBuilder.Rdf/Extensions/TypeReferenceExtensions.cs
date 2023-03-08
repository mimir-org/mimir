using Mb.Models.Data;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
    public static class TypeReferenceExtensions
    {
        public static void AssertTypeReference(this ICollection<TypeReference> references, string parentIri, IOntologyService ontologyService)
        {
            if (references == null || !references.Any())
                return;

            foreach (var typeReference in references)
            {
                ontologyService.AssertAspectObject(parentIri, Resources.SameAs, typeReference.Iri);
                ontologyService.AssertAspectObject(typeReference.Iri, Resources.Label, typeReference.Name, true);
            }
        }

        public static void ResolveTypeReferences(this ICollection<TypeReference> references, string parentIri, IOntologyService ontologyService)
        {
            var typeReferences = ontologyService.GetTriplesWithSubjectPredicate(parentIri, Resources.SameAs).ToList();
            references ??= new List<TypeReference>();

            foreach (var triple in typeReferences)
            {
                var typeReferenceIri = triple.Object?.ToString();
                if (string.IsNullOrWhiteSpace(typeReferenceIri))
                    continue;

                var typeReferenceName = ontologyService.GetValue(typeReferenceIri, Resources.Label, false);
                if (string.IsNullOrWhiteSpace(typeReferenceName))
                    continue;

                var typeReferenceSubIri = ontologyService
                    .GetTriplesWithSubjectPredicate(typeReferenceIri, Resources.DefaultUom)?.FirstOrDefault()?.Object
                    ?.ToString();

                // TODO: Resolve this
                //var typeReferenceSubName = !string.IsNullOrWhiteSpace(typeReferenceSubIri)
                //    ? ontologyService.GetValue(typeReferenceSubIri, Resources.Label, false)
                //    : null;

                // TODO: Resolve this
                references.Add(new TypeReference
                {
                    Iri = typeReferenceIri,
                    Name = typeReferenceName,
                    Source = ontologyService.GetValue(typeReferenceIri, Resources.HasSource, false),
                    //SubIri = typeReferenceSubIri,
                    //SubName = typeReferenceSubName
                });
            }
        }
    }
}