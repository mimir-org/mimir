import { Node, RelationType } from "../../../../models";
import { IsInputTerminal } from "../../helpers";

const SetTerminalOrder = (node: Node, type: RelationType) => {
  let inputOrder = 0;
  let outputOrder = 0;

  node.connectors.forEach((conn) => {
    if (IsInputTerminal(conn) && conn.visible && conn.relationType === type) ++inputOrder;
    if (!IsInputTerminal(conn) && conn.visible && conn.relationType === type) ++outputOrder;
  });

  return [inputOrder, outputOrder];
};

export default SetTerminalOrder;
