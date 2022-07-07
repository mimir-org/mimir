/* eslint-disable @typescript-eslint/no-unused-vars */
import { Node } from "@mimirorg/modelbuilder-types";

export const getNodeConnectorAttributeMap = (nodes: Node[]) => {
  const map: { [attributeId: string]: { nodeId: string; terminalId: string } } = {};

  // nodes.forEach((n) =>
  //   n.connectors?.forEach((c) =>
  //     c.attributes?.forEach((a) => {
  //       map[a.id] = {
  //         nodeId: n.id,
  //         terminalId: c.id,
  //       };
  //     })
  //   )
  // );
  // TODO: fix
  return map;
};
