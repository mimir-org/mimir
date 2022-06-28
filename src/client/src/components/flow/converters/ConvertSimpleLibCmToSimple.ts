import { Simple } from "@mimirorg/modelbuilder-types";
import { SimpleLibCm } from "@mimirorg/typelibrary-types";
import { ConvertAttributeLibCmToAttribute } from "./";

const ConvertSimpleLibCmToSimple = (simples: SimpleLibCm[]) => {
  if (!simples.length) return [] as Simple[];

  return simples.map((s) => {
    return {
      id: s.id,
      name: s.name,
      iri: s.iri,
      attributes: ConvertAttributeLibCmToAttribute(s.attributes),
      kind: s.kind,
      nodeId: "", // TODO: fix
      nodeIri: "",
    };
  });
};

export default ConvertSimpleLibCmToSimple;
