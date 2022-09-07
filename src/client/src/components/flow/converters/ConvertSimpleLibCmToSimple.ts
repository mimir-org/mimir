import { Simple } from "@mimirorg/modelbuilder-types";
import { SimpleLibCm } from "@mimirorg/typelibrary-types";
import { ConvertSimpleAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";

/**
 * Component to convert SimpleLibCm to the type Simple.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param simples
 * @param nodeId
 * @returns a list of Simple types.
 */
const ConvertSimpleLibCmToSimple = (simples: SimpleLibCm[], nodeId: string) => {
  if (!simples || !simples.length) return [] as Simple[];

  return simples.map((s) => {
    return {
      id: s.id,
      name: s.name,
      iri: s.iri,
      attributes: ConvertSimpleAttributeLibCmToAttribute(s),
      kind: s.kind,
      nodeId,
      nodeIri: null,
    };
  });
};

export default ConvertSimpleLibCmToSimple;
