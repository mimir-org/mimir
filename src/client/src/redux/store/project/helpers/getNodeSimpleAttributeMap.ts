import { Node } from "@mimirorg/modelbuilder-types";

export const getNodeSimpleAttributeMap = (nodes: Node[]) => {
  const map: { [attributeId: string]: { nodeId: string; simpleId: string } } = {};

  nodes.forEach((n) =>
    n.simples?.forEach((s) =>
      s.attributes?.forEach((a) => {
        map[a.id] = { nodeId: n.id, simpleId: s.id };
      })
    )
  );

  return map;
};
