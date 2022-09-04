import { TypeReference } from "@mimirorg/modelbuilder-types";
import { TypeReferenceCm } from "@mimirorg/typelibrary-types";

/**
 * Component to convert an array of TypeReferenceCm to an array of TypeReference.
 * @param typeReferences
 * @returns a list of TypeReference.
 */
export const ConvertTypeReference = (typeReferences: TypeReferenceCm[]) => {
  if (!typeReferences || !typeReferences.length) return [] as TypeReference[];

  return typeReferences.map((t) => {
    return {
      name: t.name,
      iri: t.iri,
      source: t.source,
      subIri: t.subIri,
      subName: t.subName,
      kind: "TypeReference",
    } as TypeReference;
  });
};
