import { Node } from "../../../../models";

const GetAllTerminals = (nodes: Node[]) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors.forEach((c) => {
      terminals.push(c);
    });
  });

  return terminals;
};

export default GetAllTerminals;
