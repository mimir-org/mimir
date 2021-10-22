import { Node } from "../../../../models";

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
