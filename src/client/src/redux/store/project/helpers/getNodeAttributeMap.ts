import { Node } from "../../../../models";

export const getNodeAttributeMap = (nodes: Node[]) => {
  const map: { [attributeId: string]: { nodeId: string } } = {};

  nodes.forEach((n) =>
    n.attributes?.forEach((a) => {
      map[a.id] = { nodeId: n.id };
    })
  );

  return map;
};
