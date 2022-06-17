import { Simple } from "@mimirorg/modelbuilder-types";
import { SimpleLibCm } from "@mimirorg/typelibrary-types";
import { ConvertAttributeLibCmToAttribute } from "./";

const ConvertSimpleLibCmToSimple = (simples: SimpleLibCm[]) => {
  const convertedSimples = [] as Simple[];
  if (!convertedSimples.length) return convertedSimples;

  simples.forEach((s) => {
    convertedSimples.push({
      id: s.id,
      name: s.name,
      iri: s.iri,
      attributes: ConvertAttributeLibCmToAttribute(s.attributes),
      kind: s.kind,
      nodeId: "", // TODO: fix
      nodeIri: "",
    });
  });

  return convertedSimples;
};

export default ConvertSimpleLibCmToSimple;
