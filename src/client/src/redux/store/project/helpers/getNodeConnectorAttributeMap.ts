import { Node } from "../../../../models";

export const getNodeConnectorAttributeMap = (nodes: Node[]) => {
  const map: { [attributeId: string]: { nodeId: string; terminalId: string } } = {};

  nodes.forEach((n) =>
    n.connectors?.forEach((c) =>
      c.attributes?.forEach((a) => {
        map[a.id] = {
          nodeId: n.id,
          terminalId: c.id,
        };
      })
    )
  );

  return map;
};
