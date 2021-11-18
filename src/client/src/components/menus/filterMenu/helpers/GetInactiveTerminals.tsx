import { Node } from "../../../../models";

/**
 * Method to find a node's inactive terminals - terminals that are not connected to an Edge.
 * @param nodes
 * @returns a list of inactive terminals.
 */
const GetInactiveTerminals = (nodes: Node[]) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors?.forEach((c) => {
      if (!c.visible) terminals.push(c);
    });
  });

  return terminals;
};

export default GetInactiveTerminals;
