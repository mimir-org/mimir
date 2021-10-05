import { Node, RelationType } from "../../../../models";

const SetTerminalOrder = (node: Node, order: number, type: RelationType) => {
  node.connectors.forEach((conn) => {
    if (conn.visible && conn.relationType === type) order++;
  });

  return order;
};

export default SetTerminalOrder;
