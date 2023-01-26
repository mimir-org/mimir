import { Node } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../../../../services";

export const GetNodeConnectorAttributeMap = (nodes: Node[]) => {
  const map: { [attributeId: string]: { nodeId: string; terminalId: string } } = {};

  nodes.forEach((n) =>
    n.connectors?.forEach((c) => {
      if (!IsTerminal(c)) return;
      c.attributes?.forEach((a) => {
        map[a.id] = {
          nodeId: n.id,
          terminalId: c.id,
        };
      });
    })
  );
  return map;
};
