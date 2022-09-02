import { TypeReference } from "@mimirorg/modelbuilder-types";
import { TypeReferenceCm } from "@mimirorg/typelibrary-types";

export const ConvertTypeReference = (typeReferences: TypeReferenceCm[]) => {
  if (!typeReferences.length) return [] as TypeReference[];

  return typeReferences.map((t) => {
    return {
      name: t.name,
      iri: t.iri,
      source: t.source,
      subIri: t.subIri,
      subName: t.subName,
      kind: "TypeReference"
    } as TypeReference;
  });
};