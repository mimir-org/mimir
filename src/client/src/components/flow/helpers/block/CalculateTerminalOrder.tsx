import { Node } from "../../../../models/project";

const CalculateTerminalOrder = (node: Node, order: number, type: string) => {
  node.connectors.forEach((conn) => {
    if (conn.visible && conn.type === type) order++;
  });

  return order;
};

export default CalculateTerminalOrder;
